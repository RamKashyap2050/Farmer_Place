import React from "react";
import "../styles/OAuth.css"; // Import CSS for styling
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  // Dummy function to handle onClick event
  const handleAuthentication = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      provider.setCustomParameters({
        prompt: "select_account", // This forces account selection on each login
      });
      await signOut(auth); // Sign out to clear the existing authentication session
      const result = await signInWithPopup(auth, provider);
      console.log("Firebase Auth Result:", result);

      console.log(result);
      const res = await fetch(`/Users/googlelogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log("This is Data resonse of OAuth", data)
      console.log("User Name", data.user_name)
      console.log("Email", data.email)
      localStorage.removeItem("Admin");
      localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="oauth-container">
      <button
        onClick={handleAuthentication}
        className="btn btn-block btn-primary"
      >
        <img
          src="http://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg"
          alt="Google logo"
          className="google-logo"
        />
        Continue with Google
      </button>{" "}
    </div>
  );
};

export default OAuth;
