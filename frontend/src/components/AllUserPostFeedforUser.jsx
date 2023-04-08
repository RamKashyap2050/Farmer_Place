import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import '../styles/Alluserposts.css'
import { Buffer } from 'buffer';
const AllUserPostFeedforUser = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/Feed/getallposts")
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
  // const renderPosts = () => {
  //   return results.map((val, key) => (
  //     <div key={key}>
  //       <h1>{val.title}</h1>
  //       <h5>{val.content}</h5>
  //       <p>{val.user_name}</p>
  //     </div>
  //   ));
  // };
  const imageUrls = results.map(user => {
    const imageBuffer = user?.post_image?.data;
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
      {results.map((val,key) => (
       <>
        <div key={key} className='Feedpage'>
            <h1>{val.title}</h1>
            <p>{val.content}</p>
            {imageUrls[key] && <img src={imageUrls[key]} alt='Post Image' className='feedimage'/>} 
           
<h4>{profileimageUrls[key] && <img src={profileimageUrls[key]} alt='Post Image' className='Dashboardprofilephoto'/>}  &nbsp;&nbsp;{val.user_name}</h4>
        </div><br/><br/>
       </>
      ))}
    </>
  );
};

export default AllUserPostFeedforUser;
