import React, {useEffect, useState} from "react";
import config from "../../../config.json";

function TwoFA(props){

    const [randomNumber, setRandomNumber] = useState()
    
    useEffect(()=>{
        setRandomNumber(Math.floor(Math.random() * 1000000) + 1)
    }, [])

    const sendEmail = async () => {
        if (!props.email)
            {return}
        const data = {
            toEmail: props.email,
            toName: "",
            text: "Bedankt voor het gebruiken van 2FA.\nUw 2FA code is: - " + randomNumber + " - \nDeel deze code met niemand!",
            subject: "2FA code voor Theater Laak"
        }
        
        const response = await fetch(config.ApiUrl+'/api/Email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    
    const check2FAcode = (event) => {
        if (event.target.value === "")
        {
            props.set_2FAverifiedState("empty")
            console.log("empty")
        }
        else if (event.target.value === randomNumber.toString())
        {
            props.set_2FAverifiedState("correct")
            console.log("correct")
        }
        else
        {
            props.set_2FAverifiedState("incorrect")
            console.log("incorrect")
            
        }
    }
    
    return(
        <>
            <button
                type="button"
                style={{fontSize:"80%", margin:"10px"}}
                onClick={sendEmail}
            >Verstuur 2FA code naar email</button>
            <input onChange={check2FAcode}/>
        </>
)
}

export default TwoFA;