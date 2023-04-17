import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { FaFacebookMessenger, FaNewspaper, FaShoppingBag, FaUser } from 'react-icons/fa';
const HeaderforUser = () => {
  return (
    <header>
      <div className="brand">
        <h1>Farmer Place</h1>
      </div>
      <nav>
        <ul>
          <Link to='/Feedpage'><li><a href="#"><FaNewspaper/></a></li></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to='/marketplace'><li><a href="#"><FaShoppingBag/></a></li></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to='/dashboard'><li className="account"><a href="#"><FaUser /></a></li></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* <Link to='/marketplace'><li><a href="#"><FaFacebookMessenger /></a></li></Link>&nbsp;&nbsp;&nbsp;&nbsp; */}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderforUser;
