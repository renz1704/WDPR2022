import axios from "axios"

const AuthenticationService = () => {
    
    const api_url = 'https://localhost:7293/api/user/'
    
    const login = (email, password) => {
        axios.post(api_url + 'login', {
            email,
            password
        })
        .then(res => {
            if (res.data.accesstoken)
            {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
        })
    }

    const logout = () => {
        localStorage.removeItem("token");
        console.log('uitgelogd')
    }

    const register = (email, password) => {
        axios.post(api_url + 'registreer', {
            email,
            password
        })
    }

    const currentUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }
}


export default AuthenticationService;