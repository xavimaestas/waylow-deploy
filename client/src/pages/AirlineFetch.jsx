import { useEffect, useState } from 'react'
import '../App.css'
import FlightData from '../components/FlightData'
import axios from 'axios'




function dateChange(date){
  let dateSplit = date.split("-")
  return dateSplit
}


export default function AirlineFetch() {


  const [seeFilter, setSeeFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [flightObject, setFlightObject] = useState([])
  const [userCheckedBags, setUserCheckedBags] =useState([])
  const [inputValues, setInputValues] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    class: '',
    carryOns: ["0"],
    checkedBags: ["0"],
    passengers: '',
    maxStops: '',
    sort: '',
    selectedAirlines: ''
  })

  

  const flyFrom = inputValues.from 
  const flyTo = inputValues.to
  const dateFromValue = inputValues.departure
  const returnFromValue = inputValues.return
  const [fromYear, fromMonth, fromDay] = dateChange(dateFromValue)
  const [returnYear, returnMonth, returnDay] = dateChange(returnFromValue)
  const flyClass = inputValues.class
  const carryOns = inputValues.carryOns
  const checkedBags = inputValues.checkedBags
  const passengers = inputValues.passengers
  const maxStops = inputValues.maxStops
  const sort = inputValues.sort
  const selectedAirlines = inputValues.selectedAirlines

  

  const showFilters = () => {
    setSeeFilter(!seeFilter) 

  }


  const constructUrl = () => {
    // constructURL creates the url necessary for the GET request with the inputs from the user, these are then input to the url here and then passed as a param to the url that is then sent to the backend with our GET request. 

    const url = `https://api.tequila.kiwi.com/v2/search?fly_from=${flyFrom}&fly_to=${flyTo}&date_from=${fromDay}%2F${fromMonth}%2F${fromYear}&date_to=${fromDay}%2F${fromMonth}%2F${fromYear}&return_from=${returnDay}%2F${returnMonth}%2F${returnYear}&return_to=${returnDay}%2F${returnMonth}%2F${returnYear}&max_fly_duration=20&ret_from_diff_city=true&ret_to_diff_city=true&one_for_city=0&one_per_date=0&adults=${passengers}&children=0&selected_cabins=${flyClass}&adult_hold_bag=${checkedBags}&adult_hand_bag=${carryOns}&only_working_days=false&only_weekends=false&partner_market=us&max_stopovers=${maxStops}&max_sector_stopovers=2&select_airlines=&vehicle_type=aircraft&sort=${sort}&limit=50&curr=USD`
// maybe if there is no input, set inputs to flyFrom, users location, fly to Random, dates one week and two weeks out. 
    return url


  }

    
