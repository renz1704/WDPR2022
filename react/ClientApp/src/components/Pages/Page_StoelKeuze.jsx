import React, { useState, useEffect }  from 'react';
import ShowOrder from "../ShowOrder";
import Header from "../Header";
import SeatButton from "../SeatButton";
import {Routes, Route, useNavigate} from 'react-router-dom';
import PopUp from "../PopUp";


function Page_StoelKeuze(){

    {/*deze gegevens moeten gefetched worden*/}
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:5152/api/Room/1');
            const json = await response.json();
            setData(json);
        }
        console.log(fetchData());
    }, []);
    
    let row1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let row2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    let row3 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    let rows =[row1, row2, row3]

    const [selectedSeats, setSeat] = useState([]);
    
    const toggleSeat = (seatNumber) => {
        
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

    {/*showPopUp wordt gebruikt om de popup te tonen
    popupmessage is de inhoud ervan*/}
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setpopUpMessage] = useState("");


    {/*navigate wordt gebruikt om naar de volgende pagina te gaan wanneer er tussen
     de 1tm25 stoelen zijn gekozen*/}
    const navigate = useNavigate();
    
    const onNextButtonClick = () => {
        if (selectedSeats.length < 1){
            setpopUpMessage("Kies minstens 1 stoel om een bestelling te plaatsen.")
            setShowPopUp(true)
        }
        else if (selectedSeats.length > 25)
        {
            setpopUpMessage("Het is niet toegestaan om meer dan 25 stoelen te kiezen.")
            setShowPopUp(true)
        }
        else
        {
            navigate('/winkelmand');
        }
    }
    
    return(
        <>
            <Header/>
            
            {showPopUp && (<PopUp message={popUpMessage} onClose={() => setShowPopUp(false)}/>)}
            
            <div className="flex-container-vertical" style={{margin:"5%"}}>

                <h1 style={{marginBottom:"2%"}}>Kies uw stoel(en) om een bestelling te plaatsen.</h1>
                
                {/*seatbuttons worden per row aangemaakt ze krijgen mee:
                 seatnumber = nummer van de stoel
                 toggleseat = een methode om de stoel in/uit de lijst selectedSeats te zetten
                  ishighlighted = een boolean om de kleur van de stoel te bepalen*/}
                <div>
                    <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((seatNumber, cellIndex) => (
                                <td key={cellIndex}>
                                    <SeatButton 
                                        seatNumber={seatNumber}
                                        toggleSeat={toggleSeat}
                                        isHighlighted={selectedSeats.includes(seatNumber)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </div>
                
                <div>podiumfoto</div>

                <div className="flex-container-horizontal" style={{width:"100%", height:"100%"}}>
                    <div>
                        <ShowOrder toggleSeat={toggleSeat} seats={selectedSeats} canEdit={true}/>
                    </div>
                    <div>
                        <button
                            style={{
                                width:"300px", 
                                height:"50px"}}
                            onClick={() => onNextButtonClick()}>
                            Voeg toe aan winkelmand
                        </button>
                    </div>
                </div>
                
            </div>
            
        </>
    )
}

export default Page_StoelKeuze;