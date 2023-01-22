import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../Header";
import ProductBanner from "../ProductBanner";

function Page_CalenderBooking() {
    const location = useLocation();
    const show = location.state.show;
    const [perfomances, setPerformances] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7293/api/Show/getPerformances?id=${show.id}`)
        .then(res => setPerformances(res.data))
    },[])
    
    return(
        <>
        <ResponsiveAppBar></ResponsiveAppBar>
            <div className="booking-content">
                <h1 className="booking-content-title">Boek hier uw tickets voor {show.name}</h1>
                
                {
                    perfomances.map( performance => {
                        return(
                            <ProductBanner performance={performance}></ProductBanner>
                        )
                        
                    })
                }
                


            </div>

        </>
    )
}

export default Page_CalenderBooking;