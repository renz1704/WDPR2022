import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import UserService from '../../../services/UserService';
import { useState, useEffect } from 'react';

import { getListSubheaderUtilityClass } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Page_BezoekersPortaal(props) {

    const navigate = useNavigate();

    const [user, setUser] = useState(UserService.getUser());

    useEffect(() => {
        UserService.getUser();
    }, [])


    return (
        <div>

            <BezoekersPortaalHeader />

            <h5>Mijn Theater Laak</h5>
            <div className="flex-container-vertical">
                <p>
                    Welkom op het bezoekersportaal,

                    Hier kunt u zaken regelen rondom uw account en u kunt uw tickets inzien.
                    Hierboven kunt u naar de verschillende tabbladen.
                </p>

                <h1>
                    Mijn Gegevens
                </h1>

                <ul>
                    <li>Klant nummer: {UserService.getUser().id}</li>
                    <br></br>
                    <li>Email: {UserService.getUser().email}</li>
                    <br></br>
                    <li>Naam: {UserService.getUser().firstname}</li>
                    <br></br>
                    <li>Achternaam: {UserService.getUser().lastname}</li>
                </ul>


                <br></br>
                <label>Klik hier om uw order geschiedenis te bekijken:</label>
                <button id="button" onClick={() => { navigate('/tickets') }}>Ordergeschiedenis</button>
                <label>Klik hier om uw accountgegevens te wijzigen:</label>
                <button id="button" onClick={() => { navigate('/gegevens') }}>Gegevens wijzigen</button>
                <label>Klik hier om Theater Laak te steunen d.m.v. een donatie:</label>
                <button id="button" onClick={() => { navigate('/doneren') }}>Doneren</button>
            </div>
        </div>
    )
}

export default Page_BezoekersPortaal
