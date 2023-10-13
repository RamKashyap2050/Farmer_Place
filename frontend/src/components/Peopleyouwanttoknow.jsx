import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Assuming you are using Redux for state management
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import Axios from "axios";
import HeaderforUser from "./HeaderforUser";
import Footer from "./Footer";
import { Buffer } from "buffer";

const Peopleyouwanttoknow = () => {
  const [peopleData, setPeopleData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);

  useEffect(() => {
    Axios.get("/Admin/getallusers")
      .then((response) => {
        // Filter out the current user from the list
        const filteredData = response.data.filter((person) => person._id !== user._id);
        setPeopleData(filteredData);
        console.log(peopleData)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleFollow = (userId) => {
    const loggedInUserId = user._id;
    Axios.post(`/Follow/addfollowers`, {
       userId,
       loggedInUserId
    })
      .then((response) => {
        console.log(`You followed user with ID ${userId}`);
      })
      .catch((error) => {
        console.error("Error following user:", error);
      });
  };

  return (
    <div>
      <HeaderforUser />
      <div className="ml-4 p-4" style={{ marginLeft: "2rem", padding: "3rem" }}>
        <h4
          style={{
            marginBottom: "4rem",
            fontStyle: "italic",
            fontFamily: "cursive",
          }}
        >
          People You may want to know?
        </h4>
        <div className="d-flex">
          {peopleData.map((person) => (
            <div
              key={person.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <img
                  src={person.image}
                  alt="User Profile"
                  className="Dashboardprofilephoto"
                />
                {person.user_name}
              </div>
              <button
                className="btn btn-primary ml-auto"
                onClick={() => handleFollow(person._id)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Peopleyouwanttoknow;
