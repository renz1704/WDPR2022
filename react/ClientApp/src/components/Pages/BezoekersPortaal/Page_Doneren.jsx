import React, { useState, useEffect } from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import "../../../styles/donerenStyle.css";
import "../../../styles/generalStyle.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { URLSearchParams } from 'url';
import queryString from 'query-string';




function Page_Doneren() {

    const [token, setToken] = useState("");

    const [hoeveelheid, setHoeveelheid] = useState();
    const [tekst, setTekst] = useState();

    const [hideAfterToken, setHideAfterToken] = useState(false);

    const searchParams = { tokenUser: sessionStorage.getItem("user") };
    const searchString = queryString.stringify(searchParams);

    const link = `https://ikdoneer.azurewebsites.net/Toegang?url=https://localhost:7293/api/Donation/addtokenuser?${searchString}`;

    const navigate = useNavigate();

    const email = UserService.getUser().email;

    const configGetToken = {
        params: {
            email: email
        }
    };


       //Deze methode doet eerst de token opvragen van de user en doet dan de donatie bij ikdoneer en heeft de JWT token van de gebruiker in de bearer.
    const donatieDoen = async () => {
        
            const response = await axios.get(
                'https://localhost:7293/api/Donation/getDonationTokenUser',
                configGetToken
            );
            setToken(response.data);
            console.log("line 86" + token + " andere token " + response.data);


         await fetch("https://ikdoneer.azurewebsites.net/api/donatie", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + response.data
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify({ "Doel": + 58, "Hoeveelheid": hoeveelheid, "Tekst": tekst}) 
            }).then((data) => data.json())
            .then((response) => { console.log(response)})

            navigate("/gedoneerd")
    }



useEffect(() => {
            if (UserService.getUser().donationToken == null) {
                setHideAfterToken(false);

            } else {
                setHideAfterToken(true);

            }

        }, []);

        return (
            <>
                <BezoekersPortaalHeader />
                <div class="everything">
                    Wilt u Theater Laak steunen door ons te doneren?
                    Vanaf 1000 euro aan donaties krijgt u toegang tot ons "Begunstigersportaal".
                    <p>
                        Hier kunt u voorstellingen zien en "pre orderen" nog voordat ze uitkomen.
                    </p>
                    <div>
                        <form className="donateForm" onSubmit={(e) => e.preventDefault()}>
                            <label id="label">Bedrag: </label>
                            <input
                                required="Hoeveelheid is verplicht."
                                type="hoeveelheid"
                                onChange={(e) => setHoeveelheid(e.target.value)}
                            ></input>
                            <label id="label">Tekst:  </label>
                            <input
                                required="Tekst is verplicht."
                                type="tekst"
                                onChange={(e) => setTekst(e.target.value)}
                            ></input>
                            <button
                                type="onSubmit"
                                disabled={hoeveelheid && tekst == ""}
                                className="doneerButton"
                                id="button"
                                onClick={donatieDoen}
                            >
                                Doneer aan Theater Laak!
                            </button>
                        </form>


                    </div>
                    <div className={`AfterToken ${hideAfterToken ? "hide-AfterToken" : ""}`}>
                        <hr></hr>
                        <p>
                            De donaties worden gedaan via het bekende platform "IkDoneer". U zult hiervoor eerst toestemming moeten geven met de onderstaande link:
                        </p>
                        <div>
                            Wilt u Theater Laak toegang geven tot uw donaties bij IkDoneer? Wij kunnen u bij het juiste bedrag dan toegang geven tot ons begunstigersportaal.
                        </div>

                        <a target="_blank" href={link}>Druk hier om toestemming te verlenen.</a>
                    </div>
                </div>
            </>


        )

    }
    export default Page_Doneren