import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/generalStyle.css'

function Page_Toegankelijkheid() {

    return (
        <>
            <Header />
            <div style={{marginTop:'100px'}}>
                <h4 class="everything">Toegankelijkheid binnen Theater Laak</h4>
                <p class="everything">
                    Toegankelijkheid is voor Theater Laak een breed begrip. Het begint al met onze website, wij hebben er voor gezorgd dat de website er zo duidelijk en toegankelijk mogelijk bij staat en te gebruiken is.
                    <br></br>
                    Zo kunt u bijvoorbeeld bij de stoelkeuze bij het bestellen ook kiezen welke rolstoelplek u zou willen zitten. Deze kunt u duidelijk zien door het blauwe randje om de stoel heen.
                    <br></br>
                    In het Theater zelf is er ook veel aan toegankelijkheid gedacht, zo hebben wij genoeg invalide toiletten, zijn er brede gangen en is er een lift aanwezig.
                    <br></br>
                    <br></br>
                    Heeft u nog andere vragen en/of opmerkingen over de toegankelijkheid of andere zaken, neem dan gerust contact op via: 070-12345678.
                </p>
            </div>
            <Footer />
        </>
    )

}
export default Page_Toegankelijkheid