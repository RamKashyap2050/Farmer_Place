import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const FriendRequestApproval = () => {
  const { user } = useSelector((state) => state.auth);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

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
    <div>
      <HeaderforUser />
      <h3>Pending Requests</h3>
      <ul>
        {followers.map((follower) =>
          follower.requestStatus === "pending" && follower.following_to_ID !== user._id ? (
            <li key={follower._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={follower.followed_by_ID.image} 
                  alt="Profile"
                    className="Dashboardprofilephoto"
                />
                <div>
                  <h4>{follower.followed_by_ID.user_name}</h4>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Button variant="success" style={{ marginRight: "10px" }}>
                  Accept
                </Button>
                <Button variant="danger">Reject</Button>
              </div>
            </li>
          ) : null
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default FriendRequestApproval;
