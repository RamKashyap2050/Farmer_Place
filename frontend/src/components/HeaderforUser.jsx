import React from 'react';
import '../styles/Header.css';

const HeaderforUser = () => {
  return (
    <header>
      <div className="brand">
        <h1>Farmer Place</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#">Feed</a></li>
          <li><a href="#">Market Place</a></li>
          <li className="account"><a href="#">Account <i className="fas fa-user"></i></a></li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderforUser;
