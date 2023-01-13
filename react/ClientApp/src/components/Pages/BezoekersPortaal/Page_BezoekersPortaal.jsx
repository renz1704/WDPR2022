import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import UserService from '../../../services/UserService';
import { useState } from 'react';
import { useEffect } from 'react';
import { getListSubheaderUtilityClass } from '@mui/material';

function Page_BezoekersPortaal(props) {  
    
    const [user, setUser] = useState(undefined);

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

            </div>
        </div>
    )
}

export default Page_BezoekersPortaal
