import { useState } from "react";
import "./login-register.css";
import { Link , useNavigate} from "react-router-dom";
import Header from "../../Header";
import axios from "axios";
import AuthenticationService from "../../../services/AuthenticationService";
import { Button } from "@mui/material";
import jwt from 'jwt-decode'
import UserService from "../../../services/UserService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.login(email, password)
    
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

    <p>Uitloggen</p>
    <p></p>
    <Button onClick={UserService.logout}>Uitloggen</Button>
    </div>
    </div>
  );
};

export default Login;