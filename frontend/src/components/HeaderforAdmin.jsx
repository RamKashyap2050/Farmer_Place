import React from 'react'
import { Link } from 'react-router-dom'
const HeaderforAdmin = () => {
  return (
  <>
      <header>
      <div className="brand">
        <h2>Farmer Place</h2>
      </div>
      <nav>
        <ul>
          <Link to='/dashboardAdmin'><li className="account">Dashboard <i className="fas fa-user"></i></li></Link>
        </ul>
      </nav>
    </header>
  </>
  )
}

export default HeaderforAdmin
