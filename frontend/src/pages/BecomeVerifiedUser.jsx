import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import HeaderforUser from "../components/HeaderforUser";
import Footer from "../components/Footer";
import Config from "../config.json";
import axios from "axios";


const BecomeVerifiedUser = () => {
  const STRIPE_PUBLIC_KEY = Config.STRIPE_PUBLIC_KEY;

  function onToken(token) {
    console.log(token);
  
    const backendEndpoint =  `/Users/becomeverifieduser`;
  
    axios.post(backendEndpoint, token)
      .then(response => {
        console.log('Token sent to the backend successfully');
      })
      .catch(error => {
        console.error('Error sending token to the backend:', error);
      });
  }
  

  return (
    <div>
      <HeaderforUser />
      <StripeCheckout currency="CAD" amount={1000} token={onToken} stripeKey={STRIPE_PUBLIC_KEY} />
      <Footer />
    </div>
  );
};

export default BecomeVerifiedUser;
