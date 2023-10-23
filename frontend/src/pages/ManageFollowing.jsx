import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";

const ManageFollowing = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/loginuser");
    } else {
 
      axios
        .get(`/Follow/getfollowingforuser/${user._id}`)
        .then((response) => {
          // Assuming the response is an array of following users
          const fetchedFollowing = response.data.followers;
          setFollowing(fetchedFollowing);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching following:", error);
        });
    }
  }, [user, navigate]);

  return (
    <>
      <HeaderforUser />
      <div>
        {/* Display the Following */}
        <div>
          <h2>Following</h2>
          {following.map((follower) => (
            <div
              key={follower._id}
              style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={follower.following_to_ID.image}
                  className="Dashboardprofilephoto"
                />
                <p>{follower.following_to_ID.user_name}</p>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <button className="btn btn-primary btm-sm">Unfollow</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageFollowing;
