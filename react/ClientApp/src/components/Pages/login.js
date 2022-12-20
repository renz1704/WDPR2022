import { useRef, useState, useEffect } from 'react';
import Login from './Login-and-Register/Page_Login_Visitors';

const login = () => {
     const userRef = useRef();
     const errRef = useRef();

     const [user, setUser] = useState('');
     const [pwd, setPwd] = useState('');
     const [errMsg, setErrMsg] = useState('');
     const [success, setSuccess] = useState(false);

     useEffect(() => {
        userRef.current.focus();
     }, [])

     useEffect(() => {
        setErrMsg('');
     }, [user, pwd])



     return (
        <section>
            <p ref= {errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
        </section>
     )

}

export default Login
