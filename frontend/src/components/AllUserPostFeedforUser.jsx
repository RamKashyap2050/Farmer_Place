import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import "../styles/Alluserposts.css";
import { Buffer } from "buffer";
import { FaSearch, FaExclamationTriangle, FaComment, FaTelegram, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ToastContainer, toast} from "react-toastify";
import Comments from "./comments";

const AllUserPostFeedforUser = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredImageUrls, setFilteredImageUrls] = useState([]);
  const [filteredProfileImageUrls, setFilteredProfileImageUrls] = useState([]);
  const [show, setShow] = useState(false);
  const [comment,setComment] = useState("")

  const handleClick = () => {
    setShow(true);
  };


  const {user} = useSelector((state) => state.auth) 
  const {token} = useSelector((state) => state.auth.user) 

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


  const handleReport = (post) => {
    Axios.post("http://localhost:3002/Users/report", {
      title: post.title,
      user_name: post.user.user_name,
      reported_by: user.user_name,
    })
    toast.success('Thanks for letting us know')
  }
  const handleComment = (post) => {
    Axios.post("http://localhost:3002/Users/makeacomment", {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      title: post.title,
      postby_user_name: post.user.user_name,
      comment: comment,
      comment_by: user.user_name
    })
    .then(response => {
      console.log(response.data);
      toast.success('Commented Succesfully')
      comment = ''
    })
    .catch(error => {
      console.error(error); 
      // toast.error('Failed to comment')
    });
    setShow(false)
  }

  const handleLikes = (post) => {
    Axios.post(`http://localhost:3002/Feed/${post._id}/likes`, {
      postId: post._id,
      liked_by_id: user._id,
    })
      .then((response) => {
        console.log(response);
        toast.success('Liked successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message || 'Failed to like');
      });
  };

  const handledisLikes = (post) => {
    Axios.post(`http://localhost:3002/Feed/${post._id}/dislikes`, {
      postId: post._id,
      liked_by_id: user._id,
    })
      .then((response) => {
        console.log(response);
        toast.success('Disliked successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message || 'Failed to Dislike');
      });
  };

 

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


      {filteredResults.slice().reverse().map((val, key) =>
      val.FeedStatus == true ? (
          <div key={key} className="Feedpage">
            <h1 style={{display:"flex", justifyContent:"space-between"}}>
              {val.title}
              {val.user.user_name !== user.user_name && (<button className="btn btn-warning" onClick={() => handleReport(val)}>Report <FaExclamationTriangle /></button>)}            
            </h1>

            <h5 style={{ fontStyle: "italic", fontWeight: "bold" }}>
              {filteredProfileImageUrls.slice().reverse()[key] && (
                <img
                  src={filteredProfileImageUrls.slice().reverse()[key]}
                  alt="Post Image"
                  className="Dashboardprofilephoto"
                />
              )}
              &nbsp;&nbsp;{val.user_name}
            </h5>
            {filteredImageUrls.slice().reverse()[key] && (
              <img
                src={filteredImageUrls.slice().reverse()[key]}
                alt="Post Image"
                className="feedimage"
              />
              
            )}<br/><br/>
            <p>{val.content}</p>
             <div className="likesdisplay " style={{display:"flex", justifyContent:'flex-start'}}>
             {val.liked_by.length > 0 && (
  <span className="text-secondary">
    <FaThumbsUp />
    {val.liked_by.slice(0, 1).map((likedByUser, index) => (
      <span key={index}>
        {' '}
        <span style={{fontWeight:"bolder"}}>{likedByUser.user_name}</span>
      </span>
    ))}
    {val.liked_by.length > 1 && (
      <span> and {val.liked_by.length - 1} more...</span>
    )}
  </span>
)} &nbsp;&nbsp;&nbsp;
{val.disliked_by.length > 0 && (
  <span className="text-secondary">
<FaThumbsDown />
    {val.disliked_by.slice(0, 1).map((dislikedByUser, index) => (
      <span key={index}>
        {' '}
        <span style={{fontWeight:"bolder"}}>{dislikedByUser.user_name}</span>
      </span>
    ))}
    {val.disliked_by.length > 1 && (
      <span> and {val.disliked_by.length - 1} more...</span>
    )}
  </span>
)}


            </div>   
 <br /><br />            
            <div style={{display:"flex"}}>
            <button className="btn btn-block btn-primary" style={{margin:"5px 0px 0px"}}onClick={() => handleLikes(val)}><FaThumbsUp /></button>&nbsp;
            <button className="btn btn-block" style={{backgroundColor:" #CD5C5C", color:"white"}}onClick={() => handledisLikes(val)}><FaThumbsDown/></button>&nbsp;
            <button className="btn btn-block btn-secondary" onClick={handleClick}><FaComment /></button>
            </div><br />
            {show && (
            <div style={{display:"flex"}}>
              <Comments postId={val.title} />
              <input type="text" placeholder="Write your comment here..." className="form-control form-control-lg" onChange={(e) =>setComment(e.target.value)}/>
              <button onClick={() => handleComment(val)} className="btn btn-secondary"><FaTelegram /></button>
            </div>
            )}
          </div>
        ) : null
      )}
      <ToastContainer />
      
    </>
  );
};

export default AllUserPostFeedforUser;
