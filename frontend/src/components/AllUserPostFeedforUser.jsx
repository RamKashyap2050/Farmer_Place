import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/Alluserposts.css";
import { Buffer } from "buffer";
import { FaSearch, FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer} from "react-toastify";
const AllUserPostFeedforUser = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredImageUrls, setFilteredImageUrls] = useState([]);
  const [filteredProfileImageUrls, setFilteredProfileImageUrls] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/Feed/getallposts")
      .then((response) => {
        const populatedData = response.data.map((post) => ({
          ...post,
          user_name: post.user.user_name,
        }));
        setResults(populatedData);
        setFilteredResults(populatedData);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const filtered = results.filter(
      (post) =>
        (post.user_name && post.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredResults(filtered);
    

    const filteredImageUrls = filtered.map((post) => {
      const imageBuffer = post.post_image?.data;
      if (!imageBuffer) {
        return null;
      }
      const base64String = Buffer.from(imageBuffer).toString("base64");
      const imageUrl = `data:image/jpeg;base64,${base64String}`;
      return imageUrl;
    });
    setFilteredImageUrls(filteredImageUrls);

    const filteredProfileImageUrls = filtered.map((post) => {
      const imageBuffer = post.user.image?.data;
      if (!imageBuffer) {
        return null;
      }
      const base64String = Buffer.from(imageBuffer).toString("base64");
      const imageUrl = `data:${post.user.image.ContentType};base64,${base64String}`;
      return imageUrl;
    });
    setFilteredProfileImageUrls(filteredProfileImageUrls);
  }, [searchTerm, results]);



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


      {filteredResults.map((val, key) =>
        val.user.AccountStatus == true ? (
          <div key={key} className="Feedpage">
            <h1 style={{display:"flex", justifyContent:"space-between"}}>
              {val.title}
              <button className="btn btn-warning" >Report <FaExclamationTriangle/></button>
            </h1>

            <h5 style={{ fontStyle: "italic", fontWeight: "bold" }}>
              {filteredProfileImageUrls[key] && (
                <img
                  src={filteredProfileImageUrls[key]}
                  alt="Post Image"
                  className="Dashboardprofilephoto"
                />
              )}
              &nbsp;&nbsp;{val.user_name}
            </h5>
            <p>{val.content}</p>
            {filteredImageUrls[key] && (
              <img
                src={filteredImageUrls[key]}
                alt="Post Image"
                className="feedimage"
              />
              
            )}<br/><br/>
                  <input type='text' placeholder='Add a Comment Here' className="form-control form-control lg"/>
          </div>
        ) : null
      )}
      <ToastContainer />
    </>
  );
};

export default AllUserPostFeedforUser;
