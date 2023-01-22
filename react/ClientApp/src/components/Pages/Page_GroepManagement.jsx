import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Groep from "../Groep";
import '../../styles/Groep.css'

import Image from '../../pictures/groep.jpg'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PopUpGroepToevoegenAanShow from "../PopUpGroepToevoegenAanShow";
import PopUpActeurToevoegenAanShow from "../PopUpActeurToevoegenAanShow";


const GroepManagement = () => {

    const [groups, setGroups] = useState([]);
    

    const [triggerShow, setTriggerShow] = useState();
    const [triggerActor, setTriggerActor] = useState();
    const [group, setGroup] = useState();
    const navigate = useNavigate();

    
    
    useEffect( () => {
        axios.get('https://localhost:7293/api/Group/getGroups')
        .then(res => setGroups(res.data))
    },[])

    const deleteGroup = (id) => {
        axios.delete(`https://localhost:7293/api/Group/deleteGroup?id=${id}`)
        window.location.reload(false);
    }

    const addToShow = (id) => {
        
        axios.post(`https://localhost:7293/api/Group/addToShow`, {
            "groupId": id,
            "showId": 1
        
        })
    }

    return (
        <div>

            <h1>Groepmanagement</h1>
            
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
                            <tr>
                            <td>{group.id}</td>
                            <td> {group.name}</td>
                            <td> {group.description}</td>
                            <th> <a href={group.websiteUrl}>{group.websiteUrl}</a></th>
                            <th> <img src= {Image}></img></th>
                            <th> 
                            <Button variant='contained' onClick={() => {setTriggerShow(true); setGroup(group)}}>Toevoegen aan show</Button> 
                            <Button variant='contained' onClick={() => {setTriggerActor(true); setGroup(group)}}>Acteur toevoegen</Button>
                            <Button variant='contained' sx={{backgroundColor:'red'}} onClick={ () => {deleteGroup(group.id)}}>Verwijderen</Button>
                            </th>
                            
                    </tr>
                        )  
                    })}


                    
                </tbody>
            </table>

            <PopUpGroepToevoegenAanShow trigger={triggerShow} setTrigger={setTriggerShow} group={group}></PopUpGroepToevoegenAanShow>
            <PopUpActeurToevoegenAanShow trigger={triggerActor} setTrigger={setTriggerActor} group={group}></PopUpActeurToevoegenAanShow>

            
            <button id="button" onClick={() => { navigate('/admin') }}>Terug naar adminportaal</button>
        </div>
    )
}

export default GroepManagement;