import React, { useState, useEffect } from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import "../../../styles/donerenStyle.css";
import "../../../styles/generalStyle.css";
import axios from 'axios';

function Page_Doneren() {

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [hideAfterEmail, setHideAfterEmail] = useState(true);
    const [hideAfterToken, setHideAfterToken] = useState(false);

    const donerenKnop = () => {

    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    const bodyParameters = {
       key: "value"
    };
    

    //Deze methode doet de donatie aan ikdoneer en heeft de JWT token van de gebruiker in de bearer.
    const donatieDoen = async () => {
        try {
           await axios.post( 
                'https://ikdoneer.azurewebsites.net/api/donatie',
                bodyParameters,
                config
              ).then(console.log).catch(console.log);
            // await axios.post('https://ikdoneer.azurewebsites.net/api/donatie');
        } catch (error) {
            console.error(error);
        }
        // const response = fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
        //     method: 'POST',
        //     //body: Hier komt de jwt token via de bearer.
        //     headers: { 'Content-Type': 'application/json' },
        // });
    }
    // Deze methode checkt of de gebruiker met deze email al een token heeft.
    // const checkDonationToken = async (email) => {
    //     try {
    //         const { data } = await axios.post('https://localhost:7293/api/Donation/tokenExists',  {email: email} );
    //         const hasDonationToken = data.hasDonationToken;
    //         setHideAfterToken(hasDonationToken);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const getDonationToken = async (email) => {
        
    }
    const checkDonationToken = async (email) => {
        const response = await fetch('https://localhost:7293/api/Donation/tokenExists?emailuser=' + email, {
            method: 'POST',
            headers: { 
                'Accept' : 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ emailuser: email }),
        });
        const data = await response.json();
        const hasDonationToken = data.hasDonationToken;
        setHideAfterToken(hasDonationToken);
    }

    //deze methode voegt de email van de user toe aan de email variable in de donationcontroller
    // const addEmailToUser = async () => {
    //     try {
    //         await axios.post('https://localhost:7293/api/Donation/userEmail', {email: email} );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    
    const addEmailToUser = async (email) => {
        const response = await fetch('https://localhost:7293/api/Donation/userEmail?emailuser=' + email, {
            method: 'POST',
            headers: { 
                'Accept' : 'application/json',
                'Content-Type': 'application/json' },
                body: JSON.stringify({ emailuser: email }),
        });
    }
    

    const permissionButton = () => {
        addEmailToUser(email);
        setHideAfterEmail(false);
        checkDonationToken(email);
        console.log(email);
    }
    
    
    useEffect(() => {
        if(email) checkDonationToken(email);
    }, [email]);
    
    return (
        <>
            <BezoekersPortaalHeader />
            <div class= "everything">
                Wilt u Theater Laak steunen door ons te doneren?
                Vanaf 1000 euro aan donaties krijgt u toegang tot ons "Begunstigersportaal".
                <p>
                    Hier kunt u voorstellingen zien en "pre orderen" nog voordat ze uitkomen.

                    Vult u alstublieft uw email-adres in om in het donatieportaal te komen:
                </p>
                

                <form className="permissionForm" onSubmit={(e) => e.preventDefault()}>
                    <label>Vul hier uw email-adres in: </label>
                    <input
                        required="Email is verplicht."
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <button
                        type="onSubmit"
                        disabled={email == ""}
                        className="permission"
                        id="button"
                        onClick={permissionButton}
                    >
                        Email invoeren
                    </button>
                </form>
                <div className={`AfterEmail ${hideAfterEmail ? "hide-AfterEmail" : ""}`}>
            
                    <button id="button">Doneren</button>

                    <div className={`AfterToken ${hideAfterToken ? "hide-AfterToken" : ""}`}>
                        <hr></hr>
                        <p>
                            De donaties worden gedaan via het bekende platform "IkDoneer". U zal hiervoor eerst toestemming moeten geven met de onderstaande link:
                        </p>
                        <div>
                            Wilt u Theater Laak toegang geven tot uw donaties bij IkDoneer? Wij kunnen u bij het juiste bedrag dan toegang geven tot ons begunstigersportaal.
                        </div>

                        <a target="_blank" href="https://ikdoneer.azurewebsites.net/Toegang?url=https://localhost:7293/api/Donation/addtokenuser" onClick={permissionButton}>Druk hier om toestemming te verlenen.</a>
                    </div>
                </div>
            </div>
        </>


    )

}
export default Page_Doneren