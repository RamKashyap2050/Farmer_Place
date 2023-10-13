import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/AllUsersAdmin.css";
import HeaderforAdmin from "../components/HeaderforAdmin";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const AllUsersAdmin = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { Admin } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered with user:", Admin);
    if (!Admin) {
      navigate("/loginadmin");
    }
  }, [Admin, navigate]);
  //This will fetch all users for Admin for Blocking and Unblocking Purposes
  useEffect(() => {
    Axios.get("http://localhost:3002/Admin/getallUsers").then((response) => {
      setResults(response.data);
      console.log(response.data);
    });
  }, []);
  //This will do Blocking and Unblocking
  const blockUser = (key) => {
    Axios.put(`http://localhost:3002/Admin/updatetofalse/${key}`);
    toast.success("Blocked succesfully");
  };
  const unblockUser = (key) => {
    Axios.put(`http://localhost:3002/Admin/updatetotrue/${key}`);
    toast.success("Unblocked succesfully");
  };

  return (
    <>
      <HeaderforAdmin />
      <div className="results">
        <h1 className="brand">List of Users</h1>
        Total Users {results.length} :-
        <div>
          <table>
            <thead>
              <tr>
                <th>Profile Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Unblock</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody>
              {results.map((val, key) => (
                <tr key={key}>
                  <td>
                    <img
                      className="Dashboardprofilephoto"
                      src={val.image}
                      alt="User profile"
                    />
                  </td>
                  <td>{val.user_name}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        unblockUser(val._id);
                      }}
                    >
                      Unblock
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => {
                        blockUser(val._id);
                      }}
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllUsersAdmin;
