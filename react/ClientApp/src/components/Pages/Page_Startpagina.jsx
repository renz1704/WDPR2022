import React from 'react';
import Seats from '../../pictures/seats.png';
import Header from '../Header';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Banner from '../../pictures/banner.png'

import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';

import "./Startpagina.css"

function Page_Startpagina() {

    const [performances, SetPerformances] = useState([]);
    const [genres, SetGenres] = useState([]);
    const [datum, SetDatum] = useState([]);
    


    useEffect( () => {
        fetchPerformances();
        console.log(performances);
        //axios.get(`https://localhost:7293/api/Genre/genres
        //`).then(response => SetGenres(response))
    }, [] )

    const fetchPerformances = () => {
        axios.get(`https://localhost:7293/api/Performance/performances`).then(res => SetPerformances(res.data));
    }

    return (
        <>
            <Header />

            <div className='banner'>
                <img src={Banner}></img>
                </div>

            <div className='filter-content'>
                <div className='filter-content-title'>
                    <h1>Ik ben op zoek naar</h1>
                </div>
                
                <div className='filter-content-filters'>
                     <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Genre" />}
                    />
                                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Maand" />}
                    />
                    

                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Datum" />}
                    />

                    <Button variant="outlined">Zoeken</Button>
                    </div>
            </div>
            <div className='show-content-top'>
                <h1>Voorstellingen</h1>
                <p>Bekijk hier het complete aanbod aan theatervoorstelling van het theater Laak</p>
                </div>


                {
                    performances.map(performance => {
                        return (
                            <div className='show-content' key={performance.id}>
                

                                    <div className='show-content-rows'>
                                        <div className='show-content-image'>
                                            
                                        </div>

                                        <div className='show-content-date-time'>
                                            <p>Aanvang: {performance.startTime}</p>
                                    
                                        </div>

                                        <div className='show-content-show-info'>
                                            <h2>{performance.show.name}</h2>
                                            <p className='show-content-show-info-bold'>Jaap, Klaas, Steven, Piet</p>
                                            <p>{performance.show.description} </p>
                                            <p className='show-content-show-info-bold'>€{performance.show.price}</p>
                                        </div>

                                        <Button variant="contained" className='button-tickets-kopen'>Tickets kopen</Button>
                                    </div>

                             </div>
                        )
                    })
                }


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

