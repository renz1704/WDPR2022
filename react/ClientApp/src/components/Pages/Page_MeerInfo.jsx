//Een show prop wordt meegegeven aan deze component  (props.show)

import { shouldForwardProp } from "@mui/styled-engine";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import '../../styles/ShowInfo.css'
import { Button } from "@mui/material";
import ResponsiveAppBar from "../Header";
import Footer from "../Footer";

const Page_MeerInfo = () => {

    const location = useLocation();
    const show = location.state.prop;

    const navigate = useNavigate();


    const handleClick = () => {
        navigate('/showcalendar', {state: {show}})
    }
    return(
        <>
        <ResponsiveAppBar></ResponsiveAppBar>
            <div className="more-info-content">
                <div className="show-content-title">
                    <h1>{show.name}</h1>
                </div>

                <img src={show.imageUrl}></img>
                <p className="show-content-about"> Waar gaat {show.name} over: </p>
                <p className="show-content-description">{show.description}</p>
                <Button variant="contained" style={{minWidth: '150px', minHeight: '60px'}} onClick={handleClick}>Koop hier uw tickets</Button>
                
            </div>
            <Footer></Footer>
        </>
    )
}

export default Page_MeerInfo;