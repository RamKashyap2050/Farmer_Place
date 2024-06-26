import React, { useState, useEffect } from "react";
import HeaderforUser from "../components/HeaderforUser";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { FaArchive, FaTrashAlt, FaUndo } from "react-icons/fa";

const ManagePostsforUser = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);

  useEffect(() => {
    Axios.get("/Feed", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const populatedData = response.data.map((post) => ({
          ...post,
          user_name: post.user.user_name,
        }));
        setResults(populatedData);
        console.log(populatedData);
      })
      .catch((error) => console.log(error));
  }, []);

  const imageUrls = results.map((user) => {
    const imageBuffer = user?.post_image?.data;
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
    Axios.delete(`/Feed/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.success("Deleted Succesfully");
        setResults((prevResults) =>
          prevResults.filter((result) => result._id !== id)
        );

        console.log(response.data);
      })
      .catch((error) => {
        toast.error("Couldnt delete the post");
        console.log(error);
      });
  };
  return (
    <div>
      <HeaderforUser />
      <h1 style={{ textAlign: "center" }}>{user?.user_name} Content</h1>
      {results.map((val, key) => (
        <>
          <div key={key} className="Feedpage">
            <h1 style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{val.title}</span>
              <div style={{ display: "flex" }}>
                {val.archieved ? (
                  <button
                    className="btn btn-primary"
                    style={{ margin: "2px" }}
                    onClick={() => handleDelete(val._id)}
                  >
                    Archive <FaArchive />
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    style={{ margin: "2px" }}
                    onClick={() => handleDelete(val._id)}
                  >
                    Unarchive <FaUndo />
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(val._id)}
                >
                  Delete <FaTrashAlt />
                </button>
              </div>
            </h1>
            <h5 style={{ fontStyle: "italic", fontWeight: "bold" }}>
              <img
                src={val.user.image}
                alt="Post Image"
                className="Dashboardprofilephoto"
              />{" "}
              &nbsp;&nbsp;{val.user_name}
            </h5>
            <p>{val.content}</p>

            <img src={val.post_image} alt="Post Image" className="feedimage" />
          </div>
          <br />
          <br />
        </>
      ))}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ManagePostsforUser;
