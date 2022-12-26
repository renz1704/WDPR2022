import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Route, Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
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


            <Route path='/groepen' element={<GroepManagement />} />

            <Route path='/winkelmand' element={<Page_Winkelmand />} />
            <Route path='/betaling' element={<Page_Betaling />} />
            <Route path='/betaald' element={<Page_Betaald />} />

            {<Route path='/begunstigersportaal' element={<Page_Begunstigersportaal />} /> /*dit moet nog weggehaald/geautoriseerd worden, het begunstigersportaal moet alleen voor donateurs zijn*/}
            <Route path='/inloggen' element={<LoginPage />} />
            <Route path='/registreren' element={<RegisterPage />} />
            <App />
        </Router>
    </React.StrictMode>,
)
