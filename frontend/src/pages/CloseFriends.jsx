import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";

const CloseFriends = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [closefriends, setClosefriends] = useState([]);
  
    useEffect(() => {
      if (!user) {
        navigate("/loginuser");
      } else {
   
        axios
          .get(`/CloseFriend/getclosefriends/${user._id}`)
          .then((response) => {
            // Assuming the response is an array of following users
            const fetchedFollowing = response.data;
            setClosefriends(fetchedFollowing);
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error fetching following:", error);
          });
      }
    }, [user, navigate]);

    console.log("Close friends", closefriends)
  return (
    <div>
       <HeaderforUser />
      <div>
        <div>
          <h2 style={{textAlign:"center", margin:"auto", marginBottom:"2rem"}}>Close Friends</h2>
          <p style={{textAlign:"center", margin:"auto", fontWeight:"lighter"}}>You can edit your close friends whenever you want, we won't notify them</p>
          {closefriends.map((friend) => (
            <div
              key={friend._id}
              style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={friend.image}
                  className="Dashboardprofilephoto"
                />
                <p>{friend.user_name}</p>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <button className="btn btn-success btm-sm">Remove</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CloseFriends
