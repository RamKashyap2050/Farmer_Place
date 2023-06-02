import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ContactUs from "../components/ContactUs";
import { useSelector } from "react-redux";
function EditYourProfile() {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.user);
  //Add formData using State
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  });

  const { user_name, email, password, phone, image } = formData;

  const onChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const userData = new FormData();
    userData.append("user_name", user_name);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("phone", phone);
    userData.append("image", image);
    console.log(userData);
  
    try {
      const response = await fetch(`http://localhost:3002/Users/updateuser/${user._id}`, {
        method: "PUT",
        body: userData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response:", response);
      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="register">
        <section className="heading">
          <h1>Edit {user?.user_name} profile</h1>
        </section>
        <br />
        <br />
        <span class="line"></span>
        <br />
        <br />

        <section className="form">
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="user_name"
                value={user_name}
                placeholder={`${user?.user_name}`}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder={`${user?.email}`}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="************"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                placeholder={`${user?.phone}`}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                placeholder="Choose a Picture for Profile Photo"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
              <br />
              <a href="/dashboard">Already Upto Date?</a>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default EditYourProfile;
