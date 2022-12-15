import React from 'react';
import DropdownMenu from "./DropdownMenu";

function ShowOrder(props){
    const ticketOptions = ["Volwassen", "Kind", "Senior"]
    const tickePrices = [15, 12, 9]
    
    return(
        <tbody>
            {props.seats.map((seatNumber, cellIndex) => (
                <tr key={cellIndex}>
                    <td>Stoel: {seatNumber}</td>
                    <td><DropdownMenu type="ticket" options={ticketOptions}/></td>
                    <td>prijs</td>
                    <td><button onClick={() => props.toggleSeat(seatNumber)}>X</button></td>
                </tr>
            ))} 
        </tbody>
    )
} 

export default ShowOrder;