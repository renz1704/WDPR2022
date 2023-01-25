import React, { useState, useEffect } from 'react';
import PerformanceGastLijst from "../PerformanceGastLijst";
import { useNavigate } from 'react-router-dom';
import config from "../../config.json";

function Page_Gastlijsten() {

    const [performances, setPerformances] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(config.ApiUrl+'/api/Performance/performances')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setPerformances(data);
            })
            
    }, []);

    return (
        <div>
            <h2>Performances</h2>
            <ul>
                {performances.map(performance => (
                    <PerformanceGastLijst
                    performanceId={performance.id}
                    performanceStartTime={performance.startTime}
                    performanceEndTime={performance.endTime}
                    performanceShowName={performance.showName}
                    performanceRoomNumber={performance.roomNumber}
                    />
                ))}
            </ul>
            <button id="button" onClick={() => { navigate('/admin') }}>Terug naar adminportaal</button>
        </div>
        
    );
}

export default Page_Gastlijsten;