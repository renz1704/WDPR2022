import React, {useState} from "react";
import "./login-register.css";
import {Link, useNavigate} from "react-router-dom";
import Header from "../../Header";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha'
import AuthenticationService from "../../../services/AuthenticationService";
import {Button} from "@mui/material";
import jwt from 'jwt-decode'
import UserService from "../../../services/UserService";
import TwoFA from "./TwoFA";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [_2FAverifiedState, set_2FAverifiedState] = useState()
    const navigate = useNavigate();
    let has2FA;


    const getHas2FA = async () => {
        if (!email) {
            return;
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const response = await fetch('https://localhost:7293/api/User/has2FA/'+encodeURIComponent(email), {headers});

        if (response.ok) {
            has2FA = await response.json();
        } else {
            console.error(`Error ${response.status}: ${response.statusText}`);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        await getHas2FA()
        
        console.log("has2fa " + has2FA)
        
        if (has2FA === true) {
            if (_2FAverifiedState !== "correct") {
                alert("2FA code is fout.")
                return
            }
        }

        if (isVerified) {
            UserService.login(email, password)
            if (UserService.getUser() != null) {
                navigate("/")
            }
        } else {
            alert("Druk alstublieft op 'Ik ben geen robot'. Mocht u de reCAPTCHA niet kunnen zien, herlaad dan de pagina.")
        }
    }




    const handleRecaptcha = (value) => {
        setIsVerified(value !== null);
    };


    return (
        <div>
            <Header/>
            <div className="bg">
                <form className="loginForm" onSubmit={handleSubmit}>

                    <h1>Login</h1>
                    <p>Email</p>
                    <input
                        required
                        type="name"
                        className="input-name"
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                    <p>Wachtwoord</p>
                    <input
                        required
                        type="password"
                        className="input-password"
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <ReCAPTCHA className="recap" sitekey="6Ldmv-0jAAAAAOzZUjuueonJNyxg4RBpDiNgpbVO"
                               onChange={handleRecaptcha}/>

                    <TwoFA email={email} set_2FAverifiedState={set_2FAverifiedState}/>

                    <button
                        type="onSubmit"
                        disabled={email == "" || password == ""}
                        className="login-btn-submit"
                    >
                        Inloggen
                    </button>
                    <p>
                        {" "}
                        <Link to="/registreren" className="register-link">
                            Heeft u nog geen account?
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;