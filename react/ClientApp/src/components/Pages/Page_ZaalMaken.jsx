import React, { useState } from "react";
import ButtonCounter from "../ButtonCounter";
import RowMaker from "../RowMaker";
import PopUp from "../PopUp";

function Page_ZaalMaken() {
    const [showPopUp, setShowPopUp] = useState(false);
    const [roomName, setRoomName] = useState("");

    {/*rowcount is het aantal rijen, seatsperrow is een array met het aantal stoelen in elke rij
    bijv: [3,4,5,6] rij 1 heeft 3 stoelen, rij 2 heeft 4 stoelen etc*/}
    const [rowCount, setRowCount] = useState(1)
    const [seatsPerRow, setSeatsPerRow] = useState([])
    const [disabledSeatsPerRow, setDisabledSeatsPerRow] = useState([])

    {/*deze functie wordt door de rowmaker children gebruikt om het aantal stoelen per rij aantepassen*/ }
    const changeSeatsPerRow = (i, seatCount) => {
        const updatedSeats = [...seatsPerRow];
        updatedSeats[i] = seatCount;
        setSeatsPerRow(updatedSeats);
    }

    const changeDisabledSeatsPerRow = (i, disabledSeats) => {
        const updatedSeats = [...disabledSeatsPerRow];
        updatedSeats[i] = disabledSeats;
        setDisabledSeatsPerRow(updatedSeats);
    }

    {/*elke keer als de gebruiker de input tekst voor de naam van de zaal aanpast wordt dat opgeslagen*/ }
    const nameEntered = event => {
        setRoomName(event.target.value);
    };

    {/*decrement/increment row passen het aantal rijen aan*/ }
    const decrementRow = () => {
        if (rowCount > 1)
            setRowCount(rowCount - 1)
    }
    const incrementRow = () => { setRowCount(rowCount + 1) }

    {/*makeNewRoom zet de nieuwe kamer in de database*/ }
    const makeNewRoom = () => {
        if (roomName === "") {
            setShowPopUp(true)
            return
        }

        let roomData = createRoomDataJson()

        fetch("http://localhost:5001/api/Room/createRoom", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(roomData)
        })
            .then(response => response.json())
            .then(response => console.log(response))
    }

    {/*deze functie verzamelt de gegevens die nodig zijn om de kamer te maken*/ }
    function createRoomDataJson() {
        const roomDataJson = {
            name: roomName,
            rows: []
        };

        {/*loopt door de rijen*/ }
        for (let i = 0; i < rowCount; i++) {

            {/*elke rij heeft een lijst met stoelen*/ }
            let row = { seats: [] };

            {/*loopt door de stoelen die bij de huidige rij hoort en voegt deze toe aan de lijst met seats*/ }
            for (let j = 0; j < seatsPerRow[i]; j++) {
                let seat = { SeatNumber: `${j + 1}`, RowNumber: `${i + 1}`, IsDisabled: checkIfSeatIsDisabled(i, j) };
                row.seats.push(seat);
            }

            roomDataJson.rows.push(row);
        }

        return roomDataJson;
    }

    const checkIfSeatIsDisabled = (i, j) => {
        if (Array.isArray(disabledSeatsPerRow[i]) && disabledSeatsPerRow[i].includes(j + 1)) { return true }
        else { return false }
    }


    {/*rowComponents is een verzameling van rowmakers (de rijen waarmee je het aantal stoelen bepaald)*/ }
    let rowsComponents = [];
    for (let i = 0; i < rowCount; i++) {
        rowsComponents.push(
            <tr>
                <td><RowMaker
                    id={i}
                    changeSeatsPerRow={changeSeatsPerRow}
                    changeDisabledSeatsPerRow={changeDisabledSeatsPerRow}
                /></td>
            </tr>
        );
    }

    return (
        <>{showPopUp && (<PopUp message={"Voeg een naam toe aan de zaal"} onClose={() => setShowPopUp(false)} />)}
            <div className="flex-container-horizontal">
                <div className="flex-container-vertical">
                    <div style={{ margin: "5%" }} className="flex-container-horizontal">
                        <ButtonCounter value={rowCount} increment={incrementRow} decrement={decrementRow} />
                        <input placeholder="Zaal naam" onChange={nameEntered} />
                    </div>
                    <tbody>
                        {rowsComponents}
                    </tbody>
                </div>
                <button id="button" onClick={makeNewRoom}>Opslaan</button>
                <div>Rolstoelplaatsen: {disabledSeatsPerRow}</div>
            </div>
        </>
    )
}
export default Page_ZaalMaken;