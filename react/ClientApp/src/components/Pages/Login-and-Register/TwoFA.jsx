import React from "react";

function TwoFA(props){

    const randomNum = Math.floor(Math.random() * 1000000) + 1;

    const sendEmail = async () => {
        if (!props.email)
            {return}
        const data = {
            toEmail: props.email,
            toName: "",
            text: "Bedankt voor het gebruiken van 2FA.\nUw 2FA code is: - " + randomNum + " - \nDeel deze code met niemand!",
            subject: "2FA code voor Theater Laak"
        }
        
        const response = await fetch('https://localhost:7293/api/Email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    
    const check2FAcode = (event) => {
        if (event.target.value != "")
            {props.set2FAfilledIn(false)}
        else 
            {props.set2FAfilledIn(true)}
        
        if (event.target.value == randomNum)
            {props.set2FAisVerified(true)}
        else
            {props.set2FAisVerified(false)}
    }
    
    return(
        <>
            <button 
                style={{fontSize:"80%", margin:"10px"}}
                onClick={sendEmail}
            >Verstuur 2FA code naar email</button>
            <input onChange={check2FAcode}/>
        </>
)
}

export default TwoFA;