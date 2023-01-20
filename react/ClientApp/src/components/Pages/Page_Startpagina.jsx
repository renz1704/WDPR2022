import React from 'react';
import Seats from '../../pictures/seats.png';
import Header from '../Header';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Footer from '../Footer';

import Banner from '../../pictures/banner.png'

import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import "./Startpagina.css"


function Page_Startpagina() {

    const [performances, SetPerformances] = useState([]);
    const [genre, SetGenre] = useState("Horror");
    const [genres, SetGenres] = useState([]);
    const [datum, SetDatum] = useState([]);



    useEffect(() => {
        fetchPerformances();
        fetchGenres();
        console.log(performances);
    }, [])

    const fetchPerformances = () => {
        axios.get(`https://localhost:7293/api/Performance/performances`).then(res => SetPerformances(res.data));
        console.log(performances);
    }

    const fetchGenres = () => {
        axios.get(`https://localhost:7293/api/Genre/GetGenresString`).then(res => SetGenres(res.data));
    }

    const filterPerformances = () => {
        console.log(genre);
        axios.get(`https://localhost:7293/api/Performance/getPerformancesFilteredGenres?genre=${genre}
        `).then(res => SetPerformances(res.data))
    }

    return (
        <>
            <Header />
            <div className='banner'>
                <h1 aria-label="Title theater">Welkom bij het Theater Laak</h1>
            </div>

            <div className='filter-content'>
                <div className='filter-content-title'>
                    <h2 aria-label="Zoek">Ik ben op zoek naar</h2>
                </div>

                <div className='filter-content-filters'>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={genres}
                        onChange={(event, newValue) => SetGenre(newValue)}
                        className='filter'
                        aria-label="Genre filter"
                        renderInput={(params) => <TextField {...params} label="Genre" aria-label="Genre input"/>}
                    />


                    <Button className='filter' variant="outlined" onClick={filterPerformances} aria-label="Zoek voorstelling knop">Zoeken</Button>
                    <Button className='filter' variant="contained" onClick={fetchPerformances} aria-label="Reset Filter knop">Reset</Button>
                </div>
            </div>
            <div className='show-content-top'>
                <h1 aria-label='Voorstellingen'>Voorstellingen</h1>
                <p aria-label='Voorstellings beschrijving'>Bekijk hier het complete aanbod aan theatervoorstellingen van het theater Laak</p>
            </div>


            {
                performances.map(performance => {
                    return (
                        <div aria-label='Voorstellingen:' className='show-content' key={performance.id}>


                            <div className='show-content-rows'>
                                <div aria-label='Afbeelding van voorstelling' className='show-content-image'>

                                </div>

                                <div  aria-label='Datum en tijd' className='show-content-date-time'>
                                    <p>Aanvang: <br></br></p>
                                    <p aria-label='Starttijd'>{performance.startTime}</p>
                                    <p aria-label='Zaal nummer'>Zaal: {performance.room.name}</p>
                                </div>

                                <div className='show-content-show-info'>
                                    <h2 aria-label='Naam'>{performance.show.name}</h2>
                                    <p aria-label='Beschrijving'>{performance.show.description} </p>
                                    <p aria-label='Genre'>Genre moet hier komen te staan</p>
                                    <p aria-label='Prijs' className='show-content-show-info-bold'>€{performance.show.price}</p>
                                </div>

                                <Button variant="contained" className='button-tickets-kopen' aria-label='Ticket kopen knop'>Tickets kopen</Button>
                            </div>
                        </div>
                    )
                })
            }
            <hr></hr>

            <div className="flex-container-horizontal">

                <div >

                    <h1 aria-label='Over Theater'>Over het Theater Laak</h1>
                    <p aria-label='Beschrijving'>
                        Het theater is heel cool
                        amet justo donec enim diam vulputate ut pharetra
                        sit amet aliquam id diam maecenas ultricies mi eget
                        mauris pharetra et ultrices neque ornare aenean
                        euismod elementum nisi quis eleifend quam adipiscing
                        vitae proin sagittis nisl rhoncus mattis rhoncus urna neque
                        viverra justo nec ultrices dui sapien eget mi proin sed
                    </p>
                </div>

                <div >
                    <img aria-label='Afbeelding theater' src={Seats} alt="" />
                </div>
            </div>
            <Footer/>
        </>
        )
}

export default Page_Startpagina;

