import React from 'react';
import Seats from '../../pictures/seats.png';
import Header from '../Header';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Footer from '../Footer';

import '../../styles/ShowFrontpage.css'
import Banner from '../../pictures/banner.png'

import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import "./Startpagina.css"
import Show from './ShowComponents/Show';



function Page_Startpagina() {

    const [shows, setShows] = useState([]);
    const [genre, SetGenre] = useState("Horror");
    const [genres, SetGenres] = useState([]);
    const [datum, SetDatum] = useState([]);



    useEffect(() => {
        fetchShows();
        fetchGenres();

    }, [])

    const fetchShows = () => {
        axios.get(`https://localhost:7293/api/Show/getShows`).then(res => {
        console.log(res.data)    
        setShows(res.data)});
    }


    const fetchGenres = () => {
        axios.get(`https://localhost:7293/api/Genre/GetGenresString`).then(res => SetGenres(res.data));
    }


    return (
        <>
            <Header />
            <div className='banner'>
                <h1 aria-label="Title theater">Welkom bij het Theater Laak</h1>
            </div>

            <div className='title-shows'>
            <h1>Nu te zien in het Theater Laak</h1>
            </div>
            <div className="show-content">

                {shows.map( show => {
                    return(
                        <Show show={show}></Show>
                    )
                })}
            </div>

            <Footer/>
        </>
        )
}

export default Page_Startpagina;

