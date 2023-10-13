import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Assuming you are using Redux for state management
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import Axios from "axios";
import HeaderforUser from "./HeaderforUser";
import Footer from "./Footer";

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
        const filteredData = response.data.filter(
          (person) => person._id !== user._id
        );
        setPeopleData(filteredData);
        console.log(peopleData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFollow = (userId) => {
    const loggedInUserId = user._id;
    Axios.post(`/Follow/addfollowers`, {
      userId,
      loggedInUserId,
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
          People You may want to know
        </h4>
        <div className="row">
          {peopleData.map((person) => (
            <div className="col-md-4" key={person.id}>
              <div className="card">
                <img
                  src={person.image}
                  alt="User Profile"
                  className="card-img-top profilephoto"
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      margin: "0 auto",
                      padding: "10px",
                      justifyContent:"center",
                      alignItems:"center"
                    }}
                  >
                    {person.user_name}
                  </h5>
                  <button
                    className="btn btn-primary btn-md"
                    style={{ width: "100%" }}
                    onClick={() => handleFollow(person._id)}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Peopleyouwanttoknow;
