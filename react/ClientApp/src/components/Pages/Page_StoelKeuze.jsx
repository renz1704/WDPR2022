import React, { useState, useEffect } from "react";
import ShowOrder from "../ShowOrder";
import Header from "../Header";
import SeatButton from "../SeatButton";
import { useNavigate } from "react-router-dom";
import PopUp from "../PopUp";



function Page_StoelKeuze(){

    {/*seats is een lijst van stoelen per rij*/}
    const [seats, setSeats] = useState([]);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const [seatNumber, setSeatNumber] = useState([]); 
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    {/*ipv room/1 moet hier bijv props.room worden gebruikt*/}
    useEffect(() => {
        fetch('https://localhost:7293/api/Room/19')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const Seats = data.rows.map(row => row.seats.map(seat => seat.id));
                setSeats(Seats);
            });
    }, []);

    {/*selectedSeats zijn de stoelen die de gebruiker kiest om te kopen*/}
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
        console.log(seatNumber)
    }

  {
    /*showPopUp wordt gebruikt om de popup te tonen
    popupmessage is de inhoud ervan*/
  }
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setpopUpMessage] = useState("");

  {
    /*navigate wordt gebruikt om naar de volgende pagina te gaan wanneer er tussen
     de 1tm25 stoelen zijn gekozen*/
  }
  const navigate = useNavigate();

  const onNextButtonClick = () => {
    if (selectedSeats.length < 1) {
      setpopUpMessage("Kies minstens 1 stoel om een bestelling te plaatsen.");
      setShowPopUp(true);
    } else if (selectedSeats.length > 25) {
      setpopUpMessage(
        "Het is niet toegestaan om meer dan 25 stoelen te kiezen."
      );
      setShowPopUp(true);
    } else {
      navigate("/winkelmand");
    }
  }
  return (

      <>
        <Header />
  
        {showPopUp && (
          <PopUp message={popUpMessage} onClose={() => setShowPopUp(false)} />
        )}
  
        <div className="flex-container-vertical" style={{ margin: "5%" }}>
          <h1 style={{ marginBottom: "2%" }}>
            Kies uw stoel(en) om een bestelling te plaatsen.
          </h1>
  
                  <div>podiumfoto</div>
                  {/*seatbuttons worden per row aangemaakt ze krijgen mee:
                   seatid,
                   toggleseat = een methode om de stoel in/uit de lijst selectedSeats te zetten,
                   ishighlighted = een boolean om de kleur van de stoel te bepalen*/}
                  <div>
  
                      <tbody>
                      {seats.map((row, i) => (
                          <tr  className="flex-container-horizontal" key={i}>
                              <td style={{border:"0px"}}>
                                  {row.map((seatId, j) => (
                                      <td key={j} style={{display: 'inline-block', textAlign: 'center'}}>
                                          <SeatButton
                                              seatId={seatId}
                                              toggleSeat={toggleSeat}
                                              isHighlighted={selectedSeats.includes(seatId)}
                                          />
                                      </td>
                                  ))}
                              </td>
                          </tr>
                      ))}
                      </tbody>
                  </div>
  
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
