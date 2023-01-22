import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import ShowOrder from "../ShowOrder";
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserService from "../../services/UserService";


function Page_Winkelmand() {
    const [amount, setAmount] = useState("1");

    const navigate = useNavigate()
    const payButtonClicked = async () => {
        const totalPrice = 100;
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


    ///
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const url = 'https://localhost:7293/api/Reservation/getreservations/' + UserService.getUser().id;
                const response = await fetch(url);
                const data = await response.json();
                setReservations(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        }
        fetchData();
    }, [UserService.getUser().id]);
    ///

    const deleteReservation = async (reservationId) => {
        try {
            const url = "https://localhost:7293/api/Reservation/removereservation/" + reservationId;
            await fetch(url, {
                method: 'DELETE',
            });
            const updatedReservations = reservations.filter(reservation => reservation.id !== reservationId);
            setReservations(updatedReservations);
        } catch (error) {
            console.error(error);
        }
    };

    const totalPrice = reservations.reduce((acc, reservation) => {
        return acc + reservation.tickets.reduce((acc, ticket) => {
            return acc + ticket.price;
        }, 0);
    }, 0);

    return (
        <>
            <Header />
            <div className="flex-container-horizontal">
                <div>
                    {reservations && reservations.map((reservation) => (
                        <tbody style={{border:"solid 1px red", margin:"5%" }} key={reservation.id}>
                        <tr>Performance: {reservation.tickets[0].performance.show.name}</tr>
                        <tr>Date: {reservation.tickets[0].performance.startTime}</tr>
                        <tr>
                            {reservation.tickets.map((ticket) => (
                                <td key={ticket.id}>
                                    <p>Ticket ID: {ticket.id}</p>
                                </td>
                            ))}
                            <button onClick={()=>deleteReservation(reservation.id)}>Verwijder</button>
                        </tr>
                        <tr>
                            Totaal: €{reservation.tickets.reduce((total, ticket) => total + ticket.price, 0)}
                        </tr>
                        <br></br>
                        </tbody>

                    ))}
                </div>

                <div className="flex-container-vertical">
                    <p>Totaalprijs alle shows: €{totalPrice}</p>
                    <button id="button" target="_blank" onClick={payButtonClicked}>Naar betalen</button>
                </div>
                
            </div>
            
            <Footer/>
        </>
    )
}

export default Page_Winkelmand