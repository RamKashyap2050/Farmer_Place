import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { FaPowerOff,FaUserEdit, FaRegTimesCircle, FaList, FaShoppingBag } from "react-icons/fa";
import Footer from '../components/Footer';
import HeaderforUser from '../components/HeaderforUser';
import Free from '../Free_Sample_By_Wix.jpg'
import { decode } from 'jpeg-js';
import { validateImage } from "image-validator";
import { Buffer } from 'buffer'
import '../styles/ProfilePageUser.css'
function ProfilePageUser() {
  const [show, setshow] = useState(false)
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth) 


  useEffect(() => {
    console.log('useEffect triggered with user:', user)
    if (!user){
      navigate('/loginuser')
    }
  },[user,navigate])
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/loginuser')
  }
  const onDelete = () => {
    
    Axios.delete(`http://localhost:3002/Users/delete/${user?._id}`)
    navigate('/signupuser')
    dispatch(logout())
  }

  const imageBuffer = user?.image;
  const base64String = Buffer.from(imageBuffer).toString('base64');
  const imageUrl = `data:image/jpeg;base64,${base64String}`;
  
  return (
 <>
 <HeaderforUser />
    <div className='page'>
    {/* {decoded && ( <img className='profilephoto' src={`data:image/jpeg;base64,${btoa(decoded.data)}`} alt='hello' /> )}       */}
    {imageUrl && <img className='profilephoto' src={imageUrl} alt='User profile' />}

          <div className='card'>
      <h1 className='mb-4 p-3'>Profile</h1><br /><br />
      <span className='line'></span><br /><br />
      <h2>Welcome {user?.user_name}</h2>
      <h5>Email: {user?.email}</h5>
      <h5>Phone: {user?.phone}</h5><br /><br /><br />
      <div className="buttongrid">
      <button onClick={onLogout} className='btn1 btn-secondary btn-block mb-2'>Edit your Profile&nbsp;&nbsp;<FaUserEdit /></button>
      <button onClick={onLogout} className='btn1 btn-secondary btn-block mb-2'>Manage your Content&nbsp;&nbsp;<FaList /></button>
      <button onClick={onLogout} className='btn1 btn-secondary btn-block mb-2'>Manage your Listings&nbsp;&nbsp;<FaShoppingBag /></button>
      <button onClick={() => onDelete(user?._id)} className='btn1 btn-secondary btn-block mb-3'>Delete your Account&nbsp;<FaRegTimesCircle /></button>
      <button onClick={onLogout} className='btn1 btn-danger btn-block mb-2'>Logout&nbsp;&nbsp;<FaPowerOff /></button>
      </div>
      </div>
    </div>

    <Footer />
 </>
  )
}

export default ProfilePageUser
