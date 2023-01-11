import Header from '../Header';
import {Routes, Route, useNavigate} from 'react-router-dom';


function Page_AdminPortaal(){
    const navigate = useNavigate();



    return(
        <>
            <Header/>
            <body>
            <button onClick={() => {navigate('/zaalbeheer')}}>Zaalbeheer</button>
            </body>
        </>
    )
}

export default Page_AdminPortaal