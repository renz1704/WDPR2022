import { useState } from "react";
import "./login-register.css";
import { Link , useNavigate} from "react-router-dom";
import Header from "../../Header";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isVerified){
      alert("Druk alstublieft op 'Ik ben geen robot'. Mocht u de reCAPTCHA niet kunnen zien, herlaad dan de pagina.") 
    }else{
     const loginPayload = {
       email: email,
       password: password
     }
     return axios.post('https://localhost:7293/api/User/login', { email, password })
     .then(res => {

      if(res.status !== 200)
      {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;    
       }
       else{
           navigate("/");
       }
     });
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
     <ReCAPTCHA sitekey="6Ldmv-0jAAAAAOzZUjuueonJNyxg4RBpDiNgpbVO" onChange={handleRecaptcha} />
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