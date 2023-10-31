import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Assuming you are using Redux for state management
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import Axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FewPeopleYouwanttoknow = () => {
  const [peopleData, setPeopleData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);

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
  useEffect(() => {
    Axios.get(`/Follow/getfollowingforuser/${user._id}`)
      .then((response) => {
        const fetchedFollowing = response.data.followers.map(
          (follower) => follower.following_to_ID
        );
        setFollowing(fetchedFollowing);
        console.log("Following for fewpeople", following);
      })
      .catch((error) => {
        console.error("Error fetching following:", error);
      });
  }, [user._id]);

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

  const handleunFollow = (userId) => {
    const loggedInUserId = user._id;
    console.log(userId, loggedInUserId);
    Axios.delete(`/Follow/unfollow`, {
      data: {
        userId: userId,
        loggedInUserId: loggedInUserId,
      }
    })
    .then((response) => {
      console.log(`You unfollowed user with ID ${userId}`);
    })
    .catch((error) => {
      console.error("Error following user:", error);
    });
  };

  const onpeoplewantoknow = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/followers");
    }
  };

  const limitedPeopleData = peopleData.slice(0, 3);

  return (
    <div>
      <div className="ml-4 p-4" style={{ marginLeft: "2rem", padding: "3rem" }}>
        <div
          className="d-flex"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h4
            style={{
              fontStyle: "italic",
              fontFamily: "cursive",
            }}
          >
            Suggested for you
          </h4>
          <button
            className="btn btn-link" // Use btn-link class to remove default button styles
            onClick={onpeoplewantoknow}
          >
            <FaArrowRight />
          </button>
        </div>
        <div className="row d-flex" style={{ justifyContent: "space-around" }}>
          {limitedPeopleData.map((person) => (
            <div className="col-md-4" key={person._id}>
              <div className="card cardinpeople">
                <Link to={`/profile/${person._id}`}>
                  <img
                    src={person.image}
                    alt="User Profile"
                    className="card-img-top fewpeopleprofilephoto"
                  />
                </Link>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      margin: "0 auto",
                      padding: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {person.user_name}
                  </h5>
                  {following.some(
                    (followingToID) => followingToID._id === person._id
                  ) ? (
                    <button
                      className="btn btn-secondary btn-md"
                      style={{ width: "100%" }}
                      onClick={() => handleunFollow(person._id)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-md"
                      style={{ width: "100%" }}
                      onClick={() => handleFollow(person._id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FewPeopleYouwanttoknow;
