import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderforUser from '../components/HeaderforUser';
import Footer from '../components/Footer';
import { FaUserPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ExistingCommunity = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [existingCommunities, setExistingCommunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend endpoint
        const response = await axios.get(`/Community/getcommunity/${user._id}`);
        setExistingCommunities(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching existing communities:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const onCreateCommunity = () => {
    if (!user) {
      navigate('/');
    } else {
      navigate('/managecommunity/createcommunity');
    }
  };

  return (
    <div>
      <HeaderforUser />
      <div style={{ margin: '2rem auto', textAlign: 'center' }}>
        <h1>Manage Community</h1>
        <button className="round-btn btn btn-primary" onClick={onCreateCommunity}>
          Create a new Page <FaUserPlus />
        </button>
        &nbsp;&nbsp;
        <button className="round-btn btn btn-secondary">
          Show your Existing Page/Pages you are a part
        </button>
      </div>
      <div className="row d-flex" style={{ justifyContent: "space-around" }}>
          {existingCommunities.map((person) => (
            <div className="col-md-4" key={person._id}>
              <div className="card cardinpeople">
                <Link to={`/createCommunityContent/${person._id}`}>
                  <img
                    src={person.Community_Image}
                    alt="User Profile"
                    className="card-img-top fewpeopleprofilephoto"
                  />
                </Link>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      margin: "0 auto",
                      padding: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {person.Community_Name}
                  </h5>
                  <button
                    className='btn btn-primary'
                    style={{ width: "100%" }}
                 
                  >
                   Visit Page
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      <Footer />
    </div>
  );
};

export default ExistingCommunity;
