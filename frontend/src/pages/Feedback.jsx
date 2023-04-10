import React, { useState } from 'react';
import '../styles/FeedbackForm.css';
import { FaUser, FaEnvelope, FaComments } from 'react-icons/fa';
import HeaderforUser from '../components/HeaderforUser';
import Footer from '../components/Footer';
const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  }

  return (
    <>
    <HeaderforUser /><br /><br /><br />
    <div className="feedback-form-container">
      <h2>Feedback Form</h2><br /><span className='line'></span><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className="input-group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <span className="input-group-icon"><FaUser /></span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <span className="input-group-icon"><FaEnvelope /></span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <div className="input-group">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              required
            />
            <span className="input-group-icon"><FaComments /></span>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Feedback;
