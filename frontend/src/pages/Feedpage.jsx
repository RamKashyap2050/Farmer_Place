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
