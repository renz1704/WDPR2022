import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';

//pagina imports
import Page_Startpagina from './components/Pages/Page_Startpagina';
import Page_Voorstellingen from './components/Pages/Page_Voorstellingen';
import Page_VoorstellingInfo from './components/Pages/Page_VoorstellingInfo';
import Page_StoelKeuze from "./components/Pages/Page_StoelKeuze";
import Page_ContactGegevens from './components/Pages/Page_ContactGegevens';
import Page_Toegankelijkheid from './components/Pages/Page_Toegankelijkheid';
import Page_Begunstigersportaal from './components/Pages/Page_Begunstigersportaal';

import Page_BezoekersPortaal from './components/Pages/BezoekersPortaal/Page_BezoekersPortaal';
import Page_Gegevens from './components/Pages/BezoekersPortaal/Page_Gegevens';
import Page_Tickets from './components/Pages/BezoekersPortaal/Page_Tickets';
import Page_Doneren from './components/Pages/BezoekersPortaal/Page_Doneren';
import Page_Gedoneerd from './components/Pages/BezoekersPortaal/Page_Gedoneerd';

import Page_Winkelmand from "./components/Pages/Page_Winkelmand";
import Page_Betaling from "./components/Pages/Page_Betaling";
import Page_Betaald from "./components/Pages/Page_Betaald";
import Page_ZaalMaken from "./components/Pages/Page_ZaalMaken";
import Page_AdminPortaal from "./components/Pages/Page_AdminPortaal";
import Page_Zaalbeheer from "./components/Pages/Page_Zaalbeheer";
import Page_DonatieBeheer from "./components/Pages/Page_DonatieBeheer";

import LoginPage from './components/Pages/Login-and-Register/Login';
import RegisterPage from './components/Pages/Login-and-Register/Register';


import GroepManagement from './components/Pages/Page_GroepManagement';
import Page_UploadSchedule from './components/Pages/Page_UploadSchedule';
import Page_AccountGegevens from './components/Pages/BezoekersPortaal/Page_AccountGegevens';
import Page_Gastlijsten from "./components/Pages/Page_Gastlijsten";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>

    <Router>

      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, requireAuth, ...rest } = route;
          return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
        })}
        <Route path='/' element={<Page_Startpagina />} />
        <Route path='/toegankelijkheid' element={<Page_Toegankelijkheid />} />
        <Route path='/contactgegevens' element={<Page_ContactGegevens />} />
        <Route path='/voorstellingen' element={<Page_Voorstellingen />} />
        <Route path='/voorstellingInfo' element={<Page_VoorstellingInfo />} />
        <Route path='/stoelKeuze' element={<Page_StoelKeuze />} />

        <Route path='/winkelmand' element={<Page_Winkelmand />} />
        <Route path='/betaling' element={<Page_Betaling />} />
        <Route path='/betaald' element={<Page_Betaald />} />
        <Route path='/zaalmaken' element={<Page_ZaalMaken />} />


        <Route path='/admin' element={<Page_AdminPortaal />} />
        <Route path='/zaalbeheer' element={<Page_Zaalbeheer />} />
        <Route path='/donatieBeheer' element={<Page_DonatieBeheer />} />
        <Route path='/gastlijsten' element={<Page_Gastlijsten />} />

        <Route path='/groepen' element={<GroepManagement />} />

        <Route path='/winkelmand' element={<Page_Winkelmand />} />
        <Route path='/betaling' element={<Page_Betaling />} />
        <Route path='/betaald' element={<Page_Betaald />} />

        {/* Bezoekersportaal: */}
        <Route path='/bezoekersportaal' element={<Page_BezoekersPortaal />} />
        <Route path='/gegevens' element={<Page_Gegevens />} />
        <Route path='/tickets' element={<Page_Tickets />} />
        <Route path='/doneren' element={<Page_Doneren />} />
        <Route path='/gedoneerd' element={<Page_Gedoneerd />} />

        {<Route path='/begunstigersportaal' element={<Page_Begunstigersportaal />} /> /*dit moet nog weggehaald/geautoriseerd worden, het begunstigersportaal moet alleen voor donateurs zijn*/}
        <Route path='/inloggen' element={<LoginPage/>}/>
        <Route path='/registreren' element={<RegisterPage/>}/>
        <Route path='/programmeringUploaden' element= {<Page_UploadSchedule></Page_UploadSchedule>}/>
        <Route path='/accountgegevensWijzigen' element= {<Page_AccountGegevens></Page_AccountGegevens>}/>
    

      </Routes>

    </Router>

  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();

