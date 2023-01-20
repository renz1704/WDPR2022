import React, { useState, useEffect } from 'react';
import PerformanceGastLijst from "../PerformanceGastLijst";

function Page_Gastlijsten() {

    const [performances, setPerformances] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/Performance/performances')
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
        </div>
    );
}

export default Page_Gastlijsten;