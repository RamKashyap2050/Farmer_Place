import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";

const ManageFollowers = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/loginuser");
    } else {
      // Make Axios GET requests to fetch both followers and following data
      axios
        .get(`/Follow/getfollowersforuser/${user._id}`)
        .then((response) => {
          // Assuming the response is an array of followers
          const fetchedFollowers = response.data.followers;
          setFollowers(fetchedFollowers);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching followers:", error);
        });
    }
  }, [user, navigate]);

  return (
    <>
      <HeaderforUser />
      <div>
        {/* Display the Followers */}
        <div>
          <h2>Followers</h2>
          {followers.map((follower) => (
            <div
              key={follower._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={follower.followed_by_ID.image}
                  className="Dashboardprofilephoto"
                />
                <p>{follower.followed_by_ID.user_name}</p>
              </div>

              <button className="btn btn-danger btm-sm">Remove</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageFollowers;
