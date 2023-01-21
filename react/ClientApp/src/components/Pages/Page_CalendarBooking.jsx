import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "../Header";

function Page_CalenderBooking() {
    const location = useLocation();
    const show = location.state.show;
    
    return(
        <>
        <ResponsiveAppBar></ResponsiveAppBar>
            <div className="booking-content">
                <h1 className="booking-content-title">Boek hier uw tickets voor {show.name}</h1>

            </div>

        </>
    )
}

export default Page_CalenderBooking;