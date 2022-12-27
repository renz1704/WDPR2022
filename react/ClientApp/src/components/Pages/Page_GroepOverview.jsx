import axios from "axios";
import { useEffect, useState } from "react";


const GroepOverview = () => {

    const [posts, setPosts] = useState([]);

    useEffect( () => {
        
        axios.get('https://localhost:7293/api/Group/getallgroups')
        .then(res => {console.log(res.data) 
            setPosts(res.data)})
        
        .catch( error => {
            console.log(error)
        })
    },[])

    return(
        <>
            <h1>Groepoverzicht</h1>
            <ul>
                {
                    posts.map((group) => {
                        return(
                        <li>
                            <p>{group.id}</p>
                            <p>{group.name}</p>
                            <p>{group.description}</p>
                            <button> Groep deelnemen </button>
                        </li>
                        )
                         
                    })
                }
            </ul>
            
        </>
    )
}

export default GroepOverview;