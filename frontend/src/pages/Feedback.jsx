import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FeedbackForm.css";
import { FaEnvelope, FaComments } from "react-icons/fa";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
const Feedback = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.user);
  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const { subject, message } = formData;

  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("subject", subject);
    userData.append("message", message);

    try {
      const response = await fetch("http://localhost:3002/Users/feedback/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: userData,
      });
      toast.success("Posted Succesfully");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setFormData({
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while posting the data");
    }
  };

  return (
    <>
      <HeaderforUser />
      <br />
      <br />
      <br />
      <div className="feedback-form-container">
        <h2>Feedback Form</h2>
        <br />
        <span className="line"></span>
        <br />
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Subject</label>
            <div className="input-group">
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={onchange}
                placeholder="Enter your Subject"
                required
              />
              <span className="input-group-icon">
                <FaEnvelope />
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <div className="input-group">
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={onchange}
                placeholder="Enter your message"
                required
              />
              <span className="input-group-icon">
                <FaComments />
              </span>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Feedback;
