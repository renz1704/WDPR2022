import React, {useState, useEffect} from 'react';

function ShowOrder(props) {
    const [totalPrice, setTotalPrice] = useState(0)


    {/*useEffect wordt uitgevoerd als de components is toegevoegd en als de waarde in de array veranderd
    in dit geval is dat props.seats.lenght. Als er een stoel wordt toegevoegd of verwijdert wordt de prijs
    opnieuw berekent*/
    }
    useEffect(() => {
        if (props.seats && props.performance) {
            setTotalPrice(props.seats.length * props.performance.price);
        }
    }, [props.seats, props.performance]);


    const [seatData, setSeatData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await Promise.all(props.seats.map(async id => {
                const response = await fetch(`https://localhost:7293/api/Seat/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch seat data');
                }
                return response.json();
            }));
            setSeatData(data);
        }

        fetchData();
    }, [props.seats]);


    return (
        <div style={{margin: "1%"}}>
            <tbody>

            {props.performance &&
                <tr style={{backgroundColor: "black", color: "white"}}>
                    <td>{props.performance.show.name}</td>
                    <td>{props.performance.startTime}</td>
                    <td>{totalPrice}</td>
                </tr>
            }

            {seatData && seatData.map((seat, cellIndex) => (
                <tr key={cellIndex}>
                    <td>Stoel: {seat.seatNumber} <br></br>Rang: {}</td>
                    <td></td>
                    {props.canEdit && (<td>
                        <button onClick={() => props.toggleSeat(seat.id)}>X</button>
                    </td>)}
                </tr>
            ))
            }


            </tbody>
        </div>
    )
}

export default ShowOrder;