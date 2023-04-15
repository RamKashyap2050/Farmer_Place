import React, {useState, useEffect} from 'react'

const Comments = ({postId}) => {
    const [comments, setComments] = useState([]);
    const filteredComments = comments.filter((val) => val.post_id === postId);

    useEffect(() => {
      fetch('http://localhost:3002/Users/fetchcomment')
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.log(error));
    }, []);
  return (
    <>
    {filteredComments.map((val, key) => (
      <div key={key}>
        <h1>{val.comment}</h1>
        <p>{val.comment_by}</p>
      </div>
    ))}
  </>
  )
}

export default Comments
