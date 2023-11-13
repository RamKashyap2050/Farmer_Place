import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { MdVerified } from "react-icons/md";
import PrivateAccount from "../components/PrivateAccount";
import NoPosts from "../components/NoPosts";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const IndividualProfilePageUser = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState(null); // Initialize as null
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);
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
  useEffect(() => {
    if (userData && userData.PrivateAccount === true) {
      setShowContent(false);
    } else if (
      userData &&
      userData.OnlyFollowers === true &&
      userData.User_Followers.includes(user._id)
    ) {
      setShowContent(true);
    } else {
    }
  }, [userData, user]);

  const OnFollow = (userId) => {
    const loggedInUserId = user._id;
    axios
      .post(`/Follow/addfollowers`, {
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

  const onEditProfile = () => {
    console.log("I am clicked");
    navigate("/edityourprofile");
  };
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
                  {userData.user_name}{" "}
                  {userData.IsSubscriber ? <MdVerified /> : <></>}
                </Typography>
              </CardContent>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginRight: "16px" }}>
                <h2>{postData.length}</h2>
                <h6>Posts</h6>
              </div>
              <Link
                to={`/profile/${userData._id}/viewfollowers`}
                className="custom-link"
                id="custom-link2"
                onClick={(e) => {
                  if (!showContent) {
                    e.preventDefault();
                  }
                }}
              >
                <div style={{ marginRight: "16px" }}>
                  <h2>{followers.length}</h2>
                  <h6>Followers</h6>
                </div>
              </Link>
              <Link
                to={`/profile/${userData._id}/viewfollowers`}
                className="custom-link"
                id="custom-link"
                onClick={(e) => {
                  if (!showContent) {
                    e.preventDefault();
                  }
                }}
              >
                <div style={{ marginRight: "16px" }}>
                  <h2>{following.length}</h2>
                  <h6>Following</h6>
                </div>
              </Link>
            </div>
          </div>
          {user._id === userData._id ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="btn btn-secondary"
                style={{ width: "100%", marginRight: "1rem" }}
                onClick={onEditProfile}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-primary"
                onClick={OnFollow}
                style={{ width: "100%" }}
              >
                Share Profile
              </button>
            </div>
          ) : (
            <>
              {userData.User_Following.some(
                (follower) =>
                  follower.following_id === user._id &&
                  follower.requestStatus === "pending"
              ) ? (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%", marginRight: "1rem" }}
                    onClick={() => OnFollow(userData._id)}
                  >
                    Accept
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    style={{ width: "100%", marginRight: "1rem" }}
                    onClick={() => OnFollow(userData._id)}
                  >
                    Reject
                  </button>{" "}
                </div>
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {userData.User_Followers.some(
                    (follower) =>
                      follower.follower_id === user._id &&
                      follower.requestStatus === "accepted"
                  ) ? (
                    <>
                      <button
                        className="btn btn-secondary"
                        style={{ width: "100%", marginRight: "1rem" }}
                        onClick={() => OnFollow(userData._id)}
                      >
                        Following
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={OnFollow}
                        style={{ width: "100%" }}
                      >
                        Share Profile
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary btn-block"
                      style={{ maxWidth: "100%" }}
                      onClick={() => OnFollow(userData._id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </Card>
      )}

      {showContent ? (
        <div style={{ marginBottom: "6rem" }}>
          {postData.length > 0 ? (
            postData.map((item) => (
              <div key={item._id} className="Feedpage">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <img
                  src={item.post_image}
                  className="feedimage"
                  alt="Post Image"
                />
              </div>
            ))
          ) : (
            <NoPosts />
          )}
        </div>
      ) : (
        <PrivateAccount />
      )}

      <Footer />
    </div>
  );
};

export default IndividualProfilePageUser;
