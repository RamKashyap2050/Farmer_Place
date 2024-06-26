import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import "../styles/MarketPlace.css";
// import SearchBar from '../components/Searchbar';
import { ToastContainer, toast } from "react-toastify";
import AllMarketPlaceProductsforUser from "../components/AllMarketPlaceProductsforUser ";

const MarketPlace = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_image: "",
    product_price: "",
  });
  const { product_name, product_description, product_image, product_price } =
    formData;

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
        product_image: file,
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
    userData.append("product_name", product_name);
    userData.append("product_description", product_description);
    userData.append("product_price", product_price);
    userData.append("product_image", product_image);
    console.log(userData);

    try {
      const response = await fetch("/MarketPlace", {
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
        product_name: "",
        product_description: "",
        product_image: "",
        product_price,
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

      <div class="container">
        <div class="products-container">
          {/* <SearchBar /> */}
          <AllMarketPlaceProductsforUser />
        </div>
        <br />
        <br />

        <div class="form-container">
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}></h3>

          <form
            onSubmit={onSubmit}
            encType="multipart/form-data"
            className="marketplaceform"
          >
            <div class="form-group">
              <label for="title" class="text-white">
                Product Name
              </label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                class="form-control form-control-lg"
                required
                value={product_name}
                onChange={onChange}
                placeholder="Wanna Sell Something!!"
              />
            </div>
            <div class="form-group">
              <label for="content" class="text-white">
                Product Price
              </label>
              <input
                type="text"
                id="product_price"
                name="product_price"
                class="form-control form-control-lg"
                required
                value={product_price}
                onChange={onChange}
                placeholder="Enter the Price($)"
              />
            </div>
            <div class="form-group">
              <label for="content" class="text-white">
                Product Description
              </label>
              <textarea
                id="product_description"
                name="product_description"
                class="form-control form-control-lg"
                rows="6"
                required
                value={product_description}
                onChange={onChange}
              ></textarea>
            </div>

            <div class="form-group">
              <label for="image" class="text-white">
                Image:
              </label>
              <input
                type="file"
                id="product_image"
                name="product_image"
                class="form-control-file"
                onChange={onChange}
              />
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default MarketPlace;
