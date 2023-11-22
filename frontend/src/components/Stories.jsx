import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/Stories.css";
import { Link } from "react-router-dom";
const Stories = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    Axios.get("/Admin/getallusers/")
      .then((response) => {
        const populatedData = response.data;
        setUsers(populatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("Users", users);

  return (
    <div>
      <div id="wrapper">
        {users.map((val, key) => (
          <div key={key} id="item">
            <Link to={`../profile/${val._id}`} id="homepageredirect">
              <img
                src={val.image}
                alt="User Profile"
                className="card-img-top fewpeopleprofilephoto"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
