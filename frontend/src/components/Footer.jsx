import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import "../styles/Footer.css"
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>Farmer Place</h3>
        <p className='footer-p'>Farmer Place is a right place for any farmer who is intrested in posting something regarding Farming or someone who is able to provide solutions to everyday farming issues</p>
      </div>
      <div className="footer-right">
        <div className="footer-column">
          <ul>
            <li>About Us</li><br />
            <li>Contact Us</li><br />
            <Link to='/feedback'><li>Feedback</li></Link>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
