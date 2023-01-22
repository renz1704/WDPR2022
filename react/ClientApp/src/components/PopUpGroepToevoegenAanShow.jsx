import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";


const PopUpGroepToevoegenAanShow = (props) => {

    const [shows, setShows] = useState([]);

    useEffect( () => {
        axios.get('https://localhost:7293/api/Show/getShows')
        .then(res => setShows(res.data))
    }, [])

    const addToShow = (show, group) => {
        axios.post(`https://localhost:7293/api/Group/addToShow`, {
            "groupId": group.id,
            "showId": show.id
        }).then(res => {
            if(res.status == 200)
            {
                alert("Groep succesvol toegevoegd aan " + show.name);
            }
        })

        
    }
    


    return (props.trigger) ? (
        <div>
            <h1>Shows</h1>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Naam</th>
                     <th>Acties</th>
                </tr>
            </thead>
            <tbody>
            {
                shows.map( show => {
                    return(
                        <tr>
                            <td>{show.id}</td>
                            <td>{show.name}</td>
                            <Button variant='contained' onClick={() => addToShow(show, props.group)}> Toevoegen </Button>
                        </tr>
                    )
                })
            }
            </tbody>
            <Button variant="outlined" onClick={() => props.setTrigger(false)}>Sluiten</Button>
        </div>
    ) : ""
} 


export default PopUpGroepToevoegenAanShow;