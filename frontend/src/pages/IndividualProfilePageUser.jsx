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

const IndividualProfilePageUser = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState(null); // Initialize as null

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

  

  return (
    <div>
      <HeaderforUser />
      {userData && (
        <Card className="card">
          <CardMedia
            alt={userData.user_name}
            image={userData.image}
            className="profilephoto"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {userData.user_name}
            </Typography>
            <Button variant="contained" color="primary">
              Follow
            </Button>
          </CardContent>
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
