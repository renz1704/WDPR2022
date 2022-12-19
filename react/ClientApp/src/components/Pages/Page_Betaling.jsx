import React, {useState} from "react";
import PopUp from "../PopUp";
import {Routes, Route, useNavigate} from 'react-router-dom';


function Page_Betaling(){

    const [showPopUp, setShowPopUp] = useState(false);
    const popUpMessage = "Betaling gefaald probeer het opnieuw."
    const navigate = useNavigate();

    const paymentAccepted = () => {
        navigate('/betaald')
    }

    return(
        <>{showPopUp && (<PopUp message={popUpMessage} onClose={() => setShowPopUp(false)}/>)}
            <p>
                api van school
                <button onClick={paymentAccepted}>betaling gelukt</button>
                <button onClick={() => setShowPopUp(true)}>betaling mislukt</button>
            </p>
        </>
    )
}

export default Page_Betaling;