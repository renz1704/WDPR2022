import React, {useEffect, useState} from "react";
import ButtonCounter from "./ButtonCounter";

function RowMaker(props){
    const [seatCount, setSeatCount] = useState(10);
    
    const [disabledSeats, setDisabledSeats] = useState([])
    const toggleSeat = (seatNumber) => {

        {/*dit checkt of het nummer van de stoel al geselecteerd is
        als dit niet zo is wordt de stoel toegevoegd aan de lijst*/}
        if (!disabledSeats.includes(seatNumber)) {
            setDisabledSeats(oldArray => [...oldArray, seatNumber])
            console.log("toevoegen")
        }
        else{
            {/*als dit wel zo is wordt de stoel uit de lijst gehaald*/}
            setDisabledSeats(disabledSeats.filter(item => item!== seatNumber));
            console.log("verwijdert")
        }
        props.changeDisabledSeatsPerRow(props.id, disabledSeats)
        console.log(disabledSeats)
    }
    
    
    useEffect(() => {
        let list = [];
        
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
        </div>
    )
}
export default RowMaker;