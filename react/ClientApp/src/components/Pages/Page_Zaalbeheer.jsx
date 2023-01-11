import React, { useState, useEffect }  from 'react';
import RoomInfo from "../RoomInfo";

function Page_Zaalbeheer(){
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch('https://localhost:7293/api/Room')
            .then(response => response.json())
            .then(data => {
                setRooms(data);
                console.log(rooms)
            });
    }, []);


    const removeRoom = (roomId) => {
        setRooms(rooms.filter(item => item!== roomId));
    }
    
    return(
        <div className="flex-container-horizontal">
            
            <div className="flex-container-vertical">
                {rooms.map(i => (
                    <RoomInfo id={i} removeRoom={removeRoom}/>
                ))}
            </div>

            <div className="flex-container-vertical">
            <div>knop</div>
            <div>overzicht</div>
            </div>
        
        </div>)
}

export default Page_Zaalbeheer