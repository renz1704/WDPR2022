import React, { useState, useEffect } from 'react';
import RoomInfo from "../RoomInfo";
import { Routes, Route, useNavigate } from 'react-router-dom';
import config from "../../config.json";


function Page_Zaalbeheer() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch(config.ApiUrl+'/api/Room')
            .then(response => response.json())
            .then(data => {
                setRooms(data);
                console.log(rooms)
            });
    }, []);

    const removeRoom = (roomId) => {
        setRooms(rooms.filter(item => item !== roomId));
    }

    return (

        <div className="flex-container-horizontal">

            <div className="flex-container-vertical">
                {rooms.map(i => (
                    <RoomInfo id={i} removeRoom={removeRoom} />
                ))}
            </div>

            <div className="flex-container-vertical">
                <div><button id="button" onClick={() => { navigate('/zaalmaken') }}>Nieuwe zaal maken</button></div>
                <div>overzicht</div>
            </div>

            <button id="button" onClick={() => { navigate('/admin') }}>Terug naar adminportaal</button>

        </div>
    )
}

export default Page_Zaalbeheer