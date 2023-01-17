// import React from 'react';
// import { useState, useEffect } from "react";
// import "../../styles/generalStyle.css";
// import axios from 'axios';




// function Page_DonatieBeheer() {
//   const [apiData, setApiData] = useState([]);
//   const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYzFiYjM2Yy04ZGFlLTQzMDYtYTY4NC1jNjA0ZDFjODc3MGUiLCJqdGkiOiIxMGExZjI0Ny1jOTkwLTRjYjAtOWIxMi02NWEwZWI2ZTQxM2MiLCJpYXQiOiIwMS8xNi8yMDIzIDEwOjMzOjA0IiwiVXNlcklkIjoiYmMxYmIzNmMtOGRhZS00MzA2LWE2ODQtYzYwNGQxYzg3NzBlIiwiRW1haWwiOiIyMDExMDU2MUBzdHVkZW50Lmhocy5ubCIsImV4cCI6MTk4OTQ4NDM4NCwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.v8ZHscSAsAyX-cK6GL5WfdeEtRvxdCm0o4ufjKOS8xU");

//   const getAllCharity = () => {
//     console.log("Test vanuit getAllCharity")
//     console.log(token)
//     axios
//       .get("https://ikdoneer.azurewebsites.net/api/goededoelen/1", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         setApiData(response.data);
//         console.log(apiData);
//       })
//       .catch(error => {
//         console.log(error);
//       });

//   }

//   return (
//     <>
//       <h4>DonatieBeheer</h4>
//       <p>Ons goede doel: </p>
//       <hr></hr>
//       <div>
//         {apiData.length > 0 ? (
//           <div key={apiData.id}>
//             <p>ID: {apiData.id}</p>
//             <p>Naam: {apiData.name}</p>
//             <p>URL: {apiData.url}</p>
//             <p>Donatie-luisteraar: {apiData.donationListener}</p>
//             <p>Categorie: {apiData.category}</p>
//             <p>Beschrijving: {apiData.description}</p>
//           </div>
//         ) : (
//           <div>Er is geen data beschikbaar</div>
//         )}
//       </div>
//       <button onClick={getAllCharity}>Bekijk ons goede doel.</button>
//     </>
//   );

// }
// export default Page_DonatieBeheer

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/generalStyle.css";

function Page_DonatieBeheer() {
  const navigate = useNavigate();
  const [goedeDoel, setGoedeDoel] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYzFiYjM2Yy04ZGFlLTQzMDYtYTY4NC1jNjA0ZDFjODc3MGUiLCJqdGkiOiIxMGExZjI0Ny1jOTkwLTRjYjAtOWIxMi02NWEwZWI2ZTQxM2MiLCJpYXQiOiIwMS8xNi8yMDIzIDEwOjMzOjA0IiwiVXNlcklkIjoiYmMxYmIzNmMtOGRhZS00MzA2LWE2ODQtYzYwNGQxYzg3NzBlIiwiRW1haWwiOiIyMDExMDU2MUBzdHVkZW50Lmhocy5ubCIsImV4cCI6MTk4OTQ4NDM4NCwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.v8ZHscSAsAyX-cK6GL5WfdeEtRvxdCm0o4ufjKOS8xU")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await axios.get("https://ikdoneer.azurewebsites.net/api/goededoelen/1", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => console.log(res.data).then(res => setGoedeDoel(res.data)));
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);



  return (
    <>
      <h4>DonatieBeheer</h4>
      <p>Ons goede doel: </p>
      <hr></hr>
      <p>ID: {goedeDoel.id}</p>
      <p>Naam: {goedeDoel.name}</p>
      <p>URL: {goedeDoel.url}</p>
      <p>Donatie-luisteraar: {goedeDoel.donationListener}</p>
      <p>Categorie: {goedeDoel.category}</p>
      <p>Beschrijving: {goedeDoel.description}</p>
      <button id="button" onClick={() => { navigate('/admin') }}>Terug naar admin portaal</button>
    </>
  );
}

export default Page_DonatieBeheer;
