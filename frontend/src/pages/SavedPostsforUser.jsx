import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiBookmarkRemove } from "react-icons/ci";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";

const SavedPostsforUser = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);
  useEffect(() => {
    // Define the URL where you want to fetch saved posts from
    const apiUrl = `Feed/savedposts/${user._id}`; // Replace with your actual API endpoint

    Axios.get(apiUrl)
      .then((response) => {
        setSavedPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved posts:", error);
      });
  }, []);

  return (
    <div>
      <HeaderforUser />
      <div style={{ marginBottom: "6rem" }}>
        {savedPosts.length > 0 ? (
          savedPosts.map((item) => (
            <div key={item._id} className="Feedpage">
              <Link
                to={`../profile/${item.post_id.user._id}`}
                id="homepageredirect"
              >
                <h5 style={{ fontStyle: "italic", fontWeight: "bold" }}>
                  <img
                    src={item.post_id.user.image}
                    alt="Post Image"
                    className="Dashboardprofilephoto"
                  />
                  &nbsp;&nbsp;{item.post_id.user.user_name}
                </h5>
              </Link>
              <h3 style={{ display: "flex", justifyContent: "space-between" }}>
                {item.post_id.title}
                <div>
                  <button className="btn btn-danger">
                    Unsave <CiBookmarkRemove />
                  </button>
                </div>
              </h3>
              <p>{item.post_id.content}</p>
              <img
                src={item.post_id.post_image}
                className="feedimage"
                alt="Post Image"
              />
            </div>
          ))
        ) : (
          <p>No saved posts available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedPostsforUser;
