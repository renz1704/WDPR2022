import { useState } from "react";
import "./login-register.css";
import { Link , useNavigate} from "react-router-dom";
import Header from "../../Header";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
   
    fetch('https://localhost:7293/api/User/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'

        },
        body: JSON.stringify({email: email, password: password})
    })
    .then((res) => {
      if(res.status !== 200)
      {
          console.log(res)
      }
      else{
          navigate("/");
      }

  })
    const loginDetails = { email, password };
    console.log(loginDetails);
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
    </div>
    </div>
  );
};

export default Login;