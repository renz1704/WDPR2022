import React from 'react';
import Header from '../Header';
import "../../styles/ContactgegevensStyle.css"
import picture from "../../pictures/TheaterContactPagina.jpg"


function Page_ContactGegevens() {

    return (
        <div className='f'>
            <Header />
            <div className="full">

                <div className="picture">
                    <img className="image" src={picture} alt="" />
                </div>
                <div class="mt-50">
                    <div class="text">
                        <h2>Contactgegevens</h2>
                        <p>
                            Wilt u contact opnemen met theater Laak?<br />
                            U kunt ons bereiken via onderstaande gegevens:
                        </p>
                        <h4>Email</h4>
                        <p>
                            <b>&#x2022;info@theaterlaak.nl</b><br />
                            Wij streven ernaar uw email binnen 2 werkdagen te beantwoorden.
                        </p>
                        <h4>Telefoon</h4>
                        <p>
                            <b>&#x2022;(070) 1234567</b>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )

}
export default Page_ContactGegevens