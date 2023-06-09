import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/AllMarketPlaceProductsforUser.css";
import { Buffer } from "buffer";
import NoResultsFound from "./NoResultsFound";
import Skeleton from "@mui/material/Skeleton";
import  Box  from "@mui/material/Box";
const AllMarketPlaceProductsforUser = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImageUrls, setFilteredImageUrls] = useState([]);
  const [filteredProfileImageUrls, setFilteredProfileImageUrls] = useState([]);

  useEffect(() => {
    Axios.get(`/MarketPlace/getallproducts/`)
      .then((response) => {
        const populatedData = response.data.map((post) => ({
          ...post,
          user_name: post.user.user_name,
          email: post.user.email,
        }));
        setResults(populatedData);
        setFilteredResults(populatedData);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const filtered = results.filter(
      (post) =>
        (post.user_name &&
          post.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.product_name &&
          post.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredResults(filtered);

    const filteredImageUrls = filtered.map((post) => {
      const imageBuffer = post.product_image?.data;
      if (!imageBuffer) {
        return null;
      }
      const base64String = Buffer.from(imageBuffer).toString("base64");
      const imageUrl = `data:image/jpeg;base64,${base64String}`;
      return imageUrl;
    });
    setFilteredImageUrls(filteredImageUrls);

    const filteredProfileImageUrls = filtered.map((post) => {
      const imageBuffer = post.user?.image?.data;
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
      <div className="MarketPlaceInventory">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredResults.length > 0 ? (
          filteredResults.map((val, key) =>
            val.user.AccountStatus === true ? (
              <div key={key} className="Marketcard">
                <h1>{val.product_name}</h1>
                <p>{val.product_description}</p>
                <h4 style={{ fontWeight: "bolder", fontStyle: "italic" }}>
                  {val.product_price}$
                </h4>
                {filteredImageUrls[key] && (
                  <img
                    src={filteredImageUrls[key]}
                    alt="Post Image"
                    className="marketplaceimg"
                  />
                )}
                <h5>
                  {filteredProfileImageUrls[key] && (
                    <img
                      src={filteredProfileImageUrls[key]}
                      alt="Post Image"
                      className="Dashboardprofilephoto"
                    />
                  )}{" "}
                  &nbsp;&nbsp;{val.user_name} <br />
                  <br /> &nbsp;&nbsp;{val.email}
                </h5>
              </div>
            ) : null
          )
        ) : (
          <Box sx={{ pt: 0.5 }}>
            <div
              className="d-flex"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Skeleton variant="rounded" width="60%" />
              <Skeleton variant="rounded" width={50} height={30} />
            </div>
            <div style={{ display: "flex" }}>
              <Skeleton variant="circular" width={40} height={40} />
              &nbsp;
              <Skeleton width="40%" />
            </div>
            <Skeleton variant="rectangular" width={610} height={418} />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="33%" />
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="33%" />
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="33%" />
            </div>
          </Box>
        )}
      </div>
    </>
  );
};

export default AllMarketPlaceProductsforUser;
