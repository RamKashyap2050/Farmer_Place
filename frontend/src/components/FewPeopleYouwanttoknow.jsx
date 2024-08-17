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
  const [followers, setFollowers] = useState([]);
  const [UserFollowing, setUserFollowing] = useState([]);
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
        const fetchedFollowing = response.data.followers.map((follower) => ({
          followerDetails: follower.following_to_ID,
          requestStatus: follower.requestStatus,
        }));
        setFollowing(fetchedFollowing);
      })
      .catch((error) => {
        console.error("Error fetching following:", error);
      });
  }, [user._id]);

  useEffect(() => {
    Axios.get(`/Follow/getfollowersforuser/${user._id}`)
      .then((response) => {
        const fetchedFollowers = response.data.followers.map((follower) => ({
          followerDetails: follower.followed_by_ID,
          requestStatus: follower.requestStatus,
        }));
        setFollowers(fetchedFollowers);
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
      });
  }, [user._id]);

  console.log(
    `Main Following for User ${user.user_name} on Few People Page`,
    following
  );
  console.log(
    `Main Page Followers for User ${user.user_name} on Few people page`,
    followers
  );
  const isUserFollowed = (userId) => {
    const followerInfo = followers.find(
      (followingToID) => followingToID.followerDetails._id === userId
    );
    const followingInfo = following.find(
      (followingToID) => followingToID.followerDetails._id === userId
    );

    return !!followingInfo || !!followerInfo; // Return true if followingInfo is found, otherwise false
  };

  const isRequestAccepted = (userId) => {
    const followingInfo = following.find(
      (followingToID) => followingToID.followerDetails._id === userId
    );

    return followingInfo ? followingInfo.requestStatus === "accepted" : false;
  };

  const isRequestPending = (userId) => {
    const followingInfo = followers.find(
      (followingToID) => followingToID.followerDetails._id === userId
    );

    return followingInfo ? followingInfo.requestStatus === "pending" : false;
  };

  const handleAcceptRequest = (userId) => {
    // Add logic to handle accepting the follow request
  };

  const handleFollow = (userId) => {
    const loggedInUserId = user._id;

    // Optimistically update the state
    setFollowing([...following, { _id: userId }]);

    Axios.post(`/Follow/addfollowers`, {
      userId,
      loggedInUserId,
    })
      .then((response) => {
        console.log(`You followed user with ID ${userId}`);
        // Optionally update the state again upon a successful request (you can remove this if you don't need it)
        setFollowing([...following, { _id: userId }]);
      })
      .catch((error) => {
        console.error("Error following user:", error);
        // Revert the state if there's an error
        setFollowing(
          following.filter((followingToID) => followingToID._id !== userId)
        );
      });
  };

  const handleunFollow = (userId) => {
    const loggedInUserId = user._id;

    // Optimistically update the state
    setFollowing(
      following.filter((followingToID) => followingToID._id !== userId)
    );

    Axios.delete(`/Follow/unfollow`, {
      data: {
        userId: userId,
        loggedInUserId: loggedInUserId,
      },
    })
      .then((response) => {
        console.log(`You unfollowed user with ID ${userId}`);
        setFollowing(
          following.filter((followingToID) => followingToID._id !== userId)
        );
      })
      .catch((error) => {
        console.error("Error unfollowing user:", error);
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
          { limitedPeopleData.map((person) => (
            <div className="col-md-4" key={person?._id}>
              <div className="card cardinpeople">
                <Link to={`/profile/${person?._id}`}>
                  <img
                    src={person?.image}
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
                  <button
                    className={`btn btn-${
                      isUserFollowed(person?._id)
                        ? isRequestAccepted(person?._id)
                          ? "secondary"
                          : isRequestPending(person?._id)
                          ? "success"
                          : "danger"
                        : "primary"
                    } btn-md`}
                    style={{ width: "100%" }}
                    onClick={() => {
                      isUserFollowed(person?._id)
                        ? isRequestAccepted(person?._id)
                          ? handleunFollow(person?._id)
                          : handleAcceptRequest(person?._id)
                        : handleFollow(person?._id);
                    }}
                  >
                    {isUserFollowed(person?._id)
                      ? isRequestAccepted(person?._id)
                        ? "Following"
                        : isRequestPending(person?._id)
                        ? "Accept"
                        : "Request Sent"
                      : "Follow"}
                  </button>
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
