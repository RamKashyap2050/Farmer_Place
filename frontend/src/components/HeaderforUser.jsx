import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
const HeaderforUser = () => {
  return (
    <header>
      <div className="brand">
        <h1>Farmer Place</h1>
      </div>
      <nav>
        <ul>
          <Link to='/Feedpage'><li><a href="#">Feed</a></li></Link>&nbsp;&nbsp;
          <Link to='/marketplace'><li><a href="#">Market Place</a></li></Link>&nbsp;&nbsp;
          <Link to='/dashboard'><li className="account"><a href="#">Account <i className="fas fa-user"></i></a></li></Link>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderforUser;
