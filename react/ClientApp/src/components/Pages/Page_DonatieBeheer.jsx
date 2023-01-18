

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Page_DonatieBeheer() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYzFiYjM2Yy04ZGFlLTQzMDYtYTY4NC1jNjA0ZDFjODc3MGUiLCJqdGkiOiIxMGExZjI0Ny1jOTkwLTRjYjAtOWIxMi02NWEwZWI2ZTQxM2MiLCJpYXQiOiIwMS8xNi8yMDIzIDEwOjMzOjA0IiwiVXNlcklkIjoiYmMxYmIzNmMtOGRhZS00MzA2LWE2ODQtYzYwNGQxYzg3NzBlIiwiRW1haWwiOiIyMDExMDU2MUBzdHVkZW50Lmhocy5ubCIsImV4cCI6MTk4OTQ4NDM4NCwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.v8ZHscSAsAyX-cK6GL5WfdeEtRvxdCm0o4ufjKOS8xU")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await axios.get("https://ikdoneer.azurewebsites.net/api/goededoelen/1", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApiData(result.data)
        console.log(result.data)
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

      {Object.entries(apiData).map(([key, value]) => (
        <div key={key}>
          <p>{key}: {value}</p>
        </div>
      ))}

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : apiData.length > 0 ? (
        <div>
          {apiData.map(data => (
            <div key={data.id}>
              <p>ID: {data.id}</p>
              <p>Naam: {data.name}</p>
              <p>URL: {data.url}</p>
              <p>Donatie-luisteraar: {data.donationListener}</p>
              <p>Categorie: {data.category}</p>
              <p>Beschrijving: {data.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Er is geen data beschikbaar</div>
      )}
      <button id="button" onClick={() => { navigate('/admin') }}>Terug naar adminportaal</button>

    </>
  );
}

export default Page_DonatieBeheer;
