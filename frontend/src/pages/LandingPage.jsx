import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/LandingPage.css"
import Free from '../Free_Sample_By_Wix.jpg'
const LandingPage = () => {
  return (
    <div className='LandingPage'>
        <img src={Free} alt='ss' className='landingpageimg'/> <br />
       <h1>Farmer Place</h1><br />
       <Link to='/loginadmin'>
        <button className='landingpage-btn-danger'>As a Admin</button>
       </Link><br />
       <Link to='/loginuser' >
        <button className='landingpage-btn-primary '>As a User</button>
       </Link>
    </div>
  )
}

export default LandingPage
