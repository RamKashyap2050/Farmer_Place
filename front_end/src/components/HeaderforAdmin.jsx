import React from 'react'

const HeaderforAdmin = () => {
  return (
  <>
      <header>
      <div className="brand">
        <h2>Farmer Place</h2>
      </div>
      <nav>
        <ul>
          <li className="account"><a href="#">Dashboard <i className="fas fa-user"></i></a></li>
        </ul>
      </nav>
    </header>
  </>
  )
}

export default HeaderforAdmin
