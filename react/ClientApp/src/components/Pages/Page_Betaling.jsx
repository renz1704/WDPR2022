import React, { useState, useEffect } from "react";
import PopUp from "../PopUp";
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import UserService from "../../services/UserService";
import config from "../../config.json";


function Page_Betaling() {

  const [totalPrice, setTotalPrice] = useState();
  const [html, setHtml] = useState('');
  const navigate = useNavigate();

  const cancelRoute = () => {
    navigate('/winkelmand');
  }

  useEffect(() => {
    const payButtonClickedCheck = async () => {


      const data = new URLSearchParams();
      data.append('amount', "10")
      data.append('reference', "1");
      data.append('url', config.ApiUrl+'/api/payment/paymentsucces');


      const response = await fetch('https://fakepay.azurewebsites.net/', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const html = await response.text();
      setHtml(html);
      
    }

    payButtonClickedCheck().catch(console.error)
  }, []);

  const paymentAccepted = () => {
    navigate('/betaald')
  }

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = config.ApiUrl+'/api/Reservation/getreservations/' + UserService.getUser().id;
        const response = await fetch(url);
        const data = await response.json();
        setReservations(data);
        console.log(data)
        
        let price = 0;
        data.map(reservation => {
          reservation.tickets.map(ticket => {
            price += ticket.price;
          });
        });
        
        console.log(price)
        setTotalPrice((price).toFixed(2));

      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    }
    fetchData();
  }, [UserService.getUser().id]);

  const makePayment = async () => {
    const payment = {
      Amount: totalPrice,
      Date: new Date(),
      Succes: true,
    };
    
    try {
      const response = await fetch(config.ApiUrl+'/api/Payment/createpayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payment)
      });
      const data = await response.json();
      console.log(data);

      for(const reservation of reservations){
        console.log(reservation)
        await addPaymentToReservation(reservation.id, data.id);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const addPaymentToReservation = async (reservationId, paymentId) => {
    try {
      const url = config.ApiUrl+"/api/Reservation/addpaymenttoreservation/" + reservationId + "/" + paymentId
      const response = await fetch(url, {
        method: 'POST'
      });
      const data = await response;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <p>
        <button id="button" onClick={cancelRoute}>Terug naar winkelmand</button>
      </p>
      {"Totaal: " + totalPrice}
      <p>
        <button onClick={makePayment}>Betaal zonder api van school</button>
      </p>
    </>
  )
}

export default Page_Betaling;