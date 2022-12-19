import { useState } from "react";

const GroepManagement = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const[groupName, setGroupName] = useState("");
    const[artistId, setArtistId] = useState();
    const [groupId, setGroupId] = useState();

    const createArtist = () => {
        fetch('https://localhost:7293/api/group/createartist', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({FirstName: name, LastName: lastName})
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    }

    const createGroup = () => {
        fetch('https://localhost:7293/api/group/creategroup',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type' : 'application/json'

            },
            body: JSON.stringify({Name: groupName})
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    const assignGroup = () => {
        fetch(`https://localhost:7293/api/group/addtogroup?artistId=${artistId}&groupId=${groupId}
        `,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type' : 'application/json'

            }
        })        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    return (
        <div>
            <h1>Create An Artist</h1>
            <p>name</p>
            <input onChange={(e) => setName(e.target.value)}></input>
            <p>last name</p>
            <input onChange={(e) => setLastName(e.target.value)}></input>
            <button onClick={createArtist}>Create User</button>
            <br>
            </br>
            <br>
            </br>
            <h1>Create a new group</h1>
            <p>Groupname</p>
            <input onChange={(e) => setGroupName(e.target.value)}></input>
            <button onClick={createGroup}>Create group</button>
            <br>
            </br>
            <br>
            </br>
            <h1>Assign group to artist</h1>
            <p>User Id</p>
            <input onChange={(e) => setArtistId(e.target.value)}></input>
            <p>Group Id</p>
            <input onChange={(e) => setGroupId(e.target.value)}></input>
            <button onClick={assignGroup}>Assign group</button>
        </div>
    )
}

export default GroepManagement;