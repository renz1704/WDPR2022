//Een show prop wordt meegegeven aan deze component  (props.show)

import { shouldForwardProp } from "@mui/styled-engine";
import { Button } from "bootstrap";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../BezoekersPortaalHeader";

import '../../styles/ShowInfo.css'

const Page_MeerInfo = () => {

    const location = useLocation();
    const show = location.state.prop;
    
    useEffect( () => {
        console.log(show)
    },[])

    const handleClick = () => {

    }
    return(
        <>
        <Header></Header>
            <div className="more-info-content">
                <div className="show-content-title">
                    <h1>{show.name}</h1>
                </div>

                <img src={show.imageUrl}></img>
                <p> Waar gaat {show.name} over: </p>
                <p className="show-content-description">{show.description}</p>
                <h1>Koop hier uw tickets</h1>
            </div>
        </>
    )
}

export default Page_MeerInfo;