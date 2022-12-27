import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

function Page_ActorOverview() {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        axios.get('https://localhost:7293/api/Group/getallactors')
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
                        <li key={group.id}>
                            <p>{group.id}</p>
                            <p>{group.name}</p>
                            <p>{group.lastName}</p>
                            <p>{group.stageName}</p>
                            <p>{group.description}</p>
                            <button> Account aanmaken </button>
                            <button> Toevoegen aan groep </button>
                        </li>
                        )
                         
                    })
                }
            </ul>
            
        </>
    )
}

export default Page_ActorOverview
