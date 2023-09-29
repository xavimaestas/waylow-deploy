import { useState, useEffect } from 'react'
import { airlineList } from '../utils/airlines';

export default function FlightData(props){

    const [flightStates, setFlightStates] = useState([])

    const initializeFlightState = (numFlights) => {
        if (numFlights > 0) {
            const initialState = new Array(numFlights).fill(false);
            setFlightStates(initialState);
          } else {
           
            setFlightStates([]);
          }
    }

    useEffect(() => {
        
        initializeFlightState(props.flights.length)
      }, [props.flights])
    //   useEffect being used so that this only runs when props.flights changes, otherwise, infinite loop. 
  
    

    const formatTimestamp = (timeStamp, timeZone) => {
        const optionsDate = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            timeZone: 'UTC'
            
        }

        const optionsTime = {
            timeStyle: 'short',
            timeZone: 'UTC'
            
            // maybe create am/pm switch? 
        }

            

            const inputDate = new Date(timeStamp)
            
            
            const datePart =  inputDate.toLocaleString(undefined, optionsDate)
            const timePart =  inputDate.toLocaleString(undefined, optionsTime)

            return `${datePart} ${timePart}`
            // needs to be fixed to show time per the timezone that is passed in instead of showing time per the local machine. 

    }

    const formatLayover = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    
        return `${hours}h ${minutes}m`
    }

    const formatTravelTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600 / 60))

        return `${hours}h ${minutes}m`
    }

   

    const getAirline = (airlineName) => {
       if (airlineName in airlineList){
        return airlineList[airlineName]
       } else {
        return 'Unknown Airline'
       }
    }

    // add an object here to sort through for all of the airlines. 

    const handleDropDown = (index) => {
        const updatedStates = [...flightStates]
        updatedStates[index] = !updatedStates[index]
        setFlightStates(updatedStates)
        
    }

    

   

  

    


    return (
        <div className="flight-data-container">
            
        
     
           
            {props.flights && props.flights && props.flights.map((flight, index)=>(
                
              

                <div className="flight-data-card" key={index}>
                    

                    <h4>{flight.flyFrom} - {flight.flyTo}</h4>
                    <p>${flight.price.toFixed(2)}</p>
                    <p>Total Travel Time: {formatTravelTime(flight.duration.total)}</p>

                    <a className ="kiwi-buy-link" href={flight.deep_link} target="_blank">Buy Flight</a>

                    <p className="more-flight-info">More flight info</p>
                    <i onClick={() => handleDropDown(index)} className={`fa-solid fa-sort-${flightStates[index] ? "up" : "down"} fa-xl`}></i>
                    

                    {flight.route.map((r, rIndex)=>{

                        const individualFlight = flightStates[index] ? "individual-flight-info" : "individual-flight-info-none"
                        
                        const localDeparture = new Date(r.local_departure)

                        const lastRoute = flight.route[rIndex - 1]

                        const lastLocalArrival = lastRoute ? new Date(lastRoute.local_arrival) : null

                        const initialFlyTo = flight.flyTo
                        const initialFlyFrom = flight.flyFrom
                        const lastRouteLeg = flight.route[flight.route.length-1];

                        const layoverTime = lastLocalArrival ? localDeparture - lastLocalArrival : 0

                        const flyFromToIndex = initialFlyTo === r.flyFrom ? rIndex : null

                        const secondLegLayoverRender = 
                            initialFlyTo === r.flyFrom ?
                            <p>{flight.route.length - (rIndex + 1) === 0 ? "Return Layovers: 0" :  ` Return Layovers: ${flight.route.length - (rIndex + 1)}`} 
                            </p> 
                            : ""

                        const secondLegIndex = flight.route.findIndex(r => initialFlyTo === r.flyFrom);

                        const itemsBetween = secondLegIndex > 0 ? secondLegIndex - rIndex : 0
                            
                        const firstLegLayoverRender =
                              initialFlyFrom === r.flyFrom ? (
                                <p>{`Outbound Layovers : ${itemsBetween - 1}`}</p>
                              ) : "";
                            
                       
                        


                      

                    
                        
                     
                       

                        return (
                            <div className={individualFlight} key={rIndex}>
                                  {rIndex > 0 && r.flyFrom !== lastRouteLeg.flyTo && initialFlyTo !== r.flyFrom  ?  (
                                        <p>Layover: {formatLayover(layoverTime)}</p>
                                    ) : ""}
                                    {firstLegLayoverRender}
                                    {secondLegLayoverRender}
                                    
                            <p>{r.flyFrom}-{r.flyTo}</p>
                            
                            <p>{getAirline(r.airline)} Flight # {r.flight_no}</p>
                            <p>{formatTimestamp(r.local_departure)}</p>
                            <p>{formatTimestamp(r.local_arrival)}</p>

                            {/* This checks if the route is a Layover or a Direct Route. */}
                          
                           
                            
        
                            
                           
                            </div>

                            
                        )

                    }
                        
                       

                    )}      

                </div>

            ))}
            

            
        
        </div>

    )
    }