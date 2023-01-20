import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import ShowOrder from "../ShowOrder";
import { Routes, Route, useNavigate } from 'react-router-dom';


function Page_Winkelmand() {
    const [totalPrice, setTotalPrice] = useState("1");
    const [amount, setAmount] = useState("1");
    const [selectedSeats, setSeat] = useState([1, 2, 3]);
    const removeSeat = (seatNumber) => {
        setSeat(selectedSeats.filter(item => item !== seatNumber));
    }

    const navigate = useNavigate()
    const payButtonClicked = async () => {
        const totalPrice = 100;
        setTotalPrice(totalPrice);
        const data = new URLSearchParams();
        data.append('amount', { totalPrice })
        data.append('succes', true)
        fetch('https://localhost:7293/api/payment/createpayment',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ amount: amount, succes: false })
            })
            .then((res) => {
                navigate("/betaling");
            });
    }


    return (
        <>
            <Header />
            <div className="flex-container-horizontal">
                <div className="flex-container-vertical">
                    <ShowOrder seats={selectedSeats} toggleSeat={removeSeat} canEdit={true} />
                    <ShowOrder seats={selectedSeats} toggleSeat={removeSeat} canEdit={true} />
                </div>
                <div className="flex-container-vertical">
                    <p>{totalPrice}</p>
                    <button id="button" target="_blank" onClick={payButtonClicked}>Naar betalen</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Page_Winkelmand