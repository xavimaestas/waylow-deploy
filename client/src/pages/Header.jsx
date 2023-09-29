import { NavLink } from 'react-router-dom'

export default function Header(){

    const activeStyles = {
        fontWeight: "bold",
        color: "#A5AEB6"
    }

    return (

        
            <nav>
            <NavLink 
                to="/" 
                style={({isActive}) => isActive ? activeStyles : null } 
            ><div className="logo-container">
                <p>waylow</p>
                <i className="fa-solid fa-plane-departure"></i>
            </div>
            </NavLink>
            <NavLink 
                to="/AirlineSearch" 
                style={({isActive}) => isActive ? activeStyles : null } 
            >airline search
            </NavLink>
            {/* <NavLink 
                to="/Geolocation" 
                style={({isActive}) => isActive ? activeStyles : null } 
            >geo
            </NavLink> */}
            </nav>  
        
    )
}