import React from 'react';
import Image from '../pictures/seats.png';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import "../styles/productBannerStyle.css";

function ProductBanner(props) {

    { {/*TODO deze gegevens moeten worden gefetched aan de hand van props.id */ } }

    const performance = props.performance;
    const navigate = useNavigate();


    { {/*TODO de link moet worden aangepast */ } }
    return (
        <div className='bannerLink' onClick={() => navigate('/stoelKeuze', {state: {performance}})}>
            <button className='flex-container-horizontal bannerButton'  >
                <div>
                    <img src={Image} className="bannerImg" alt="Foto van de voorstelling" />
                </div>

                <div className='flex-container-vertical left'>
                    <div>{performance.show.name}</div>
                    <div>{performance.show.genres}</div>
                </div>

                <div className='flex-container-vertical right'>
                    <div>Aanvang: {performance.startTime}</div>
                    <div>€{performance.price}</div>
                </div>

            </button>
        </div>
    )

}

export default ProductBanner;