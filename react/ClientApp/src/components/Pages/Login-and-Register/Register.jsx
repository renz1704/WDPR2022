import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Header";

import { arrows_circle_down } from 'react-icons-kit/linea/arrows_circle_down'
import { basic_exclamation } from 'react-icons-kit/linea/basic_exclamation'
import { Icon } from 'react-icons-kit'
import ReCAPTCHA from 'react-google-recaptcha'

import UserService from '../../../services/UserService'
import TwoFA from "./TwoFA";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [_2FAenabled, set2FAenabled] = useState(false)
  const navigate = useNavigate();

  //Voor de passwordcheck:
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [charactersValidated, setCharactersValidated] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [_2FAverifiedState, set_2FAverifiedState] = useState()
  
  const processRegistration = (e) => {

    e.preventDefault();
    if (!isVerified) {
        alert("Druk alstublieft op 'Ik ben geen robot'. Mocht u de reCAPTCHA niet kunnen zien, herlaad dan de pagina.")
    } else if (_2FAverifiedState === "incorrect") {
      alert("De 2FA code is onjuist, vraag een nieuwe code op.")
      console.log(_2FAverifiedState)
    } else {
      
      set2FAenabled(true)
      
      fetch('https://localhost:7293/api/User/registreer', 
          {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            email: email, 
            password: password, 
            name: name, 
            lastname: lastname,
            _2FA: _2FAenabled})
        })
        .then((res) => {
          if (res.status !== 201) {
            console.log(res)
          }
          else {
            navigate("/inloggen");
          }
        })
    }

    if(!charactersValidated || !lowerValidated || !upperValidated || !specialValidated)
    {
      alert("Uw wachtwoord voldoet niet aan de eisen. Zorg ervoor dat uw wachtwoord minimaal 7 karakters lang is, een hoofdletter, een kleine letter en een speciaal karakter bevat.")
    }
  };

  const handleRecaptcha = (value) => {
    setIsVerified(value !== null);
  };

  const handleChange = (value) => {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const special = new RegExp('(?=.*[!@#$%^&*])');
    const characters = new RegExp('(?=.{7,})');

    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }

    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }

    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }

    if (characters.test(value)) {
      setCharactersValidated(true);
    } else {
      setCharactersValidated(false);
   
    }
  }

  return (
    <div>
      <Header />
      <div className="bg">
        <form className="registerForm" onSubmit={processRegistration}>
          <h1 className="Title">Registreren</h1>
          <p>Email</p>
          <input
            required="Email is verplicht."
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p>Wachtwoord</p>
          <input
            required
            type="password"
            className="input-password"
            // hier moet je de handleChange functie aanroepen met de setpassword
            onChange={(event) => { setPassword(event.target.value); handleChange(event.target.value) }}
          ></input>
            
            <p>Naam</p>
            <input
            required
            type="name"
            className="name"
            onChange={(event) => { setName(event.target.value);  }}
            ></input>

            <p>Achternaam</p>
            <input
            required
            type="lastname"
            className="name"
            onChange={(event) => { setLastname(event.target.value); }}
            ></input>

          
          <main className="tracker-box">
            <div className={upperValidated ? 'validated' : 'not-validated'}>
              {upperValidated ? (
                <span className="list-icon green">
                  <Icon icon={arrows_circle_down} size={20} />
                </span>
              ) : (<span className="list-icon">
                <Icon icon={basic_exclamation} size={20} />
              </span>
              )} U moet minimaal 1 hoofdletter gebruiken</div>
            <div className={lowerValidated ? 'validated' : 'not-validated'}>
              {lowerValidated ? (
                <span className="list-icon green">
                  <Icon icon={arrows_circle_down} size={20} />
                </span>
              ) : (<span className="list-icon">
                <Icon icon={basic_exclamation} size={20} />
              </span>
              )} U moet minimaal 1 kleine letter gebruiken</div>
            <div className={specialValidated ? 'validated' : 'not-validated'}>
              {specialValidated ? (
                <span className="list-icon green">
                  <Icon icon={arrows_circle_down} size={20} />
                </span>
              ) : (<span className="list-icon">
                <Icon icon={basic_exclamation} size={20} />
              </span>
              )} U moet minimaal 1 speciaal karakter gebruiken</div>
            <div className={charactersValidated ? 'validated' : 'not-validated'}>
              {charactersValidated ? (
                <span className="list-icon green">
                  <Icon icon={arrows_circle_down} size={20} />
                </span>
              ) : (<span className="list-icon">
                <Icon icon={basic_exclamation} size={20} />
              </span>
              )} U moet minimaal 7 karakters gebruiken</div>
            <ReCAPTCHA sitekey="6Ldmv-0jAAAAAOzZUjuueonJNyxg4RBpDiNgpbVO" onChange={handleRecaptcha} />
          </main>

          <p>Vraag een code op en vul hem</p>
          <p> hieronder in om 2FA aan te zetten.</p>
          <p>Laat het veld leeg als u geen gebruik wilt maken van 2FA.</p>
          <TwoFA email={email} set_2FAverifiedState={set_2FAverifiedState}/>
          
          <button
            disabled={email == "" || password == ""}
            className="login-btn-submit"
          >
            Registreren
          </button>
          <p>
            {" "}
            <Link to="/inloggen" className="register-link">
              Heeft u al een account?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;