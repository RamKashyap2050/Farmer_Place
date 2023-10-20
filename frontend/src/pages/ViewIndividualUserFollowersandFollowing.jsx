import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Footer from "../components/Footer";
import HeaderforUser from "../components/HeaderforUser";

const ViewIndividualUserFollowersandFollowing = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const backendURL = `/Users/getuser/${id}`;

    axios
      .get(backendURL)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/Follow/getfollowersforuser/${id}`)
      .then((response) => {
        const fetchedFollowers = response.data.followers;
        setFollowers(fetchedFollowers);
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`/Follow/getfollowingforuser/${id}`)
      .then((response) => {
        const fetchedFollowing = response.data.followers;
        setFollowing(fetchedFollowing);
      })
      .catch((error) => {
        console.error("Error fetching following:", error);
      });
  }, [id]);

  return (
    <div>
      <HeaderforUser />
      <Table striped bordered responsive="sm" style={{marginBottom:"10rem", marginTop:"4rem"}}>
        <thead>
          <tr>
            <th>Following</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {following.map((follower) => (
                <div
                  key={follower._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                >
                  <img
                    src={follower.following_to_ID.image}
                    className="Dashboardprofilephoto"
                  />
                  <p>{follower.following_to_ID.user_name}</p>
                </div>
              ))}
            </td>
            <td>
              {followers.map((follower) => (
                <div
                  key={follower._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                >
                  <img
                    src={follower.followed_by_ID.image}
                    className="Dashboardprofilephoto"
                  />
                  <p>{follower.followed_by_ID.user_name}</p>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};

export default ViewIndividualUserFollowersandFollowing;
