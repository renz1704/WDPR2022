import React, { useState }  from 'react';
import ShowOrder from "./ShowOrder";
function Page_StoelKeuze(){

    {/*deze gegevens moeten gefetched worden*/}
    let row1 = [1, 2, 3, 4]
    let row2 = [5, 6, 7, 8]
    let row3 = [9, 10, 11, 12]
    let rows =[row1, row2, row3]

    const [selectedSeats, setSeat] = useState([]);
    
    const toggleSeat = (seatNumber) => {
        console.log(seatNumber)
        {/*dit checkt of het nummer van de stoel al geselecteerd is
        als dit niet zo is wordt de stoel toegevoegd aan de lijst*/}
        if (!selectedSeats.includes(seatNumber)) {
            setSeat(oldArray => [...oldArray, seatNumber])
        }
        else{
            {/*als dit wel zo is wordt de stoel uit de lijst gehaald*/}
            setSeat(selectedSeats.filter(item => item!== seatNumber));
        }
    }


    return(
        <div className="flex-container-vertical">

            {/*stoelen knoppen*/}
            <div>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        
                        {row.map((seatNumber, cellIndex) => (
                            <td key={cellIndex}><button onClick={() => toggleSeat(seatNumber)}>{seatNumber}</button></td>
                        ))}
                        
                    </tr>
                ))}
                </tbody>
            </div>
            
            
            <div>podiumfoto</div>
            
            <div>
                <ShowOrder toggleSeat={toggleSeat} seats={selectedSeats}/>
            </div>
            
        </div>
    )
}

export default Page_StoelKeuze;