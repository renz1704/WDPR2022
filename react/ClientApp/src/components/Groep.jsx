import { Button } from '@mui/material';
import { useState } from 'react';
import Image from '../pictures/groep.jpg'
import '../styles/Groep.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const Groep = (props) => {
    const group = props.group;
    const [shows, setShows] = useState([]);
    const [actors, setActors] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect( () => {
        getShows();
        getActors();
    },[])

    const getShows = () => {
        axios.get('https://localhost:7293/api/Show/getShows')
        .then(res => setShows(res.data))
    }

    const getActors = () => {
        axios.get('https://localhost:7293/api/Actor/getActors')
        .then(res => setActors(res.data))
    }

    const addToShow = () => {
        axios.post(`https://localhost:7293/api/Group/addToShow`, {
            "groupid": 1,
            "showid": 1
        })
    }

    const deleteGroup = () => {
        axios.delete(`https://localhost:7293/api/Group/deleteGroup?id=${group.id}`)
        window.location.reload(false);
    }


    return (
                <tr>
                <td>{group.id}</td>
                <td> {group.name}</td>
                <td> {group.description}</td>
                <th> <a href={group.websiteUrl}>{group.websiteUrl}</a></th>
                <th> <img src= {Image}></img></th>
                <th> 
                <Button variant='contained' onClick={handleOpen}>Toevoegen aan show</Button> 
                <Button variant='contained'>Acteur toevoegen</Button>
                <Button variant='contained' sx={{backgroundColor:'red'}} onClick={deleteGroup}>Verwijderen</Button>
                <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Shows
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                            <Button variant='contained' onClick={addToShow}> Toevoegen </Button>
                        </tr>
                    )
                })
            }
</tbody>
          </Typography>
        </Box>
      </Modal>

                </th>
                </tr>
    )
}

export default Groep;