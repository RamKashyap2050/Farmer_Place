import React from "react";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const ManageCommunity = () => {
    const navigate = useNavigate();
    const onCreateCommunity = () => {
        navigate("/managecommunity/createcommunity")
    }
  return (
    <div>
      <HeaderforUser />
      <h1>Manage Community</h1>
     <div style={{margin:"auto", textAlign:"center", display:"flex", justifyContent:"space-around"}}>
      <button className="round-btn  btn btn-primary w-50" onClick={onCreateCommunity}>Create a new community <FaUserPlus /></button>&nbsp;&nbsp;
      <button className="round-btn btn btn-secondary w-50">Show your Existing Communities</button>
     </div>
      <Footer />
    </div>
  );
};

export default ManageCommunity;
