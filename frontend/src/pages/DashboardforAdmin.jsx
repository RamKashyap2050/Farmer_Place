import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaPowerOff, FaRegTimesCircle, FaList, FaShoppingBag,FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice';
import Footer from '../components/Footer';
import "../styles/DashboardforAdmin.css"
import Free from '../Free_Sample_By_Wix.jpg'
import HeaderforAdmin from '../components/HeaderforAdmin';



const DashboardForAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { Admin } = useSelector((state) => state.auth) 
  
    useEffect(() => {
      console.log('useEffect triggered with user:', Admin)
      if (!Admin){
        navigate('/loginadmin')
      }
    },[Admin,navigate])

    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/loginadmin')
    }
    
    const onBlock = () => {
        if(!Admin){
          navigate('/loginadmin')
        }
        else{
          navigate('/getallUserforAdmin')
        }
    }
    const onListings = () => {
      if(!Admin){
        navigate('/loginadmin')
      }
      else{
        navigate('/getallistingsforadmin')
      }
     
  }
  const onPosts = () => {
    if(!Admin){
      navigate('/loginadmin')
    }
    else{
      navigate('/getallpostsforadmin')
    }
 
  }
  const onFeedback= () => {
    if(!Admin){
      navigate('/loginadmin')
    }
  }
  return (
    <>
        <HeaderforAdmin />
        <div className="page">

        <img className='profilephoto' src={Free} alt="hello" />
      <h2>Welcome Admin <br /><br /> {Admin?.user_name}</h2>

        </div><br /><br />
        <span className='line'></span><br /><br />

    <div className='card'>

      <button onClick={onPosts} className='btn1 btn-secondary btn-block mb-2'>Manage users Content&nbsp;&nbsp;<FaList /></button>
      <button onClick={onListings} className='btn1 btn-secondary btn-block mb-2'>Manage users Listings&nbsp;&nbsp;<FaShoppingBag /></button>
      <button onClick={onFeedback} className='btn1 btn-secondary btn-block mb-3'>Checkout Feedbacks&nbsp;<FaCheck /></button>
      <button onClick={onBlock} className='btn1 btn-secondary btn-block mb-3'>Block User Accounts&nbsp;<FaRegTimesCircle /></button>
      <button onClick={onLogout} className='btn1 btn-danger btn-block mb-2'>Logout&nbsp;&nbsp;<FaPowerOff /></button>
    </div>
    <Footer />
    </>
  )
}

export default DashboardForAdmin
