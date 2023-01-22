import { Button } from "@mui/material"
import ResponsiveAppBar from "../BezoekersPortaalHeader";
import Acteur from "../Acteur";
import { useEffect, useState } from "react";
import axios from "axios";

const Page_ActeurManagement = () => {

    const [name, setName] = useState();
    const[lastName, setLastname] = useState();
    const[stagename, setStagename] = useState();

    const [actors, setActors] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:7293/api/Actor/getActors')
        .then(res => setActors(res.data));
        
    },[])

    const addActor = () => {
        axios.post("https://localhost:7293/api/Actor/createActor", {
                "name": name,
                "lastname": lastName,
                "stagename": stagename 
        })
        window.location.reload(false);
    }

    return (
        <div className="actor-management-content">
        
        <h1>Acteur Management</h1>

        <p>Naam: </p>
        <input onChange={(e) => setName(e.target.value)}></input>
        <p>Achternaam: </p>
        <input onChange={(e) => setLastname(e.target.value)}></input>
        <p>Artietsnaam: </p>
        <input onChange={(e) => setStagename(e.target.value)}></input>
        <br></br>
        
<br></br>
        <Button variant="contained" onClick={addActor}> Acteur Aanmaken</Button>
        

        <h1>Lijst met acteurs: </h1>
        <div className="content-all-actors">
        {actors.map (actor => {
            return (
                <div key={actor.id}>
                    <Acteur actor={actor}></Acteur>
                    </div>
            )
        })}
        </div>
        


        </div>
    )
}

export default Page_ActeurManagement;