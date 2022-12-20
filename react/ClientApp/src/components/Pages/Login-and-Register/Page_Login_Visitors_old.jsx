import { useState } from "react";
import "./login-register.css";
import { Link } from "react-router-dom";
import Header from '../../Header';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const processLogin = (e) => {
  //     e.preventDefault();
  //     const loginDetails = { username, password };
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = { username, password };
    console.log(loginDetails);
  };

  return (
    <>
      <Header />
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Gebruikersnaam</p>
        <input
          required
          type="name"
          className="input-name"
          onChange={(event) => setUsername(event.target.value)}
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
          disabled={username == "" || password == ""}
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
    </>
  );
};

export default Login;
