import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import '../styles/Alluserposts.css'
import { Buffer } from 'buffer';
import '../styles/AllpostforAdmin.css'
import HeaderforAdmin from '../components/HeaderforAdmin';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegTimesCircle, FaTrashAlt,FaCheck } from 'react-icons/fa';

const AllPostsforAdmin = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    Axios.get("/Admin/getallPosts")
      .then((response) => {
        const populatedData = response.data.map((post) => ({
          ...post,
          user_name: post.user.user_name,
          email:post.user.email
        }));
        setResults(populatedData);
        console.log(populatedData);
      })
      .catch((error) => console.log(error));
  }, []);


  const handleDelete = (id) =>{
    Axios.delete(`/Admin/deletefeed/${id}`)
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

const handleBlock = (id) =>{
  Axios.put(`/Admin/blockpost/${id}`)
  .then(response => {
    
      toast.success('Blocked Succesfully')

      console.log(response.data);
  })
  .catch(error => {
      toast.error('Couldnt block the post')
    console.log(error);
  });
  
}

const handleUnblock = (id) =>{
  Axios.put(`/Admin/unblockpost/${id}`)
  .then(response => {
    
      toast.success('Unblocked Succesfully')
      console.log(response.data);

  })
  .catch(error => {
      toast.error('Couldnt unblock the post')
    console.log(error);
  });
  
}
  return (
    <>
    <HeaderforAdmin />
    <h1 style={{textAlign:"center"}}>Manage User Content</h1>
      {results.slice().reverse().map((val,key) => (
       <>
        <div key={key} className='Feedpage'>
            <h1 style={{display:"flex", justifyContent:"space-between"}}>
                <span>{val.title}</span>
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                <button className='btn btn-secondary' onClick={() => handleUnblock(val._id)}>Unblock <FaCheck/></button>&nbsp;
                <button className='btn btn-primary' onClick={() => handleBlock(val._id)}>Block <FaRegTimesCircle/></button>&nbsp;
                <button className='btn btn-danger' onClick={() => handleDelete(val._id)}>Delete <FaTrashAlt/></button>
                </div>
            </h1> 
            <h5 style={{fontStyle:"italic", fontWeight:"bold"}}><img src={val.user.image} alt='Post Image' className='Dashboardprofilephoto'/>  &nbsp;&nbsp;{val.user_name}</h5>
            <p>{val.content}</p>
            <img src={val.post_image} alt='Post Image' className='feedimage'/>
           
        </div><br/><br/>
       </>
      ))}
      
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AllPostsforAdmin;