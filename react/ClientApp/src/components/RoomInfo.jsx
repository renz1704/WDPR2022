import React, { useState, useEffect }  from 'react';

function RoomInfo(props){
    
    const deleteRoom = () => {
        let url = 'http://localhost:5001/api/Room/delete/' + props.id
        fetch(url,{
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                props.removeRoom(props.id)
                return response.json();
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    const [name, setName] = useState("Laden")
    useEffect(()=>{
        let url = 'http://localhost:5001/api/Room/name/' + props.id
        fetch(url)
            .then(response =>{ console.log(response)})
    }, []);
    
    return(
        <div className="flex-container-horizontal">
        <div style={{margin:"15%"}}>Zaal {props.id} Naam: {name}</div>
        <button onClick={() => (deleteRoom())}>Verwijder</button>
        </div>
    )
}

export default RoomInfo