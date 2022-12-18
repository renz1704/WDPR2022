import React, {useState, useEffect} from 'react';

function ShowOrder(props){
    const price = 15
    const [totalPrice, setTotalPrice] = useState(0)

    {/*useEffect wordt uitgevoerd als de components is toegevoegd en als de waarde in de array veranderd
    in dit geval is dat props.seats.lenght. Als er een stoel wordt toegevoegd of verwijdert wordt de prijs
    opnieuw berekent*/}
    useEffect(() => {
        setTotalPrice(props.seats.length * price)
    }, [props.seats.length])
    
    return(
        <div style={{margin:"1%"}}>
        <tbody>
            <tr style={{backgroundColor:"black", color:"white"}}>
                <td>show naam</td>
                <td>Datum/tijd</td>
                <td>{totalPrice}</td>
                {props.canEdit && (<td></td>)}
            </tr>
            {props.seats.map((seatNumber, cellIndex) => (
                <tr key={cellIndex}>
                    <td>Stoel: {seatNumber}</td>
                    <td></td>
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