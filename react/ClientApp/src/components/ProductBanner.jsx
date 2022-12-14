import React from 'react';
import Image from '../pictures/seats.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "../styles/productBannerStyle.css";

function ProductBanner(props) {
    
    {{/*TODO deze gegevens moeten worden gefetched aan de hand van props.id */}}

    let showName = "naam van show";
    let category = "de categorie";
    let beginDate = "22-22-22";
    let endDate = "00-00-00";
    let price = "100"
   
    {{/*TODO de link moet worden aangepast */}}
    return (
        <Link to="/voorstellingInfo" className='bannerLink'>
            <button className='flex-container-horizontal bannerButton' style={{ width: "100%" }} >
                <div>
                    <img src={Image} className="bannerImg" alt="Foto van de voorstelling" />
                </div>

                <div className='flex-container-vertical'>
                    <div>{showName}</div>
                    <div>{category}</div>
                </div>

                <div className='flex-container-vertical'>
                    <div>{beginDate} - {endDate}</div>
                    <div>€{price}</div>
                </div>

            </button>
        </Link>
    )

}

export default ProductBanner;