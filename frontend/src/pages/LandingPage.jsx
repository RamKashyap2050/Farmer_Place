import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Free from '../landingpage_Image.jpg'; // Replace with your image path

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div style={styles.landingPage}>
      <img src={Free} alt='Welcome' style={styles.landingPageImg} data-aos="fade-up" />
      <h1 style={styles.heading} data-aos="fade-down">Welcome to Farmer Place</h1>
      <p style={styles.paragraph} data-aos="fade-up">FarmConnect is a direct marketplace connecting farmers and consumers. Discover fresh fruits, vegetables, grains, and more, sourced straight from local farmers. Our platform allows farmers to create profiles, showcase their products, and share solutions to farming challenges. Join our community today to support and learn from each other. Note: All transactions are arranged directly between buyers and sellers, outside of the website.</p>
      <Link to='/loginuser'>
        <button style={styles.buttonPrimary}>Get Started</button>
      </Link>
    </div>
  );
}

const styles = {
  landingPage: {
    textAlign: 'center',
    padding: '50px',
    // backgroundColor: '#f0f0f5',
    fontFamily: 'Helvetica, sans-serif',
  },
  landingPageImg: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: '3em',
    color: '#333',
    margin: '20px 0',
  },
  paragraph: {
    fontSize: '1.2em',
    color: '#666',
    marginBottom: '30px',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.2em',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  }
};

export default LandingPage;
