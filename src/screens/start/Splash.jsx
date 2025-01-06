import React from 'react'
import './Splash.css'
import { Link } from 'react-router-dom'
import Home from '../Home/Home'
const Splash = () => {
 
    
  return (
   <div className="check">
    {
        (localStorage.getItem('x-auth-token')) ? <Home/> : <div className="main">
        <h1 className="heading">Welcome to the  <span> FurEver Store </span></h1>
        <p>"Everything your pet needs, from paws to tail — quality care and essentials for every furry friend!"</p>
        <Link to="/Auth" ><h2 className='h2hai'>Pawfect!</h2></Link>
        
    </div>
    }
   </div>
  )
}

export default Splash