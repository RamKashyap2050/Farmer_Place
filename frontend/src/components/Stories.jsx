import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import FullScreenModal from "./FullScreenModal"; // Import the FullScreenModal component
import "../styles/Stories.css";

const Stories = () => {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

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



  const handleCloseModal = () => {
    setShowModal(false);
  };

  const AddStory = () => {
    setShowModal(true);
    console.log("Modal Activated")
  };
  console.log(showModal)
  // ... (rest of your existing code)

  return (
    <div>
      <div id="wrapper">
        {/* ... (existing code) */}
        {users.map((val, key) => (
          <div key={key} id="item">
            {user._id === val._id ? (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={val.image}
                  alt="User Profile"
                  className="card-img-top fewpeopleprofilephoto"
                  onClick={AddStory}
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
              <Link
                key={val._id}
                to={`../profile/${val._id}`}
                id="homepageredirect"
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={val.image}
                  alt="User Profile"
                  className="card-img-top fewpeopleprofilephoto"
                />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Render the FullScreenModal component */}
      {showModal && <FullScreenModal show={showModal} onHide={handleCloseModal} />}
    </div>
  );
};

export default Stories;
