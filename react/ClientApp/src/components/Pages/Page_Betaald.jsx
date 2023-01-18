import React, { useState } from "react";
import Header from "../Header";
import ShowOrder from "../ShowOrder";

function Page_Betaald() {
    const [selectedSeats, setSeat] = useState([1, 2, 3]);
    const removeSeat = (seatNumber) => {
        setSeat(selectedSeats.filter(item => item !== seatNumber));
    }


    return (
        <>
            <Header />
            <div className="flex-container-horizontal">
                <div className="flex-container-vertical">
                    <ShowOrder seats={selectedSeats} toggleSeat={removeSeat} canEdit={false} />
                    <ShowOrder seats={selectedSeats} toggleSeat={removeSeat} canEdit={false} />
                </div>
                <div className="flex-container-vertical">
                    <h1>Bedankt voor uw bestelling.</h1>
                    <p>De tickets worden binnen de komende minuten naar uw email adres gestuurd.<br /> U heeft betaald: </p>
                    <button id="button">Exporteer naar iCal</button>
                </div>
            </div>
        </>
    )
}

export default Page_Betaald;