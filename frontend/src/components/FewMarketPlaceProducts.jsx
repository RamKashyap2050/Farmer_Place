import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../styles/FewMarket.css";
import { Buffer } from "buffer";
const FewMarketPlaceProducts = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    Axios.get("/MarketPlace/getallproducts")
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


  return (
    <div className="FewMarketPlaceInventory">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Market Place
      </h1>
      <span class="line"></span>
      <br />
      <br />
      <div>
        {results.slice(0, 5).map((val, key) =>
          val.user.AccountStatus == true ? (
            <div key={key} className="FewMarketcard">
              <h1>{val.product_name}</h1>
              <p>{val.product_description}</p>
              <h4 style={{ fontWeight: "bold", fontStyle: "italic" }}>
                {val.product_price}$
              </h4>
                <img
                  src={val.product_image}
                  alt="Post Image"
                  className="marketplaceimg"
                />
              <h5>
                  <img
                    src={val.user.image}
                    alt="Post Image"
                    className="Dashboardprofilephoto"
                  />
                {" "}
                &nbsp;&nbsp;{val.user_name} <br />
                <br /> &nbsp;&nbsp;{val.email}
              </h5>
            </div>
          ) : null
        )}
        <br />
        <br />
        <Link to="/marketplace">
          {" "}
          <button type="submit" className="btn btn-block no-underline">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FewMarketPlaceProducts;