//  fethData: sets loading to true while we await the response from our GET response to the backend
// the url parameter of the get request runs contructURL to get the url.
// we then append the flight object, our flightObject is always going to be empty, but just in case. 
// Then we set the flight object to the data we get from the fetch to the backend. and set the spinner to false


  const fetchData = async () => {
    
    try {
      setIsLoading(true)
      const response = await axios.get('http://localhost:8000/flights' , {
        
        params: {
          url: constructUrl()  
        }

       
      })
      console.log(response.data)
      
      setFlightObject(prevFlights => [...prevFlights, ...response.data.data])

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

// handleClick handles the click of the search, prevents default of the form, resets all of the data and runs fetchData
  const handleClick = async (e) => {
    e.preventDefault()

    setInputValues({
      from: '',
      to: '',
      departure: '',
      return: '',
      class: '',
      carryOns: ["0"],
      checkedBags: ["0"],
      passengers: '',
      maxStops: '',
      sort: '',
      selectedAirlines: ''
    })

    setFlightObject([]) 

    await fetchData()
    
  }




  return ( 
    <div className="airline-search-container">

      <form className="search-bar">

        <div className="visible-filter-container">

          <div className="passengers-container">
            <p>Passengers</p>

            <select 
              required 
              id="passengers"
              className="passengers-input"
              value={inputValues.passengers} 
              onChange={(e) => {
                const numPassengers = e.target.value;
                setInputValues((prevInputValues) => ({
                  ...prevInputValues,
                  passengers: numPassengers,
                  carryOns: Array.from({ length: numPassengers }, () => "0"), // Initialize with "0" values for each passenger
                  checkedBags: Array.from({ length: numPassengers }, () => "0"), // Initialize with "0" values for each passenger
                }))
              }}
            > 
              <option value="1" >1</option>
              <option value="2" >2</option>
              <option value="3" >3</option>
              <option value="4" >4</option>
              <option value="5" >5</option>
              <option value="6" >6</option>
              <option value="7" >7</option>
              <option value="8" >8</option>
              <option value="9" >9</option>
            </select>
          </div>

          <div className="sort-container">
            <p>Sort By</p>

            <select 
              required 
              id="sort"
              className="sort-input"
              value={inputValues.sort} 
              onChange={(e) => setInputValues({ ...inputValues, sort: e.target.value })} 
            > 
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="quality">Quality</option>
              <option value="date">Date</option>
            </select>
          </div>


        </div>
       
        <input 
          required 
          id="from" 
          type="text" 
          placeholder="From" 
          value={inputValues.from} 
          onChange={(e) => setInputValues({ ...inputValues, from: e.target.value })}
        />
        
        <input 
          required 
          id="to" 
          type="text" 
          placeholder="To" 
          value={inputValues.to} 
          onChange={(e) => setInputValues({ ...inputValues, to: e.target.value })}
        />

        <p>Departure</p>
        <input 
          required 
          id="departure" 
          type="date" 
          placeholder="Departure" 
          value={inputValues.departure} 
          onChange={(e) => setInputValues({ ...inputValues, departure: e.target.value })}
        />

        <p>Return</p>
        <input 
          required 
          id="return" 
          type="date" 
          placeholder="Return" 
          value={inputValues.return} 
          onChange={(e) => setInputValues({ ...inputValues, return: e.target.value })}
        />

        <div onClick={showFilters} className="filters-dropdown">
          <p>Filters</p>
          <i  className="fa-solid fa-filter"></i>
        </div>

        <div className={seeFilter ? "selectors-container" : "selectors-container-hidden"}>
        

       
          <div className="carryon-container">
            <p>Carry-On Bags</p>

            <select 
              required 
              id="carryon"
              className="carryon-input"
              value={inputValues.carryOns[0]} 
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValues({
                  ...inputValues,
                  carryOns: [newValue],
                    
                })
              }} 
            > 
              <option value="0">0</option>
              <option value="1" >1</option>
              <option value="1,1" >2</option>
              <option value="1,1,1" >3</option>
              <option value="1,1,1,1" >4</option>
              <option value="1,1,1,1,1" >5</option>
              {/* <option value="1,1,1,1,1,1" >6</option>
              <option value="1,1,1,1,1,1,1" >7</option>
              <option value="1,1,1,1,1,1,1,1" >8</option>
              <option value="1,1,1,1,1,1,1,1,1" >9</option> */}
             
            </select>
          </div>
     
          {/* need to fix carryons and checked bags to work with multiple passengers */}

         
          {/* <div className="checked-container">
            <p>Checked Bags</p>

            <select 
              required 
              id="checked"
              className="checked-input"
              value={inputValues.checkedBags[0]} 
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValues({
                  ...inputValues,
                  checkedBags: [newValue]
                })  
              }}
              
            > 
              <option value="0">0</option>
              <option value="1" >1</option>
              <option value="1,1" >2</option>
              <option value="1,1,1" >3</option>
              <option value="1,1,1,1" >4</option>
              <option value="1,1,1,1,1" >5</option>
              <option value="1,1,1,1,1,1" >6</option>
              <option value="1,1,1,1,1,1,1" >7</option>
              <option value="1,1,1,1,1,1,1,1" >8</option>
              <option value="1,1,1,1,1,1,1,1,1" >9</option>
              <option value="2,1,1,1,1,1,1,1,1" >10</option>
              <option value="2,2,1,1,1,1,1,1,1" >11</option>
              <option value="2,2,2,1,1,1,1,1,1" >12</option>
              <option value="2,2,2,2,1,1,1,1,1" >13</option>
              <option value="2,2,2,2,2,1,1,1,1" >14</option>
              <option value="2,2,2,2,2,2,1,1,1" >15</option>
              <option value="2,2,2,2,2,2,2,1,1" >16</option>
              <option value="2,2,2,2,2,2,2,2,1" >17</option>
              <option value="2,2,2,2,2,2,2,2,2" >18</option>
              {console.log(checkedBags)}
            </select>
          </div> */}

          <div className="checked-container">
            <p>Checked Bags</p>

            <div className="checked-add-minus-container">

            
            <i className="fa-solid fa-plus"></i>
              <input 
                required 
                id="checked"
                className="checked-input"
                type="text"
                min="0"
                max="8"
                value={userCheckedBags} 
                onChange={(e) => {
                  const newValue = e.target.value;
                  let checkedBagsValue = ''
                  setUserCheckedBags(newValue)

                    if(newValue === '0'){
                      checkedBagsValue ='0'
                  } else if(newValue === '1'){
                      checkedBagsValue = '1'
                  } else if(newValue === '2'){
                    checkedBagsValue = '1,1'
                  } else if(newValue === '3'){
                      checkedBagsValue = '1,1,1'
                  } else if(newValue === '4'){
                      checkedBagsValue = '1,1,1,1'
                  } else if(newValue === '5'){
                      checkedBagsValue = '1,1,1,1,1'
                  } else if(newValue === '6'){
                      checkedBagsValue = '1,1,1,1,1,1'
                  } else if(newValue === '7'){
                      checkedBagsValue = '1,1,1,1,1,1,1'
                  } else if(newValue === '8'){
                      checkedBagsValue = '1,1,1,1,1,1,1,1'
                  } 

                  

                  
                  setInputValues({
                    ...inputValues,
                    checkedBags: [checkedBagsValue]
                  })  

                 
                  
                }}

                
                
              />
              <i className="fa-solid fa-minus"></i>
             

            </div>
           
            
              
           
          
          </div>

        
          <div className="max-stops-container">
            <p>Max Stops</p>

            <select 
              required 
              id="max-stops"
              className="max-stops-input"
              value={inputValues.maxStops} 
              onChange={(e) => setInputValues({ ...inputValues, maxStops: e.target.value })} 
            > 
              <option value="0">0</option>
              <option value="1" >1</option>
              <option value="2" >2</option>
            </select>
            
          </div>

          {/* future feature add airline sort, maybe pull from airline list, or add another smaller airline list to sort, current airline list is pretty big. */}

           {/* <div className="selected-airlines-container">
            <p>Filter Airlines</p>

            <select 
              required 
              id="selected-airlines"
              className="selected-airlines-input"
            > 
              <option value="1">
                <input
                  type="checkbox"
                  value="Delta"
                  checked={inputValues.selectedAirlines.includes('Delta')}
                />
              </option>
            
            </select>
            
          </div> */}

          <div className="airline-class-container">

            <p>Airline Class</p>
            <select 
              required 
              id="class"
              className="airlineClass"
             
              value={inputValues.class} 
              onChange={(e) => setInputValues({ ...inputValues, class: e.target.value })} 
            > 
              <option value="M">Economy</option>
              <option value="W" >Economy Premium</option>
              <option value="C" >Business</option>
              <option value="F" >First Class</option>
            </select>
          </div>



        </div>

        
       

        <button id="search_btn" type="submit" onClick={inputValues.from && inputValues.to && inputValues.departure && inputValues.return ? handleClick : null}>Search</button>
      </form>

      {/* need to add function that if incorrect data or no data in inputs, search disabled. */}


      {isLoading ? <i className="fa-solid fa-spinner fa-spin 2xl" ></i> : null}
      
    
      
        <FlightData 
          flights={flightObject} 
          flyFrom={inputValues.from} 
          flyTo={inputValues.to}
          dateDepart={inputValues.departure}
          dateReturn={inputValues.return}
          
        /> 

      
    </div> 
  )
}


