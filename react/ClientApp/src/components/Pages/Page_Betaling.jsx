import React, {useState, useEffect} from "react";
import PopUp from "../PopUp";
import {Routes, Route, useNavigate} from 'react-router-dom';


function Page_Betaling(){

    const [totalPrice, setTotalPrice] = useState('');
    const [html, setHtml] = useState('');
    const navigate = useNavigate();

    const cancelRoute = () =>{  
        navigate('/winkelmand');
      }

    useEffect(  () => {
      const payButtonClickedCheck = async () => {

        
        const data = new URLSearchParams();

        // setTotalPrice(1);
        data.append('amount', totalPrice);
        data.append('reference', 1);
        data.append('url', 'https://localhost:7293/api/payment/paymentsucces');
    
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

    return(
        <>
        <div dangerouslySetInnerHTML={{__html: html}} />
            <p>
                <button onClick= {cancelRoute}>Terug naar winkelmand</button>
                {/* <button onClick={() => setShowPopUp(true)}>betaling mislukt</button> */}
            </p>
        </>
    )
}

export default Page_Betaling;