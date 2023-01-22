import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Groep from "../Groep";
import '../../styles/Groep.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const GroepManagement = () => {

    const [groups, setGroups] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    useEffect( () => {
        axios.get('https://localhost:7293/api/Group/getGroups')
        .then(res => setGroups(res.data))
    },[])

    return (
        <div>

<Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
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