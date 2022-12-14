import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//pagina imports
import Header from './components/Header'
import Page_Startpagina from './components/Page_Startpagina';
import Page_Voorstellingen from './components/Page_Voorstellingen';
import Page_VoorstellingInfo from './components/Page_VoorstellingInfo';
import Page_StoelKeuze from "./components/Page_StoelKeuze";


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    
    <Router>
      
      <Header/>

      <Routes>
        <Route path='/' element={<Page_Startpagina/>}/>
        <Route path='/toegankelijkheid' element={<p/>}/>
        <Route path='/contactgegevens' element={<p/>}/>
        <Route path='/voorstellingen' element={<Page_Voorstellingen/>}/>
        <Route path='/voorstellingInfo' element={<Page_VoorstellingInfo/>}/>
        <Route path='/stoelKeuze' element={<Page_StoelKeuze/>}/>
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
