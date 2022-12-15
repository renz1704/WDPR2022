import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "../styles/generalStyle.css";
import "../styles/headerStyle.css";

import Logo from '../pictures/logo.png';

// Deze header zou eventueel als we autorisatie hebben weggehaald kunnen worden, dan kunnen we de normale header aanpassen dat alleen donateurs bepaalde knoppen zien.

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
          </ul>
        </div>
      </div>
    </header>
  );
}

export default BegunstigersPortaalHeader;