import { useRouteError } from "react-router-dom"

export default function ErrorElement(){

    const error = useRouteError()

    return (
        <>

        <h1>Error: {error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
        console.log(error.status, error.statusText, error.message)
        
        </>

    )
    }