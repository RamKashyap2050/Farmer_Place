import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa";
import "../styles/Feedpage.css";
const CreateCommunityContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [communityData, setCommunityData] = useState("");

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);

  useEffect(() => {
    const backendURL = `/Community/getOneCommunityforSearch/${id}`;

    axios
      .get(backendURL)
      .then((response) => {
        console.log(response.data);
        setCommunityData(response.data[0]); // Extracting the object from the array
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);
  console.log(user.user_name);

  const onChange = (e) => {
    // if (e.target.type === "file") {
    //   const file = e.target.files[0];
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     post_image: file,
    //   }));
    // } else {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [e.target.name]: e.target.value,
    //   }));
    // }
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    // const userData = new FormData();
    // userData.append("title", title);
    // userData.append("content", content);
    // userData.append("post_image", post_image);
    // try {
    //   const response = await fetch("/Feed", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: userData,
    //   });
    //   toast.success("Posted Succesfully");
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   setFormData({
    //     title: "",
    //     content: "",
    //     post_image: "",
    //   });
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("Error occurred while posting the data");
    // }
  };

  console.log("Community Data selected", communityData);
  return (
    <div>
      <HeaderforUser />
      <div className="CommunityCard">
        <div className="CommunityImageCard">
          <img
            src={communityData.Community_Cover_Image}
            className="CommunityCoverPhoto"
          />
          <img
            src={communityData.Community_Image}
            className="CommunityProfilePhoto"
          />
        </div>
        <br />
        <h3>{communityData.Community_Name}</h3>
        <div style={{ display: "flex", justifyContent: "space-around", textAlign:"center", maxWidth:"12%", margin:"10px auto" }}>
          <img src={user.image} alt="" className="Commentprofilephoto" />

          <p style={{fontWeight:"bold"}}>{user?.user_name}</p>
        </div>
        <p>{communityData.Community_Description}</p>
      </div>
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="form"
        style={{ position: "relative" }}
      >
        <div className="form-group">
          <label htmlFor="content" className="text-white">
            Broadcast:
          </label>
          <div style={{ position: "relative" }}>
            <textarea
              id="content"
              name="content"
              className="form-control form-control-lg bg-dark text-white"
              rows="3"
              required
              // value={content}
              onChange={onChange}
              placeholder="Broadcast What you want to Say"
            ></textarea>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                top: "6rem",
                left: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  alignItems: "self-start",
                }}
              >
                <div className="form-group">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="post_image"
                    name="post_image"
                    onChange={onChange}
                  />
                  <label htmlFor="post_image">
                    <FaImage />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block mt-3">
          Submit
        </button>
      </form>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between", margin:"auto", maxWidth:"80%" }}>
        <button className="btn btn-primary" style={{width:"100%"}}>Add Memebers</button>
        &nbsp;&nbsp;
        <button className="btn btn-secondary" style={{width:"100%"}}>Edit Members</button>
      </div>
      <Footer />
    </div>
  );
};

export default CreateCommunityContent;
