import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Overlay, Popover } from "react-bootstrap";
import { logout, reset } from "../features/auth/authSlice";
import StripeCheckout from "react-stripe-checkout";
import Config from "../config.json";
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

import Footer from "../components/Footer";
import HeaderforUser from "../components/HeaderforUser";
import "../styles/ProfilePageUser.css";
import { MdVerified } from "react-icons/md";
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
  const onManageCommunity = () => {
    if(!user){
      navigate("/loginuser")
    }
    else{
      navigate("/managecommunity/createcommunity")
    }
  }
  const onClosefriends = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/editclosefriends");
    }
  };
  const onSavedPosts = () => {
    if (!user) {
      navigate("/loginuser");
    } else {
      navigate("/savedposts");
    }
  };

  const STRIPE_PUBLIC_KEY = Config.STRIPE_PUBLIC_KEY;

  function onToken(token) {
    console.log(token);

    const backendEndpoint = `/Users/becomeverifieduser/${user._id}`;

    Axios.put(backendEndpoint, token)
      .then((response) => {
        console.log("Token sent to the backend successfully");

        localStorage.setItem("IsSubscriber", "true"); 
      })
      .catch((error) => {
        console.error("Error sending token to the backend:", error);
      });
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

            <h2>
              {user?.user_name}{" "}
              {user?.IsSubscriber ? <MdVerified /> : <span></span>}
            </h2>
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
                onClick={onClosefriends}
                className="btn1 btn-secondary btn-block mb-2"
              >
                Edit Close Friends &nbsp;&nbsp;
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
                onClick={onManageCommunity}
                className="btn1 btn-secondary btn-block mb-2"
              >
                Manage Page&nbsp;&nbsp;
                <FaUserFriends />
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
              </Button>{" "}
              {user?.IsSubscriber ? (
                <></>
              ) : (
                <StripeCheckout
                  currency="CAD"
                  amount={1000}
                  token={onToken}
                  stripeKey={STRIPE_PUBLIC_KEY}
                  className="btn1 btn-primary btn-block mb-2"
                >
                  <Button
                    className="btn1 btn-primary btn-block mb-2"
                    style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                  >
                    Become Verified User &nbsp;&nbsp; <MdVerified />
                  </Button>
                </StripeCheckout>
              )}
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
