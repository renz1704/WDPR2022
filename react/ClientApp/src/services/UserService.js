import axios from "axios";
import jwt from "jwt-decode";


const API_URL = "https://localhost:7293/api/User/";

class UserService {
    
    register(email, password) {
        axios.post(API_URL + "registreer", {
            email: email,
            password : password
        }).then((res) => {
            if(res.status !== 201)
            {
                console.log(res)
            }
            else{
                console.log('Error has been returned')
            }
        }
        )
    }
    
    login (email, password) {
 
    }

    logout() {
        localStorage.removeItem("user")
    }

    getUser() {
        const user = jwt(localStorage.getItem("user"))
        console.log(user.email) 
        jwt("user")
    }
}

export default new UserService();