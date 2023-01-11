import React, {useEffect, useState} from "react";
import ButtonCounter from "./ButtonCounter";

function RowMaker(){
    const [seatCount, setSeatCount] = useState(10);
    const [seats, setSeats] = useState([])
    
    useEffect(() =>{
        let list = [];
        for (let i = 1; i < seatCount+1; i++){
            list.push(i)}
        setSeats(list);
        }
        ,seatCount)  
    
    const decrementSeat = () => {
        if (seatCount > 0)
            setSeatCount(seatCount-1)
    }
    const incrementSeat = () => {setSeatCount(seatCount+1)}

    const seatsComponents = [];
    for (let i = 1; i < seatCount+1; i++) {
        seatsComponents.push(
            <tr key={i}>
                <td><button onClick={()=> {console.log(seats)} }>{i}</button></td>
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