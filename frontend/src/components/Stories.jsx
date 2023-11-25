import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/Stories.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
const Stories = () => {
  const { user } = useSelector((state) => state.auth);

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

  const userIndex = users.findIndex(val => val._id === user._id);

// Move the item to the beginning of the array
if (userIndex !== -1) {
  const userItem = users.splice(userIndex, 1)[0];
  users.unshift(userItem);
}

  return (
    <div>
      <div id="wrapper">
        {users.map((val, key) => (
          <div key={key} id="item">
            <Link
              key={val._id}
              to={`../profile/${val._id}`}
              id="homepageredirect"
              style={{ position: "relative", display: "inline-block" }}
            >
              { user._id === val._id ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={val.image}
                    alt="User Profile"
                    className="card-img-top fewpeopleprofilephoto"
                  />
                  <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <span
                      style={{
                        background: "white",
                        borderRadius: "50%",
                        padding: "0.2em",
                        margin: "0.2em",
                      }}
                    >
                      <FaPlus />
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={val.image}
                  alt="User Profile"
                  className="card-img-top fewpeopleprofilephoto"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
