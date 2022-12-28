import React from 'react';
import Seats from '../../pictures/seats.png';
import Header from '../Header';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Banner from '.../src/pictures/banner'

import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';

import "./Startpagina.css"

function Page_Startpagina() {

    const [genreOptions] = [];
    const [genres, SetGenres] = useState([]);
    const [datum, SetDatum] = useState([]);
    


    useEffect( () => {
        axios.get(`https://localhost:7293/api/Genre/genres
        `).then(response => SetGenres(response))

        genres.map( (genre) => { genreOptions.push(genre.genreName)})
    }, [] )

    return (
        <>
            <Header />

            <div className='banner'>
                <img src={Banner}></img>
                </div>


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



            <div className='main-content'>
                <div className='filter-content'>
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
                    renderInput={(params) => <TextField {...params} label="Genre" />}
                    />
                    

                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Maand" />}
                    />

                    <Button variant="contained">Zoeken</Button>


                </div>



            </div>
        </>)
}
    
export default Page_Startpagina;

