import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import "../styles/Alluserposts.css";
import { Buffer } from "buffer";
import Box from "@mui/material/Box";
import {
  FaSearch,
  FaExclamationTriangle,
  FaComment,
  FaTelegram,
  FaThumbsUp,
  FaThumbsDown,
  FaTrash,
  FaArchive,
  FaSave,
} from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";
import { ToastContainer, toast } from "react-toastify";
import NoResultsFound from "./NoResultsFound";
import FewPeopleYouwanttoknow from "./FewPeopleYouwanttoknow";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const AllUserPostFeedforUser = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [show, setShow] = useState({});
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState({});
  const [users, setUsers] = useState([]);

  const handleClick = (postId) => {
    setShow((prevState) => ({
      ...prevState,
      [postId]: true,
    }));
  };

  const handleDoubleClick = (postId) => {
    setShow((prevState) => ({
      ...prevState,
      [postId]: false,
    }));
  };

  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.user);

  useEffect(() => {
    Axios.get("/Feed/getallposts/")
      .then((response) => {
        const populatedData = response.data.map((post) => ({
          ...post,
          user_name: post.user.user_name,
        }));
        setResults(populatedData);
        setFilteredResults(populatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("/Admin/getallusers/")
      .then((response) => {
        const populatedData = response.data;
        setUsers(populatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("Users", users)

  console.log("Total Feed", results);
  useEffect(() => {
    const filtered = results.filter(
      (post) =>
        (post.user_name &&
          post.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.content &&
          post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredResults(filtered);
    console.log("Filtered Results", filtered);
  }, [searchTerm, results]);

  const handleReport = (post) => {
    Axios.post("/Users/report", {
      title: post.title,
      user_name: post.user.user_name,
      reported_by: user.user_name,
    });
    toast.success("Thanks for letting us know");
  };

  const handleArchive = (post) => {
    console.log(post);
    Axios.put(`/Feed/archive/${post}`)
      .then((response) => {
        // Handle the response if needed
        console.log("PUT request successful:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error sending PUT request:", error);
      });
  };
  const handleSave = (post) => {
    const data = {
      user_id: user._id,
      post: post,
    };

    Axios.post(`/Feed/savepost`, data)
      .then((response) => {
        console.log("Post request successful:", response.data);
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  const handleLikes = (post) => {
    Axios.post(`/Feed/${post._id}/likes`, {
      postId: post._id,
      liked_by_id: user._id,
    })
      .then((response) => {
        console.log(response);
        const updatedLikes = {
          ...likes,
          [post._id]: {
            likes: response.data.likes,
            dislikes: response.data.dislikes,
          },
        };
        setLikes(updatedLikes);
        toast.success("Liked successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message || "Failed to like");
      });
  };

  const handledisLikes = (post) => {
    Axios.post(`/Feed/${post._id}/dislikes`, {
      postId: post._id,
      liked_by_id: user._id,
    })
      .then((response) => {
        console.log(response);
        toast.success("Disliked successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message || "Failed to Dislike");
      });
  };

  const handleComments = (post) => {
    Axios.post(`/Feed/${post._id}/comment`, {
      user_id: user._id,
      comment: comment,
    })
      .then((response) => {
        console.log(response);
        toast.success("Comment posted successfully");
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message || "Failed to post comment");
      });
  };

  return (
    <>
      <div style={{ position: "relative", maxWidth: "400px", margin: "auto" }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control form-control-lg"
          style={{ width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
          }}
        >
          <FaSearch />
        </div>
      </div>
      {/* {users.map((val, key) => (
        <div key={key}>
          <img
            src={val.image}
            alt="User Profile"
            className="card-img-top fewpeopleprofilephoto"
          />
        </div>
      ))}; */}

      {filteredResults.length > 0 ? (
        filteredResults
          .slice()
          .reverse()
          .map((val, key) =>
            val.FeedStatus == true &&
            val.archieved == false &&
            (val.user.PrivateAccount == false || val.user._id == user._id) &&
            (!val.user.OnlyFollowers ||
              val.User_Followers.includes(user._id) ||
              val.user._id == user._id) ? (
              <div key={key} className="Feedpage">
                {key !== 0 && key % 3 === 0 && <FewPeopleYouwanttoknow />}
                <h1
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {val.title}
                  <div>
                    {val.user.user_name !== user.user_name ? (
                      <>
                        {" "}
                        <button
                          className="btn btn-warning"
                          onClick={() => handleReport(val)}
                        >
                          Report <FaExclamationTriangle />
                        </button>{" "}
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleSave(val._id)}
                        >
                          Save
                          <FaSave />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleArchive(val._id)}
                        >
                          Archive <FaArchive />
                        </button>{" "}
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleSave(val._id)}
                        >
                          Save <FaSave />
                        </button>
                      </>
                    )}
                  </div>
                </h1>

                <Link to={`../profile/${val.user._id}`} id="homepageredirect">
                  <h5 style={{ fontStyle: "italic", fontWeight: "bold" }}>
                    <img
                      src={val.user.image}
                      alt="Post Image"
                      className="Dashboardprofilephoto"
                    />
                    &nbsp;{val.user_name}
                    {"  "} {val.user.IsSubscriber ? <MdVerified /> : <></>}
                  </h5>
                </Link>
                <img
                  src={val.post_image}
                  alt="Post Image"
                  className="feedimage"
                />
                <br />
                <br />
                <p>{val.content}</p>
                <div
                  className="likesdisplay "
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  {val.liked_by.length > 0 && (
                    <span className="text-secondary">
                      <FaThumbsUp />
                      {val.liked_by.slice(0, 1).map((likedByUser, index) => (
                        <span key={index}>
                          {" "}
                          <span style={{ fontWeight: "bolder" }}>
                            {likedByUser.user_name}
                          </span>
                        </span>
                      ))}
                      {val.liked_by.length > 1 && (
                        <span> and {val.liked_by.length - 1} more...</span>
                      )}
                    </span>
                  )}{" "}
                  &nbsp;&nbsp;&nbsp;
                  {val.disliked_by.length > 0 && (
                    <span className="text-secondary">
                      <FaThumbsDown />
                      {val.disliked_by
                        .slice(0, 1)
                        .map((dislikedByUser, index) => (
                          <span key={index}>
                            {" "}
                            <span style={{ fontWeight: "bolder" }}>
                              {dislikedByUser.user_name}
                            </span>
                          </span>
                        ))}
                      {val.disliked_by.length > 1 && (
                        <span> and {val.disliked_by.length - 1} more...</span>
                      )}
                    </span>
                  )}
                </div>
                <br />
                <br />

                <div></div>
                <div style={{ display: "flex" }}>
                  <button
                    className="btn btn-block btn-primary"
                    style={{ margin: "5px 0px 0px" }}
                    onClick={() => handleLikes(val)}
                  >
                    <FaThumbsUp />
                  </button>
                  <button
                    className="btn btn-block"
                    style={{ backgroundColor: " #CD5C5C", color: "white" }}
                    onClick={() => handledisLikes(val)}
                  >
                    <FaThumbsDown />
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-block btn-secondary"
                    onClick={() => handleClick(val._id)}
                    onDoubleClick={() => handleDoubleClick(val._id)}
                  >
                    <FaComment />
                  </button>
                </div>
                <br />
                {show[val._id] && (
                  <>
                    <div style={{ display: "flex" }}>
                      <img
                        src={user.image}
                        alt="Post Image"
                        className="Commentprofilephoto"
                      />
                      &nbsp;
                      <div className="input-container">
                        <input
                          type="text"
                          placeholder="Write your comment here..."
                          className="form-control form-control-lg"
                          style={{ borderRadius: "1rem" }}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />
                        <button
                          onClick={() => handleComments(val)}
                          className="custom-button"
                        >
                          <FaTelegram />
                        </button>
                      </div>
                    </div>
                    <div>
                      <br />
                      {val.comments &&
                        val.comments.map((comment, key) => (
                          <div
                            key={comment._id}
                            style={{ justifyContent: "space-between" }}
                            className="commentsection"
                          >
                            {comment.user_id && (
                              <>
                                <div style={{ display: "inline-flex" }}>
                                  <img
                                    src={comment.user_id.image}
                                    alt="Comment Profile"
                                    className="Dashboardprofilephoto"
                                  />
                                  &nbsp;&nbsp;
                                  <div>
                                    <p
                                      style={{
                                        fontStyle: "italic",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      {comment.user_id.user_name}
                                    </p>
                                    <p style={{ fontWeight: 500 }}>
                                      {comment.comment}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            ) : null
          )
      ) : (
        <Box sx={{ pt: 0.5 }}>
          <div
            className="d-flex"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Skeleton variant="rounded" width="60%" />
            <Skeleton variant="rounded" width={50} height={30} />
          </div>
          <div style={{ display: "flex" }}>
            <Skeleton variant="circular" width={40} height={40} />
            &nbsp;
            <Skeleton width="40%" />
          </div>
          <Skeleton variant="rectangular" width={610} height={418} />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="33%" />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="33%" />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="33%" />
          </div>
        </Box>
      )}
      <ToastContainer />
    </>
  );
};

export default AllUserPostFeedforUser;
