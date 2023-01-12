import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';

function Page_Doneren() {

    return (
        <>
            <BezoekersPortaalHeader />
            <div>
                Wilt u Theater Laak steunen door ons te doneren?
                Vanaf 1000 euro aan donaties krijgt u toegang tot ons "Begunstigersportaal". 
                <p>
                Hier kunt u voorstellingen zien en "pre orderen" nog voordat ze uitkomen.
                </p>
                <p>
                    De donaties worden gedaan via het bekende platform "IkDoneer".
                </p>
                <button>Doneren</button>
            </div>
            <div>
                Wilt u Theater Laak toegang geven tot uw donaties bij IkDoneer? Wij kunnen u bij het juiste bedrag dan toegang geven tot ons begunstigersportaal.
            </div>
            <a target="_blank" href="https://ikdoneer.azurewebsites.net//Toegang?url=https://localhost:44419/api/donation/addTokenUser%3A%2F%2F%2F">Druk hier om toestemming te verlenen.</a>
        </>
    )

}
export default Page_Doneren