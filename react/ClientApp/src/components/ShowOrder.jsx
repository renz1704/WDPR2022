import React, { useState, useEffect } from 'react';

function ShowOrder(props) {
    const price = 15
    const [totalPrice, setTotalPrice] = useState(0)

    {/*useEffect wordt uitgevoerd als de components is toegevoegd en als de waarde in de array veranderd
    in dit geval is dat props.seats.lenght. Als er een stoel wordt toegevoegd of verwijdert wordt de prijs
    opnieuw berekent*/}
    useEffect(() => {
        if(props.seats){
            setTotalPrice(props.seats.length * price)
        }
    }, [props.seats])

    const [seatData, setSeatData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await Promise.all(props.seats.map(async id => {
                const response = await fetch(`/api/seats/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch seat data');
                }
                return response.json();
            }));
            setSeatData(data);
            console.log(seatData)
        }
        fetchData();
    }, [props.seats]);

    if (!seatData.length) {
        return <div>Loading...</div>;
    }
    
    return(
        <div style={{margin:"1%"}}>
        <tbody>
            <tr style={{backgroundColor:"black", color:"white"}}>
                <td>show naam</td>
                <td>Datum/tijd</td>
                <td>{totalPrice}</td>
                {props.canEdit && (<td></td>)}
            </tr>
            {seatData && seatData.map((seatName, cellIndex) => (
                <tr key={cellIndex}>
                    <td>Stoel: {seatName}</td>
                    <td></td>
                    <td>{price}</td>
                    {props.canEdit &&(<td>
                        <button onClick={() => props.toggleSeat(seatName)}>X</button>
                    </td>)}

                </tr>
                {props.seats.map((seatName, cellIndex) => (
                    <tr key={cellIndex}>
                        <td>Stoel: {seatName}</td>
                        <td></td>
                        <td>{price}</td>
                        {props.canEdit && (<td>
                            <button onClick={() => props.toggleSeat(seatName)}>X</button>
                        </td>)}
                    </tr>
                ))}
            </tbody>
        </div>
    )
}

export default ShowOrder;