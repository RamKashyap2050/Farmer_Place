import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import '../styles/AllMarketPlaceProductsforUser.css'
import { Buffer } from 'buffer';
const AllMarketPlaceProductsforUser = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/MarketPlace/getallproducts")
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

  const imageUrls = results.map(user => {
    const imageBuffer = user?.product_image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString('base64');
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

  return (
    <>
    {/* <h1 style={{textAlign:"center", margin:"auto"}}>Farmer Market Place</h1> */}
    {/* <span class="line"></span><br /><br /> */}
    <div className='MarketPlaceInventory'>
   {results.map((val,key) => (
    val.user.AccountStatus == true ? (   
    <div key={key} className="Marketcard">
    <h1>{val.product_name}</h1>
    <p>{val.product_description}</p>
    {imageUrls[key] && <img src={imageUrls[key]} alt="Post Image" className='marketplaceimg'/>}
    <h5>{profileimageUrls[key] && <img src={profileimageUrls[key]} alt="Post Image" className='Dashboardprofilephoto'/>} &nbsp;&nbsp;{val.user_name} <br /> &nbsp;&nbsp;{val.email}</h5>
  </div>
  ): null
    
  ))}
    </div>
    </>
  );
};

export default AllMarketPlaceProductsforUser;
