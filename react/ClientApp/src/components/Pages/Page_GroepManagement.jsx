import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Groep from "../Groep";
import '../../styles/Groep.css'

const GroepManagement = () => {

    const [groups, setGroups] = useState([]);


    useEffect( () => {
        axios.get('https://localhost:7293/api/Group/getGroups')
        .then(res => setGroups(res.data))
    },[])

    return (
        <div>
            <h1>Groepmanagement</h1>

            <h1>Lijst met groepen</h1>

            <table class="styled-table">
    <thead>
        <tr>
            <th>Id</th>
            <th>Naam</th>
            <th>Beschrijving</th>
            <th>Link naar website</th>
            <th>Afbeelding</th>
            <th>Acties</th>
        </tr>
    </thead>
    <tbody>

        {groups.map( group => {
            return(
                <Groep group={group}></Groep>
            )
        })}
        
    </tbody>
</table>

        </div>
    )
}

export default GroepManagement;