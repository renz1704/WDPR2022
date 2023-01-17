import Header from '../Header';
import {Routes, Route, useNavigate} from 'react-router-dom';
import "../../styles/generalStyle.css";


function Page_AdminPortaal(){
    const navigate = useNavigate();



    return(
        <>
            <Header/>
            <body>
            <button id="button" onClick={() => {navigate('/zaalbeheer')}}>Zaalbeheer</button>
            <button id="button" onClick={() => {navigate('/donatieBeheer')}}>DonatieBeheer</button>
            </body>
        </>
    )
}

export default Page_AdminPortaal