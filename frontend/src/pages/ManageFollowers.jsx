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
      // Make an Axios GET request to fetch followers data
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
      {followers.map((follower) => (
        <div
          key={follower._id}
          style={{ display: "flex", justifyContent: "space-between", padding:"5rem" }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <img
              src={follower.following_to_ID.image}
              className="Dashboardprofilephoto"
            />
            <p>{follower.following_to_ID.user_name}</p>
          </div>
          <button className="btn btn-light btm-sm">Following</button>
        </div>
      ))}
    </div>
    <Footer />
   </>
  );
};

export default ManageFollowers;
