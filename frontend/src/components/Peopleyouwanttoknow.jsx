import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderforUser from "./HeaderforUser";
import Footer from "./Footer";
import { Buffer } from "buffer";
const Peopleyouwanttoknow = () => {
  const [peopleData, setPeopleData] = useState([]);

  useEffect(() => {
    axios
      .get("/Admin/getallusers")
      .then((response) => {
        setPeopleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div>
      <HeaderforUser />
      <div className="ml-4 p-4" style={{ marginLeft: "2rem", padding:"3rem" }}>
        <div className="d-flex">
          {peopleData.map((person) => (
            <div key={person.id} style={{display:'flex', justifyContent:"space-between", marginBottom:"2rem"}}>
              <div style={{display:"flex", justifyContent:"space-evenly" }}>
                <img
                  src={convertImageBufferToBase64(person.image.data)}
                  alt="User Profile"
                  className="Dashboardprofilephoto"
                />
                {person.user_name}
              </div>
              <button className="btn btn-primary ml-auto">Follow</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Peopleyouwanttoknow;
