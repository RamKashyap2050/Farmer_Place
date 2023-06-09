import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import HeaderforAdmin from "../components/HeaderforAdmin";
import Axios from "axios";
import { Buffer } from "buffer";
import "../styles/AllListingsforAdmin.css";
import { ToastContainer, toast } from "react-toastify";

const AllListingsforAdmin = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { Admin } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("useEffect triggered with user:", Admin);
    if (!Admin) {
      navigate("/loginadmin");
    }
  }, [Admin, navigate]);

  useEffect(() => {
    Axios.get("/Admin/getallProducts")
      .then((response) => {
        const populatedData = response.data.map((post) => ({
          ...post,
          user_name: post.user.user_name,
          email: post.user.email,
        }));
        setResults(populatedData);
        console.log(populatedData);
      })
      .catch((error) => console.log(error));
  }, []);

  const imageUrls = results.map((user) => {
    const imageBuffer = user?.product_image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  });
  const profileimageUrls = results.map((user) => {
    const imageBuffer = user?.user?.image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:${user.user.image.ContentType};base64,${base64String}`;
    return imageUrl;
  });

  const handleDelete = (id) => {
    Axios.delete(`/Admin/deletelisting/${id}`)
      .then((response) => {
        toast.success("Deleted Succesfully");
        setResults((prevResults) =>
          prevResults.filter((result) => result._id !== id)
        );

        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Couldnt delete the Lisitng");
        // handle error
        console.log(error);
      });
  };
  return (
    <>
      <HeaderforAdmin />
      <div className="results">
        <h1>Manage User Listings</h1>
        <div className="AdminMarketPlaceInventory">
          {results.map((val, key) => (
            <div key={key} className="AdminMarketcard">
              <h1>{val.product_name}</h1>
              <p>{val.product_description}</p>
              {imageUrls[key] && (
                <img
                  src={imageUrls[key]}
                  alt="Post Image"
                  className="marketplaceimg"
                />
              )}
              <h5>
                {profileimageUrls[key] && (
                  <img
                    src={profileimageUrls[key]}
                    alt="Post Image"
                    className="Dashboardprofilephoto"
                  />
                )}{" "}
                &nbsp;&nbsp;{val.user_name} <br /> &nbsp;&nbsp;{val.email}
              </h5>
              <button
                className="btn btn-block btn-danger"
                onClick={() => {
                  handleDelete(val._id);
                }}
              >
                {" "}
                Delete the Post
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AllListingsforAdmin;
