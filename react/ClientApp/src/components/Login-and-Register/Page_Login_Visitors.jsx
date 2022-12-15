import { useState } from "react";
import "./login-register.css"
import { Link, useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const processLogin = (e) =>
    {
        const loginDetails = {username, password}
        e.preventDefault();
        //Check if given details are valid
        //If valid navigate to the dashboard
        //Else do nothing
        if(true){
            navigate('/dashboard', {state: username});
        }
    
    }

    return(
        
            <form className="loginForm"
            onSubmit={processLogin}>
                <h1>Login</h1>
            <p>Gebruikersnaam</p>
            <input required type="name" className="input-name"onChange={(event) => setUsername(event.target.value)}></input>
            <p>Wachtwoord</p>
            <input required type="password" className="input-password" onChange={(event) => setPassword(event.target.value)}></input>
            <button type="onSubmit" disabled={username == "" || password == ""} className="login-btn-submit">Inloggen</button>
            <p > <Link to='/registreren' className="register-link">Heeft u nog geen account?</Link></p>
            </form>
        
    )


}

export default Login;