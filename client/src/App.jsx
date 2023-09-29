import { useEffect, useState } from 'react'
import AirlineFetch from './pages/AirlineFetch.jsx'
import Layout from './pages/Layout.jsx'
import ErrorElement from './components/ErrorElement.jsx'
import Geolocation from './components/Geolocation.jsx'
import Home from './pages/Home.jsx'



import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route  
} from 'react-router-dom'






function App() {

 

 

  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement={<ErrorElement/>}>
      <Route index element={<Home/>}></Route>
      <Route path="/AirlineSearch" element={<AirlineFetch/>}></Route>
      <Route path="/Geolocation" element={<Geolocation/>}></Route>
    </Route>
  ))

  return (
  <RouterProvider router={ router }/>
  )
}

export default App
