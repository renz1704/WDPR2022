import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';

//pagina imports
import Header from './components/Header'
import Page_Startpagina from './components/Pages/Page_Startpagina';
import Page_Voorstellingen from './components/Pages/Page_Voorstellingen';
import Page_VoorstellingInfo from './components/Pages/Page_VoorstellingInfo';
import Page_StoelKeuze from "./components/Pages/Page_StoelKeuze";
import Page_ContactGegevens from './components/Pages/Page_ContactGegevens';
import Page_Toegankelijkheid from './components/Pages/Page_Toegankelijkheid';
import Page_Begunstigersportaal from './components/Pages/Page_Begunstigersportaal';


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
          <Route path='/voorstellingInfo' element={<Page_VoorstellingInfo/>}/>
          <Route path='/stoelKeuze' element={<Page_StoelKeuze/>}/>
          {<Route path='/begunstigersportaal' element={<Page_Begunstigersportaal />} /> /*dit moet nog weggehaald/geautoriseerd worden, het begunstigersportaal moet alleen voor donateurs zijn*/}
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