import React, {useState, useEffect} from 'react';

function SeatButton(props){
    const [seatData, setSeatData] = useState()
    const [seatNumber, setSeatNumber] = useState()
    const url = "https://localhost:7293/api/Seat/" + props.seatId
    
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSeatData(data);
                setSeatNumber(data.seatNumber)
                if (data.isDisabled === true){
                    setBorder_color("blue")}
            })
    }, []);
    
    {/*toggleColor wordt aangeroepen als toggleSeat wordt aangeroepen in de parent
    dit is zo gedaan omdat de x knop (ander child van de parent) ook de seat moet
    kunnen togglen */}
    useEffect(() => {
        toggleColor()
    }, [props.toggleSeat])
    
    const buttonClick = () => {
        props.toggleSeat(props.seatId)
        console.log(seatData.isDisabled)
            fetch('https://localhost:7293/api/Ticket/createticket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({seatId: props.seatId, performanceId: 1})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status} : ${response.statusText}`);
            }
            return response.json();
          })
          .catch(error => {
            console.log("An error occurred:", error);
          });
    }
    
    {/*past de kleur van de stoelknop aan*/}
    const [border_color, setBorder_color] = useState("black")
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
            style={{ backgroundColor: color[0], color: color[1], borderColor: border_color }}
            onClick={() => buttonClick()}>
            {seatNumber}
        </button>
    )
}

export default SeatButton;