import React from "react";
import { FaEnvelope } from "react-icons/fa";
import "../styles/contactus.css";

const ContactUs = () => {
  return (
    <>
      <div className="contactcard">
        <h4 className="card-title">Having trouble logging in?</h4>
        <p className="card-text">
          <a href="mailto:support@example.com">
            <FaEnvelope className="email-icon" /> &nbsp;
            thefarmerplace62@gmail.com
          </a>
        </p>
      </div>
    </>
  );
};

export default ContactUs;
