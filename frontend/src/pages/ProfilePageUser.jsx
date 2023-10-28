import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Overlay, Popover } from "react-bootstrap";
import { logout, reset } from "../features/auth/authSlice";
import {
  FaCamera,
  FaUserEdit,
  FaUserFriends,
  FaList,
  FaShoppingBag,
  FaRegTimesCircle,
  FaPowerOff,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// import {
//   FaPowerOff,
//   FaUserEdit,
//   FaRegTimesCircle,
//   FaList,
//   FaShoppingBag,
//   FaUserFriends,
// } from "react-icons/fa";
import Footer from "../components/Footer";
import HeaderforUser from "../components/HeaderforUser";
import "../styles/ProfilePageUser.css";
function ProfilePageUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);
  const onLogout = () => {
    navigate("/loginuser");
    dispatch(logout());
    dispatch(reset());
  };
  const onManageContent = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/manageuserpost");
    }
  };
  const onManageListing = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/manageuserproduct");
    }
  };
  const onDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      Axios.delete(`/Users/delete/${user?._id}`);
      navigate("/signupuser");
      dispatch(logout());
    }
  };
  const onEdityourprofile = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/edityourprofile");
    }
  };

  const onManageFollowers = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/checkuserfollowers");
    }
  };
  const onManageFollowing = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/checkuserfollowing");
    }
  };
  const onContentRestriction = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/contentrestriction");
    }
  };
  const onSavedPosts = () => {
    if(!user){
      navigate("/loginuser")
    }
    else{
      navigate("/savedposts")
    }
  }
  console.log("user: ", user);

  return (
    <>
      <HeaderforUser />
      <div className="page">
        <Card className="profile-card">
          <Card.Body>
            <div className="profilephoto-container">
              <img
                className="profilephoto"
                src={user?.image}
                alt="User profile"
              />
              <div className="gray-overlay">
                <div className="overlay-text">
                  <FaCamera />
                  <br />
                  Change your profile picture
                </div>
              </div>
            </div>

            <h2>{user?.user_name}</h2>
            <h5>{user?.email}</h5>
            <h5>{user?.phone}</h5>

            <div className="buttongrid">
              <Button
                onClick={onEdityourprofile}
                className="btn1 btn-secondary btn-block mb-2"
              >
                Edit your Profile&nbsp;&nbsp;
                <FaUserEdit />
              </Button>
              <Button
                onClick={onManageFollowers}
                className="btn1 btn-secondary btn-block mb-2"
              >
                View your Followers&nbsp;&nbsp;
                <FaUserFriends />
              </Button>
              <Button
                onClick={onManageFollowing}
                className="btn1 btn-secondary btn-block mb-2"
              >
                View your Following&nbsp;&nbsp;
                <FaUserFriends />
              </Button>
              <Button
                onClick={onManageContent}
                className="btn1 btn-secondary btn-block mb-2"
              >
                Manage your Content&nbsp;&nbsp;
                <FaList />
              </Button>
              <Button
                onClick={onManageListing}
                className="btn1 btn-secondary btn-block mb-2"
              >
                Manage your Listings&nbsp;&nbsp;
                <FaShoppingBag />
              </Button>
              <Button
                onClick={() => onDelete(user?._id)}
                className="btn1 btn-secondary btn-block mb-2"
              >
                Delete your Account&nbsp;&nbsp;
                <FaRegTimesCircle />
              </Button>
              <Button
                onClick={onContentRestriction}
                className="btn1 btn-primary btn-block mb-2"
              >
                Privacy &nbsp;&nbsp;
                <FaLock />
              </Button>
              <Button
                onClick={onSavedPosts}
                className="btn1 btn-primary btn-block mb-2"
              >
                View Saved Posts &nbsp;&nbsp;
                <FaList />
              </Button>
              <Button
                onClick={onLogout}
                className="btn1 btn-danger btn-block mb-2"
              >
                Logout&nbsp;&nbsp;
                <FaPowerOff />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePageUser;
