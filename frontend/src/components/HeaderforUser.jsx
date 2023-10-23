import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import {
  FaUserFriends,
  FaNewspaper,
  FaShoppingBag,
  FaUser,
  FaFacebookMessenger 
} from "react-icons/fa";
const HeaderforUser = () => {
  return (
    <header>
      <div className="brand">
        <h1>Farmer Place</h1>
      </div>
      <nav>
        <ul>
          <Link to="/Feedpage">
            <li>
              <a href="#" className="brand-icons">
                <FaNewspaper />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/marketplace">
            <li>
              <a href="#" className="brand-icons">
                <FaShoppingBag />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/dashboard">
            <li>
              <a href="#" className="brand-icons">
                <FaUser />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/workinprogress">
            <li>
              <a href="#" className="brand-icons">
                <FaFacebookMessenger />
              </a>
            </li>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </ul>
      </nav>
    </header>
  );
};

export default HeaderforUser;
