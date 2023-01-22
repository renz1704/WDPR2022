import { Button } from '@mui/material';
import { useState } from 'react';
import Image from '../pictures/groep.jpg'
import '../styles/Groep.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import axios from 'axios';

import PopUpGroepToevoegenAanShow from './PopUpGroepToevoegenAanShow';

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
    
    const [actors, setActors] = useState([]);


    useEffect( () => {

    },[])


    const getActors = () => {
        axios.get('https://localhost:7293/api/Actor/getActors')
        .then(res => setActors(res.data))
    }




}

export default Groep;