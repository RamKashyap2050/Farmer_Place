import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import "../styles/Feedpage.css";
import { ToastContainer, toast } from "react-toastify";
import AllUserPostFeedforUser from "../components/AllUserPostFeedforUser";
import FewMarketPlaceProducts from "../components/FewMarketPlaceProducts";
import {
  FaBold,
  FaImage,
  FaItalic,
  FaUnderline,
  FaVideo,
} from "react-icons/fa";
const Feedpage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    post_image: "",
  });

  const { title, content, post_image } = formData;

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);

  const onChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        post_image: file,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("title", title);
    userData.append("content", content);
    userData.append("post_image", post_image);

    try {
      const response = await fetch("/Feed", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: userData,
      });
      toast.success("Posted Succesfully");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setFormData({
        title: "",
        content: "",
        post_image: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while posting the data");
    }
  };

  return (
    <>
      <HeaderforUser />
      <br />
      <div className="Feedpagecontainer">
        <div className="Feedpage">
          <form
            onSubmit={onSubmit}
            encType="multipart/form-data"
            className="form"
            style={{ position: "relative" }}
          >
            <div className="form-group">
              <label htmlFor="title" className="text-white">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control form-control-lg bg-dark text-white"
                required
                value={title}
                onChange={onChange}
                placeholder="Share what is on your mind"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content" className="text-white">
                Content:
              </label>
              <div style={{ position: "relative" }}>
                <textarea
                  id="content"
                  name="content"
                  className="form-control form-control-lg bg-dark text-white"
                  rows="3"
                  required
                  value={content}
                  onChange={onChange}
                  placeholder="Write your content here"
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
                  <div style={{display:"flex", justifyContent:"space-around", flexDirection:"row", alignItems:"self-start"}}>
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
                    <div className="form-group">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="post_image"
                        name="post_image"
                        onChange={onChange}
                      />
                      <label htmlFor="post_image">
                        <FaBold />
                      </label>
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="post_image"
                        name="post_image"
                        onChange={onChange}
                      />
                      <label htmlFor="post_image">
                        <FaItalic />
                      </label>
                    </div>
                    {/* <FaBold style={{marginRight:"1rem"}}/>
                  <FaItalic style={{ marginRight: "1rem" }} />
                  <FaUnderline style={{ marginRight: "1rem" }} /> */}
                    <div className="form-group">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="post_image"
                        name="post_image"
                        onChange={onChange}
                      />
                      <label htmlFor="post_image">
                        <FaUnderline />
                      </label>
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="post_image"
                        name="post_image"
                        onChange={onChange}
                      />
                      <label htmlFor="post_image">
                        <FaVideo />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="form-group">
              <label htmlFor="post_image" className="text-white">
                Choose an Image to Upload <FaImage />
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="post_image"
                  name="post_image"
                  onChange={onChange}
                />
                <label
                  className="custom-file-label"
                  htmlFor="post_image"
                ></label>
              </div>
            </div> */}
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block mt-3"
            >
              Submit
            </button>
          </form>
          <br />
          <br />
          <AllUserPostFeedforUser />
        </div>
        <div className="feedpagemarket">
          <FewMarketPlaceProducts />
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Feedpage;
