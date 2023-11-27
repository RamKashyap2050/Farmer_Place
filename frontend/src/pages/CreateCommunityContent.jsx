import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa";
import "../styles/Feedpage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CreateCommunityContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [communityData, setCommunityData] = useState("");
  const [show, setShow] = useState(false);
  const [followers, setFollowers] = useState([]);

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

  const onAddMembers = () => {
    setShow(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/loginuser");
    } else {
      axios
        .get(`/Follow/getfollowersforuser/${user._id}`)
        .then((response) => {
          const fetchedFollowers = response.data.followers;
          setFollowers(fetchedFollowers);
          console.log(followers);
        })
        .catch((error) => {
          console.error("Error fetching followers:", error);
        });
    }
  }, [user, navigate]);

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

  const handleAddMembersSubmit = (event) => {
    // Add your logic for submitting members here
    event.preventDefault();
    // Your logic for adding members to the community
    setShow(false);
  };

  const handleAddMembersClick = () => {
    setShow(true);
    console.log("Clicked");
  };

  const handleModalClose = () => {
    setShow(false);
  };

  console.log(show);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            maxWidth: "12%",
            margin: "10px auto",
          }}
        >
          <img src={user.image} alt="" className="Commentprofilephoto" />

          <p style={{ fontWeight: "bold" }}>{user?.user_name}</p>
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
      {show ? (
        <Modal
          show={show}
          onHide={handleModalClose}
          aria-labelledby="contained-modal-title-vcenter"
          style={{ opacity: 1, marginTop: "15rem" }}
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Members
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{fontWeight:"bold"}}>You can add people from your followers to Community: </p><br />
            <div style={{overflowY:"scroll"}}>
            {followers.map((follower) => (
              <div key={follower.id} style={{display:"flex", justifyContent:"space-between", marginBottom:"2rem"}}>
               <div style={{display:"flex"}}>
               <img src={follower.followed_by_ID.image}  className="Commentprofilephoto" />&nbsp;&nbsp;
                <p>{follower.followed_by_ID.user_name}</p>
               </div>
                <button className="btn btn-secondary">Join</button>
              </div>
            ))}
            </div>
            <Button
              type="submit"
              variant="primary"
              onSubmit={handleAddMembersSubmit}
            >
              Add Members
            </Button>
          </Modal.Body>
        </Modal>
      ) : null}
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          maxWidth: "80%",
        }}
      >
        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={handleAddMembersClick}
        >
          Add Memebers
        </button>
        &nbsp;&nbsp;
        <button className="btn btn-secondary" style={{ width: "100%" }}>
          Edit Members
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CreateCommunityContent;
