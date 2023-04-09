import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import '../styles/Alluserposts.css'
import { Buffer } from 'buffer';
import '../styles/AllpostforAdmin.css'
import HeaderforAdmin from '../components/HeaderforAdmin';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';

const AllPostsforAdmin = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/Admin/getallPosts")
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

  const handleDelete = (id) =>{
    Axios.delete(`http://localhost:3002/Admin/deletefeed/${id}`)
    .then(response => {
      
        toast.success('Deleted Succesfully')
        setResults(prevResults => prevResults.filter(result => result._id !== id));

        console.log(response.data);
    })
    .catch(error => {
        toast.error('Couldnt delete the post')
      console.log(error);
    });
}
  return (
    <>
    <HeaderforAdmin />
    <h1 style={{textAlign:"center"}}>Manage User Content</h1>
      {results.map((val,key) => (
       <>
        <div key={key} className='Feedpage'>
            <h1 style={{display:"flex", justifyContent:"space-between"}}>
                <span>{val.title}</span>
                <button className='btn btn-danger' onClick={() => handleDelete(val._id)}>Delete</button>
            </h1> 
            <h5 style={{fontStyle:"italic", fontWeight:"bold"}}>{profileimageUrls[key] && <img src={profileimageUrls[key]} alt='Post Image' className='Dashboardprofilephoto'/>}  &nbsp;&nbsp;{val.user_name}</h5>
            <p>{val.content}</p>
            {imageUrls[key] && <img src={imageUrls[key]} alt='Post Image' className='feedimage'/>} 
           
        </div><br/><br/>
       </>
      ))}
      
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AllPostsforAdmin;