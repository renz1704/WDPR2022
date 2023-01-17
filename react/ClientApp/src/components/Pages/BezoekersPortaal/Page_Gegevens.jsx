import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import { useEffect, useState } from 'react';
import axios from "axios"
import UserService from '../../../services/UserService';
function Page_Gegevens() {
    const [email, SetEmail] = useState();
    const [firstname, SetFirstname] = useState();
    const [lastname, SetLastname] = useState();
    

    useEffect( () => {
        console.log(firstname)
    }, [firstname]) 

    const handleSubmit = () => {
        
        axios.put("https://localhost:7293/updateAccount", 
        {
            id : UserService.getUser().id,
            email : email,
            firstname : firstname,
            lastname : lastname
        }).then(res => console.log(res.data));
        
    }
    
    return(
        <>
<BezoekersPortaalHeader></BezoekersPortaalHeader>

<form className="updateAccountForm" onSubmit={handleSubmit}>
      
      <h1>Gegevens wijzigen</h1>
      
      <p>Email</p>
      <input
        type="email"
        onChange={(event) => SetEmail(event.target.value)}
      ></input>
      
      <p>Naam</p>
      <input
       type={"name"}
        onChange={(event) => SetFirstname(event.target.value)}
      ></input>


        <p>Achternaam</p>
        <input

            type={"name"}
            onChange={(event) => SetLastname(event.target.value)}
            ></input>
     
      <button
        type="onSubmit"
        className="btn-submit"
      >
        Gegevens wijzigen
      </button>

      
    </form>

        


        
        </>
    )

}
export default Page_Gegevens