import React, {useState, useEffect } from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import "../../../styles/generalStyle.css";

function Page_Doneren() {

    const [email, setEmail] = useState("");
    const [hideAfterEmail, setHideAfterEmail] = useState(true);

    const donerenKnop = () => {

    }

    useEffect(  () => {
        
    // HIER MOET DE FETCH naar de userEmailExists in de donationcontroller, eerst checken of de api werkt.
        // dan kan hier komen als de email er is, kan het doneren paneel te voorschijn komen.
    }, []);


    const permissionButton = () => {

        
        setHideAfterEmail(false);
        console.log(email);
        
    }




    return (
        <>
            <BezoekersPortaalHeader />
            <div>
                Wilt u Theater Laak steunen door ons te doneren?
                Vanaf 1000 euro aan donaties krijgt u toegang tot ons "Begunstigersportaal".
                <p>
                    Hier kunt u voorstellingen zien en "pre orderen" nog voordat ze uitkomen.
                </p>
                <div></div>
                <p>
                    De donaties worden gedaan via het bekende platform "IkDoneer". U zal hiervoor eerst toestemming moeten geven met de onderstaande link:
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
                        onClick={permissionButton}
                    >
                        Email invoeren
                    </button>
                </form>
                <div className={`AfterEmail ${hideAfterEmail ? "hide-AfterEmail" : ""}`}>



                    <button>Doneren</button>

                    <div>
                        <hr></hr>
                        <div>
                            Wilt u Theater Laak toegang geven tot uw donaties bij IkDoneer? Wij kunnen u bij het juiste bedrag dan toegang geven tot ons begunstigersportaal.
                        </div>

                        <a target="_blank" href="https://ikdoneer.azurewebsites.net//Toegang?url=https://localhost:7293/api/Donation/addtokenuser" onClick={permissionButton}>Druk hier om toestemming te verlenen.</a>
                    </div>
                </div>
            </div>
        </>


    )

}
export default Page_Doneren