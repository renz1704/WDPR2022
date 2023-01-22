import Header from '../Header';
import { Routes, Route, useNavigate } from 'react-router-dom';
import "../../styles/generalStyle.css";
import { useEffect } from 'react';



function Page_AdminPortaal() {
    const navigate = useNavigate();
    
    return (
        <>

            <Header />
            <body>
                <button id="button" onClick={() => { navigate('/zaalbeheer') }}>Zaalbeheer</button>
                <button id="button" onClick={() => { navigate('/donatieBeheer') }}>DonatieBeheer</button>
                <button id="button" onClick={() => { navigate('/gastlijsten') }}>Gastlijsten</button>
                <button id="button" onClick={() => { navigate('/programmeringuploaden') }}>Programmering uploaden</button>
                <button id="button" onClick={() => { navigate('/groepen') }}>Groepmanagement</button>
                <button id="button" onClick={() => { navigate('/acteurmanagement') }}>Acteurmanagement</button>
            </body>

        </>
    )
}

export default Page_AdminPortaal