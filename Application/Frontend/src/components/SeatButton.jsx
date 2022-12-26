import React, {useState, useEffect} from 'react';

function SeatButton(props){
    {/*toggleColor wordt aangeroepen als toggleSeat wordt aangeroepen in de parent
    dit is zo gedaan omdat de x knop (ander child van de parent) ook de seat moet
    kunnen togglen */}
    useEffect(() => {
        toggleColor()
    }, [props.toggleSeat])
    
    const buttonClick = () => {
        props.toggleSeat(props.seatNumber)
    }


    {/*past de kleur van de stoelknop aan*/}
    const colorAvailable = "white"
    const colorSelected = "black"
    const [color, setColor] = useState([colorAvailable, colorSelected]);
    const toggleColor =() => {
        if (props.isHighlighted){
            setColor([colorSelected, colorAvailable])
        }
        else {
            setColor([colorAvailable, colorSelected])
        }
    }
   
    return(
        <button 
            style={{ backgroundColor: color[0], color: color[1] }}
            onClick={() => buttonClick()}>
            {props.seatNumber}
        </button>
    )
}

export default SeatButton;