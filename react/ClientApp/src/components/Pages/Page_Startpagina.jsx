import React from 'react';
import Seats from '../../pictures/seats.png';
import Header from '../Header';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
                <h1>Welkom bij het Theater Laak</h1>
            </div>

            <div className='filter-content'>
                <div className='filter-content-title'>
                    <h2 >Ik ben op zoek naar</h2>
                </div>

                <div className='filter-content-filters'>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={genres}
                        onChange={(event, newValue) => SetGenre(newValue)}

                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Genre" />}
                    />


                    <Button variant="outlined" onClick={filterPerformances}>Zoeken</Button>
                    <Button variant="contained" onClick={fetchPerformances}>Reset</Button>
                </div>
            </div>
            <div className='show-content-top'>
                <h1>Voorstellingen</h1>
                <p>Bekijk hier het complete aanbod aan theatervoorstellingen van het theater Laak</p>
            </div>


            {
                performances.map(performance => {
                    return (
                        <div className='show-content' key={performance.id}>


                            <div className='show-content-rows'>
                                <div className='show-content-image'>

                                </div>

                                <div className='show-content-date-time'>
                                    <p>Aanvang: <br></br></p>
                                    <p>{performance.startTime}</p>
                                    <p>Zaal: {performance.room.roomNumber}</p>


                                </div>

                                <div className='show-content-show-info'>
                                    <h2>{performance.show.name}</h2>
                                    <p>{performance.show.description} </p>
                                    <p>Genre moet hier komen te staan</p>
                                    <p className='show-content-show-info-bold'>€{performance.show.price}</p>
                                </div>

                                <Button variant="contained" className='button-tickets-kopen'>Tickets kopen</Button>
                            </div>

                        </div>
                    )
                })
            }
            <hr></hr>

            <div className="flex-container-horizontal">

                <div >

                    <h1>Over het Theater Laak</h1>
                    <p>
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
                    <img src={Seats} alt="" />
                </div>
            </div>
        </>)
}

export default Page_Startpagina;

