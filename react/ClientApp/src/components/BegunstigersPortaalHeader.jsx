import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "../styles/generalStyle.css";
import "../styles/headerStyle.css";

import Button from "@mui/material/Button";
import Logo from '../pictures/logo.png';
import UserService from "../services/UserService";

// Deze header zou eventueel als we autorisatie hebben weggehaald kunnen worden, dan kunnen we de normale header aanpassen dat alleen donateurs bepaalde knoppen zien.

const handleLogout = () => {
  if (window.confirm("Weet je zeker dat je wilt uitloggen?")) {
    UserService.logout();
    window.location.reload();
  }
};


function BegunstigersPortaalHeader(props) {
  return (
    <header>
      <div className="flex-container-horizontal">
        <div>
          <img src={Logo} alt="Theater Laak" />
        </div>

        <div>
          <ul>
            <li><a><Link to="/">Startpagina</Link></a></li>
            <li><a><Link to="/begunstigersportaal">Begunstigersportaal</Link></a></li>
            <li><a><Link to="/planning">Planning</Link></a></li>
            {UserService.isLoggedIn() ? (
              <li className="User">
                <Button className="logout" variant='contained' onClick={handleLogout}>Uitloggen</Button>
              </li>
            ) : ("")}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default BegunstigersPortaalHeader;