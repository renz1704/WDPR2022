import React, { useState, useEffect } from 'react';

function SeatButton(props) {
    const [seatData, setSeatData] = useState()
    const [seatName, setSeatName] = useState()
    const url = "https://localhost:7293/api/Seat/" + props.seatId

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSeatData(data);
                setSeatName(data.seatNumber)
                if (data.isDisabled === true) {
                    setBorder_color("blue")
                }
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
    }

    {/*past de kleur van de stoelknop aan*/ }
    const [border_color, setBorder_color] = useState("black")
    const colorAvailable = "white"
    const colorSelected = "black"
    const [color, setColor] = useState([colorAvailable, colorSelected]);
    const toggleColor = () => {
        if (props.isHighlighted) {
            setColor([colorSelected, colorAvailable])
        }
        else {
            setColor([colorAvailable, colorSelected])
        }

    }

    return (
        <button
            style={{ backgroundColor: color[0], color: color[1], borderColor: border_color }}
            onClick={() => buttonClick()}>
            {seatName}
        </button>
    )
}

export default SeatButton;