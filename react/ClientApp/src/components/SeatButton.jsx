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
    
    const [owned, setOwned] = useState(false)
    
    const buttonClick = async () => {
        if (await fetchSeatAvailability() === true)
            {
                setOwned(true)
                props.toggleSeat(props.seatId)
            }
        else if (owned)
        {
            props.toggleSeat(props.seatId)
            setOwned(false)
        }
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

    const [seatAvailability, setSeatAvailability] = useState(false);

    const fetchSeatAvailability = async () => {
        try {
            const url = "https://localhost:7293/api/Seat/checkseatavailability?seatId=" + props.seatId + "&performanceId=" + props.performanceId;
            const response = await fetch(url);
            const data = await response.json();
            setSeatAvailability(data);
            return data
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (props.seatId && props.performanceId) {
            fetchSeatAvailability();
        }
    }, [props.seatId, props.performanceId, seatAvailability]);



    return (
        <button
            style={{ backgroundColor: seatAvailability ? color[0] : "red", color: color[1], borderColor: border_color }}
            onClick={seatAvailability ? () => buttonClick() : null}>
            {seatName}
        </button>
    )

}

export default SeatButton;