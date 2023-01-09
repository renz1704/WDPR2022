import React, {useState} from "react";
import Header from "../Header";
import ShowOrder from "../ShowOrder";
import {Routes, Route, useNavigate} from 'react-router-dom';


function Page_Winkelmand(){
    const [totalPrice, setTotalPrice] = useState("1");
    const [html, setHtml] = useState('');
    const [selectedSeats, setSeat] = useState([1, 2, 3]);
    const removeSeat = (seatNumber) => {
        setSeat(selectedSeats.filter(item => item!== seatNumber));
    }
    
    const navigate = useNavigate()
    const payButtonClicked = async () => {
    const data = new URLSearchParams();
    data.append('amount', {totalPrice});
    data.append('reference', 'Juiste payment id NOG toevoegen');
    data.append('url', 'https://localhost:44419/betaald');

    const response = await fetch('https://fakepay.azurewebsites.net/', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const html = await response.text();
      setHtml();
    }
    
    return(
        <>
            <Header/>
            <div className="flex-container-horizontal">
                <div className="flex-container-vertical">
                    <ShowOrder seats={selectedSeats} toggleSeat={removeSeat} canEdit={true}/>
                    <ShowOrder seats={selectedSeats} toggleSeat={removeSeat} canEdit={true}/>
                </div>
                <div className="flex-container-vertical">
                    <p>{totalPrice}</p>
                    <button onClick={payButtonClicked}>Naar betalen</button>
                    <div dangerouslySetInnerHTML={{__html: html}} />
                </div>
            </div>
        </>
    )    
}

export default Page_Winkelmand