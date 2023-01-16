import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import UserService from '../../../services/UserService';
import { useState } from 'react';
import { useEffect } from 'react';
import { getListSubheaderUtilityClass } from '@mui/material';
import { Link } from 'react-router-dom';

function Page_BezoekersPortaal(props) {  
    
    const [user, setUser] = useState(UserService.getUser());

    useEffect( () => {
        UserService.getUser();
    },[ ])


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
                <li>Email: {UserService.getUser().email}</li>
                <br></br>
                <li>Naam: {UserService.getUser().firstname}</li>
                <br></br>
                <li>Achternaam: {UserService.getUser().lastname}</li>
            </ul>


            <br></br>
            <p>Klik <Link to={'/tickets'}> hier </Link>om Uw order geschiedenis te bekijken</p><br></br>
            <p>Klik <Link to={'/accountgegevensWijzigen'}> hier </Link> om Uw accountgegevens te bijwerken</p><br></br>
            <p>Klik <Link to={''}> hier</Link> om geld te doneren</p>
            <p><Link to={'/orders'}>klik</Link> hello</p>
            </div>
        </div>
    )
}

export default Page_BezoekersPortaal
