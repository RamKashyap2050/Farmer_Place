import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import HeaderforAdmin from "../components/HeaderforAdmin";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
const CheckoutFeedbacks = () => {
  const navigate = useNavigate();
  const { Admin } = useSelector((state) => state.auth);
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    console.log("useEffect triggered with user:", Admin);
    if (!Admin) {
      navigate("/loginadmin");
    }
  }, [Admin, navigate]);
  useEffect(() => {
    // Make an HTTP request to retrieve feedback data
    fetch("http://localhost:3002/Admin/getfeedbacks")
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved feedbacks in state
        setFeedbacks(data);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  }, []);
  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div>
      <HeaderforAdmin />
      <h1 style={{marginBottom:"4rem", textAlign:"center"}}>Checkout Contact Us</h1>
      <table className="table" style={{ width: "50%" }}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Profile Photo</th>
            <th>Subject</th>
            <th>Message</th>
            {/* Add additional table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.user.user_name}</td>
              <td>
                <img
                  src={convertImageBufferToBase64(feedback.user.image.data)}
                  alt="User Profile"
                  className="Commentprofilephoto"
                />
              </td>
              <td>{feedback.subject}</td>
              <td>{feedback.message}</td>
              {/* Add additional table cells for other feedback data */}
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default CheckoutFeedbacks;
