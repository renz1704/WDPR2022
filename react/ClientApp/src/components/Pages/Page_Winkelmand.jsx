import React, {useState} from "react";
import Header from "../Header";
import ShowOrder from "../ShowOrder";
import {Routes, Route, useNavigate} from 'react-router-dom';


function Page_Winkelmand(){
    const [selectedSeats, setSeat] = useState([1, 2, 3]);
    const removeSeat = (seatNumber) => {
        setSeat(selectedSeats.filter(item => item!== seatNumber));
    }
    
    const navigate = useNavigate()
    const payButtonClicked = () => {
        navigate("/betaling")
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
                    <p>Totaalprijs: 11000120</p>
                    <button onClick={payButtonClicked}>Naar betalen</button>
                </div>
            </div>
        </>
    )    
}

export default Page_Winkelmand