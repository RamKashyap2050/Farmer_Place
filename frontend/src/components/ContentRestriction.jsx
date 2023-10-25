import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, FormGroup } from "react-bootstrap";
import { FaGlobe, FaUsers, FaLock } from "react-icons/fa";
import HeaderforUser from "./HeaderforUser";
import Footer from "./Footer";

const ContentRestriction = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("public");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSave = () => {
    const data = {
      contentRestriction: selectedOption,
    };

    axios
      .put(`http://localhost:3002/Users/contentrestriction/${user._id}`, data)
      .then((response) => {
        console.log("Response from the backend:", response);
        navigate("/feedpage");
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
      });
  };

  return (
    <div>
      <HeaderforUser />
      <div style={{ maxWidth: "75%", margin: "0 auto" }}>
        <h1 className="text-center">Privacy</h1>
        <FormGroup>
          <label>Select an option:</label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="public"
                checked={selectedOption === "public"}
                onChange={handleOptionChange}
              />
              <span className="icon-public">
                <FaGlobe />
                &nbsp;Public
              </span>
              <p>
                With this option content is visible to everyone using
                FarmerPlace, which means anyone can Like or Dislike or comment
                on your post, even report it{" "}
              </p>
            </label>
          </div>
          <div className="radio disabled">
            <label>
              <input
                type="radio"
                value="followers"
                checked={selectedOption === "followers"}
                onChange={handleOptionChange}
                disabled={true} // Set disabled to true to disable the radio button
              />
              <span className="icon-followers">
                <FaUsers />
                &nbsp;Followers
              </span>
              <p>
                With this option content is visible to your followers using
                FarmerPlace, which means only your followers can Like or Dislike
                or comment on your post, even report it{" "}
              </p>
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="only-me"
                checked={selectedOption === "only-me"}
                onChange={handleOptionChange}
              />
              <span className="icon-only-me">
                <FaLock />
                &nbsp;Only Me
              </span>
              <p>
                Content is only visible to you, No one else except you can the
                see the content you post with this post
              </p>
            </label>
          </div>
        </FormGroup>
        <Button className="btn btn-block" onClick={handleSave}>
          Save
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ContentRestriction;
