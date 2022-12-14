import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const processRegistration = (e) =>
    {
        const account = {email,username,password}
        //Method that sends JSON to API with the userInfo
        e.preventDefault();
        console.log("checkOfLoginKlopt, maak API call")
    }

    return(
        <div>
        <form className="loginForm"
            onSubmit={processRegistration}>
            <h1 className="Title">Registreren</h1>
            <p>Email</p>
            <input required type="email" onChange={(e) => setEmail(e.target.value)}></input>            
            <p>Gebruikersnaam</p>
            <input required type="name" className="input-name"onChange={(event) => setUsername(event.target.value)}></input>
            <p>Wachtwoord</p>
            <input required type="password" className="input-password" onChange={(event) => setPassword(event.target.value)}></input>
            <button type="onSubmit" disabled={username == "" || password == ""} className="login-btn-submit">Registreren</button>
            <p > <Link to='/inloggen' className="register-link">Heeft u al een account?</Link></p>
            </form>
        </div>
    )
}


export default Register;