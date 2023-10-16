import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { width } from "@mui/system";

const IndividualProfilePageUser = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState(null); // Initialize as null
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const backendURL = `/Users/getOneUserforSearch/${id}`;

    axios
      .get(backendURL)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  useEffect(() => {
    const backendURL = `/Users/getuser/${id}`;

    axios
      .get(backendURL)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/Follow/getfollowersforuser/${id}`)
      .then((response) => {
        const fetchedFollowers = response.data.followers;
        setFollowers(fetchedFollowers);
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/Follow/getfollowingforuser/${id}`)
      .then((response) => {
        const fetchedFollowing = response.data.followers;
        setFollowing(fetchedFollowing);
      })
      .catch((error) => {
        console.error("Error fetching following:", error);
      });
  }, [id]);

  return (
    <div>
      <HeaderforUser />
      {userData && (
        <Card className="cardinindividual">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <CardMedia
                alt={userData.user_name}
                image={userData.image}
                className="profilephoto"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {userData.user_name} 
                </Typography>
              </CardContent>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginRight: "16px" }}>
                <h2>{postData.length}</h2>
                <h6>Posts</h6>
              </div>
              <div style={{ marginRight: "16px" }}>
                <h2>{followers.length}</h2>
                <h6>Followers</h6>
              </div>
              <div style={{ marginRight: "16px" }}>
                <h2>{following.length}</h2>
                <h6>Following</h6>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block" style={{ maxWidth: "100%" }}>
            Follow
          </button>
        </Card>
      )}

      <div>
        {postData.map((item) => (
          <div key={item._id} className="Feedpage">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <img src={item.post_image} className="feedimage" alt="Post Image" />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default IndividualProfilePageUser;
