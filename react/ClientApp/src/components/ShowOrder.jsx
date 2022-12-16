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
        <div style={{margin:"1%"}}>
        <tbody>
            <tr style={{backgroundColor:"black", color:"white"}}>
                <td>show naam</td>
                <td>Datum/tijd</td>
                <td>totaal bedrag hier</td>
                {props.canEdit && (<td></td>)}
            </tr>
            {props.seats.map((seatNumber, cellIndex) => (
                <tr key={cellIndex}>
                    <td>Stoel: {seatNumber}</td>
                    <td>
                        {props.canEdit && (<DropdownMenu
                            type="ticket"
                            options={ticketOptions}
                            optionClicked={updatePrice}/>)}
                    </td>
                    
                    <td>{price}</td>
                    
                    {props.canEdit &&(<td>
                        <button onClick={() => props.toggleSeat(seatNumber)}>X</button>
                    </td>)}
                </tr>
            ))} 
        </tbody>
        </div>
    )
} 

export default ShowOrder;