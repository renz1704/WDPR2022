import React, {useState} from "react";
import ButtonCounter from "../ButtonCounter";
import RowMaker from "../RowMaker";

/*rows: [
                    {
                        seats: [
                            {
                                number: 'string'
                            }]
                    }]*/

function Page_ZaalMaken(){
    const [roomName, setRoomName] = useState("");
    const [rowCount, setRowCount] = useState(1)
    const [rows, setRows] = useState([])

    const nameEntered = event => {
        setRoomName(event.target.value);
        console.log(rowsComponents);
    };
    
    const decrementRow = () => {
        if (rowCount > 0)
            setRowCount(rowCount-1)
    }
    const incrementRow = () => {setRowCount(rowCount+1)}
    
    const makeNewRoom = () => {
        fetch("http://localhost:7293/api/Room/createRoom",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                name: roomName,
                rows: [
                    {
                        seats: [
                            {
                                number: '1',
                                type: 'default'
                            }]
                    }]
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
    }
    
    let rowsComponents = [];
    for (let i = 0; i < rowCount; i++) {
        rowsComponents.push(
            <tr key={i}>
                <td><RowMaker/></td>
            </tr>
        );
    }
    
    return(
        
        <div className="flex-container-horizontal">
        <div className="flex-container-vertical">
            <div style={{margin:"5%"}} className="flex-container-horizontal">
                <ButtonCounter value={rowCount} increment={incrementRow} decrement={decrementRow}/>
                <input onChange={nameEntered}/>
            </div>
            <tbody>
            {rowsComponents}
            </tbody>
        </div>
            <button onClick={makeNewRoom}>Opslaan</button>
        </div>
    )
}
export default Page_ZaalMaken;