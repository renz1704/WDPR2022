

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Page_DonatieBeheer() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTUyMjU1ZC1jYzA4LTQ4ZTItYTFhYy1iMmM4ZTU3ZTZjYWIiLCJqdGkiOiJjMGViMTRlMi1lNzljLTRlYWYtOGRiYS03ZDI1Mzk2ZWQ4YTgiLCJpYXQiOiIwMS8yMC8yMDIzIDEzOjI5OjQ4IiwiVXNlcklkIjoiZWE1MjI1NWQtY2MwOC00OGUyLWExYWMtYjJjOGU1N2U2Y2FiIiwiRW1haWwiOiJoaHN0aGVhdGVybGFha0BnbWFpbC5jb20iLCJleHAiOjE5ODk4NDA1ODgsImlzcyI6IklrRG9uZWVyIiwiYXVkIjoiKiJ9.x-IhXUEksRuSvD1rQzKeKW9dQTpiqtURv5HI77fg1HM")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await axios.get("https://ikdoneer.azurewebsites.net/api/goededoelen/59", {
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
