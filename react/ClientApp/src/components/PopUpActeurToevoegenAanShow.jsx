import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import config from "../config.json";

const PopUpActeurToevoegenAanShow = (props) => {
    
    const [actors, setActors] = useState([]);

    useEffect( () => {
        axios.get(config.ApiUrl +`/api/Actor/getActors`)
        .then(res => setActors(res.data))
    },[])
    
    const addActor = (actor, group) => {
        axios.post(config.ApiUrl+`/api/Group/addtogroup?artistId=${actor.id}&groupId=${group.id}`)
        .then(res => {
            if(res.status == 200)
            {
                alert(`${actor.name} is toegoevoegd aan de volgende groep: ${group.name}`)
            }
        })
    }
    
    return (props.trigger) ?(<>
            <div>
                <h1>Acteurs</h1>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Naam</th>
                     <th>Acties</th>
                </tr>
            </thead>
            <tbody>
            {
                actors.map( actor => {
                    return(
                        <tr>
                            <td>{actor.id}</td>
                            <td>{actor.name}</td>
                            <Button variant='contained' onClick={() => addActor(actor, props.group)}> Toevoegen </Button>
                        </tr>
                    )
                })
            }
            </tbody>
            <Button variant="outlined" onClick={() => props.setTrigger(false)}>Sluiten</Button>
            </div>
    </>) : "";
}

export default PopUpActeurToevoegenAanShow;