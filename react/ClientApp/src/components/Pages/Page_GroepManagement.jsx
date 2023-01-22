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

            <div className="group-list-content">
            {groups.map (group => {
            return (
                <Groep group={group}></Groep>
            )
        })}

            </div>

        </div>
    )
}

export default GroepManagement;