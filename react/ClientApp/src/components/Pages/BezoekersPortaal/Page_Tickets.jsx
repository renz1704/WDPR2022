import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import { useState, useEffect } from 'react';
import UserService from '../../../services/UserService';
import axios from 'axios';
import Tickets from './Orders';
import Orders from './Orders';
import config from '../../../config.json';

function Page_Tickets() {

    const [orders, setOrders] = useState([]);
    const [klantNummerOntvanger, setKlantNummerOntvanger] = useState();
    const [ticketNummer, setTicketNummer] = useState();

    
    useEffect(() => {
        axios.get(config.ApiUrl+`/api/Order/getReservations?email=${UserService.getUser().email}`)
            .then(res => {
                setOrders(res.data)
                console.log(res.data)
            })
    }, [])

    const ticketOverzetten = () => {

        axios.post(config.ApiUrl+"/api/ticket/transferticket",
          {
            visitorIdOwner: UserService.getUser().id,
            visitorIdReceiver: klantNummerOntvanger,
            ticketId: ticketNummer,

          }).then(res => console.log(res.data));

      }

    return (

        <>
            <BezoekersPortaalHeader></BezoekersPortaalHeader>
            <h3>Ordergeschiedenis</h3>
            <Orders orders={orders}></Orders>
            <hr></hr>
            <h4>Tickets overzetten naar andere klant</h4>
            <p>Wilt u de tickets overzetten naar een andere klant? Dat kan, u kunt onderstaand formulier invullen per ticket.</p>
            <form className="permissionForm" onSubmit={(e) => e.preventDefault()}>
                        <label id="label">Klantnummer van de ontvanger in cijfers: </label>
                        <input
                            required="Klantnummer is verplicht."
                            type="klantnummerOntvanger"
                            onChange={(e) => setKlantNummerOntvanger(e.target.value)}
                        ></input>
                        <label id="label">Ticketnummer in cijfers: </label>
                        <input
                            required="Ticketnummer is verplicht."
                            type="ticketnummer"
                            onChange={(e) => setTicketNummer(e.target.value)}
                        ></input>
                        <button
                            type="onSubmit"
                            disabled={klantNummerOntvanger && ticketNummer == ""}
                            id="button"
                            onClick={ticketOverzetten}
                        >
                            Zet ticket over
                        </button>
                    </form>
        </>
    )

}
export default Page_Tickets