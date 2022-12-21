import React, { useState, useEffect } from 'react'  
  
function Dashboard() {  
    const [user, setuser] = useState({ Email: '', Password: '' });  
    useEffect(() => {  
        var a = localStorage.getItem('myData');  
        var b = JSON.parse(a);  
        console.log(b.Name);  
        setuser(b)  
        console.log(user.Name)  
  
    }, []);  
    return (  
        <>  
            <div class="col-sm-12 btn btn-primary">  
                Dashboard  
        </div>  
            <h1>Welcome :{user.Name}</h1>  
        </>  
    )  
}  
  
export default Dashboard  