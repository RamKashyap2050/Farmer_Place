import React, { useState } from "react";
import { useSelector } from "react-redux";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCommunity = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    Admin_ID: user._id,
    Community_Name: "",
    Community_Description: "",
    Community_Image: null,
    Community_Cover_Image: null,
  });

  const navigate = useNavigate();
  const {
    Admin_ID,
    Community_Name,
    Community_Description,
    Community_Image,
    Community_Cover_Image,
  } = formData;

  const onChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onShowExistingCommunities = () => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/managecommunity/existingcommunity");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to send files
      const formDataToSend = new FormData();
      formDataToSend.append("Admin_ID", Admin_ID);
      formDataToSend.append("Community_Name", Community_Name);
      formDataToSend.append("Community_Description", Community_Description);
      formDataToSend.append("Community_Image", Community_Image);
      formDataToSend.append("Community_Cover_Image", Community_Cover_Image);

      // Make the POST request using Axios
      const response = await axios.post(
        "/Community/createcommunity",
        formDataToSend
      );

      // Handle the response, e.g., show a success message
      console.log(response.data);

      // Reset the form after submission
      setFormData({
        Admin_ID: user._id,
        Community_Name: "",
        Community_Description: "",
        Community_Image: null,
        Community_Cover_Image: null,
      });
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error creating community:", error);
    }
  };

  return (
    <div>
      <HeaderforUser />
      <div style={{ margin: "2rem auto", textAlign: "center" }}>
        <h1>Manage Community</h1>
        <button
          className="round-btn  btn btn-primary"
          //   onClick={onCreateCommunity}
        >
          Create a new community <FaUserPlus />
        </button>
        &nbsp;&nbsp;
        <button
          className="round-btn btn btn-secondary"
          onClick={onShowExistingCommunities}
        >
          Show your Existing Communities/Communities you are a part
        </button>
      </div>
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="form"
        style={{ position: "relative" }}
      >
        <div className="form-group">
          <label htmlFor="Community_Name" className="text-white">
            Community Name:
          </label>
          <input
            type="text"
            id="Community_Name"
            name="Community_Name"
            className="form-control form-control-lg bg-dark text-white"
            required
            value={Community_Name}
            onChange={onChange}
            placeholder="Enter Community Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Community_Description" className="text-white">
            Community Description:
          </label>
          <textarea
            id="Community_Description"
            name="Community_Description"
            className="form-control form-control-lg bg-dark text-white"
            rows="3"
            required
            value={Community_Description}
            onChange={onChange}
            placeholder="Write Community Description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="Community_Image" className="text-white">
            Choose an Profile Image for Community:
          </label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="Community_Image"
              name="Community_Image"
              onChange={onChange}
            />
            <label
              className="custom-file-label"
              htmlFor="Community_Image"
            ></label>
          </div>
          <div className="form-group">
            <label htmlFor="Community_Image" className="text-white">
              Choose an Cover Photo for Community:
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="Community_Cover_Image"
                name="Community_Cover_Image"
                onChange={onChange}
              />
              <label
                className="custom-file-label"
                htmlFor="Community_Cover_Image"
              ></label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block mt-3">
          Create Community
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default CreateCommunity;
