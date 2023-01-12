import React, {useEffect, useState} from "react";
import ButtonCounter from "./ButtonCounter";

function RowMaker(props){
    const [seatCount, setSeatCount] = useState(10);
    
    const [disabledSeats, setDisabledSeats] = useState([])
    const toggleSeat = (seatNumber) => {

        {/*dit checkt of het nummer van de stoel al geselecteerd is
        als dit niet zo is wordt de stoel toegevoegd aan de lijst*/}
        setDisabledSeats(oldArray => {
            if (!oldArray.includes(seatNumber)) {
                return [...oldArray, seatNumber]
            } else {
                return oldArray.filter(item => item !== seatNumber)
            }
        })
    }

    useEffect(() => {
        props.changeDisabledSeatsPerRow(props.id, disabledSeats);
    }, [disabledSeats])
    
    useEffect(() => {
        props.changeSeatsPerRow(props.id, seatCount)
        }
        ,[seatCount])  
    
    const decrementSeat = () => {
        if (seatCount > 0)
            setSeatCount(seatCount-1)}
    
    const incrementSeat = () => {
        setSeatCount(seatCount+1)}

    
    
    const seatsComponents = [];
    for (let i = 1; i < seatCount+1; i++) {
        let color = "black"
        if (disabledSeats.includes(i))
        {color = "blue"}
        
        seatsComponents.push(
            <tr key={i}>
                <td><button style={{borderColor: color}} onClick={()=> toggleSeat(i) }>{i}</button></td>
            </tr>
        );
    }
    
    return(
        <div className="flex-container-horizontal">
            <ButtonCounter 
                value={seatCount} 
                increment={incrementSeat} 
                decrement={decrementSeat}/>
            {seatsComponents}
            <div>{disabledSeats}</div>
        </div>
    )
}
export default RowMaker;