import { useEffect } from 'react'

export default function Geolocation(){

    useEffect(() => {
        locate()
      }, [])

    function locate(){
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            console.log(latitude, longitude)
            
        })
    }


    return (
        <>

        <p></p>
        
        </>

    )
    }