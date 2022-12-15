import React, {useState} from 'react';
import DropdownMenu from "./DropdownMenu";

function ShowOrder(props){
    const ticketOptions = ["Volwassen", "Kind", "Senior"]
    const ticketPrices = [15, 12, 9]
    
    const [price, setPrice] = useState(ticketPrices[0])
    
    const updatePrice = (choice) => {
       ticketOptions.map((option, index) => {
           if (option == choice)
           {setPrice(ticketPrices[index])}
       })
        
    }
       
    
    
    return(
        <tbody>
            <tr>
                <td>show naam</td>
                <td></td>
                <td>totaal bedrag hier</td>
                <td></td>
            </tr>
            {props.seats.map((seatNumber, cellIndex) => (
                <tr key={cellIndex}>
                    <td>Stoel: {seatNumber}</td>
                    <td><DropdownMenu type="ticket" options={ticketOptions} optionClicked={updatePrice}/></td>
                    <td>{price}</td>
                    <td><button onClick={() => props.toggleSeat(seatNumber)}>X</button></td>
                </tr>
            ))} 
        </tbody>
    )
} 

export default ShowOrder;