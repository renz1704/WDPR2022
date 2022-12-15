import { useLocation } from "react-router-dom";
import Login from "../Login-and-Register/Page_Login_Visitors";
import './Dashboard.css'
import { Link } from "react-router-dom";

const Dashboard= () => {
    const loc = useLocation();

    return (
        <div class="dashboard-content">
            <div className="side-bar">
            <p><Link to={""} class="Link">Home</Link></p>
                <p><Link to={""} class="Link">Persoonlijke informatie</Link></p>
                <p><Link to={""} class="Link">Gegevens en privacy</Link></p>
                <p><Link to={""} class="Link">Beveiliging</Link></p>
                <p><Link to={""} class="Link">Betalingen</Link></p>
            </div>

            <div className="main-content">
                <h1>Dashboard</h1>
                <h2>Welkom: {loc.state}</h2>    
            </div>
        </div>
    )
}

export default Dashboard;