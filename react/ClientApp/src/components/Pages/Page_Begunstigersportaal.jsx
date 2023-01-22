import React from 'react';
import BegunstigersHeader from '../BegunstigersPortaalHeader';
import Footer from '../Footer';
import ProductBanner from '../ProductBanner';


function Page_Begunstigersportaal() {

    // Deze lijst moet worden aangepast naar de shows die nog niet voor het gewone publiek te boeken zijn.
    let showList = [1, 2, 3, 4]

    return (
        <div>
            <BegunstigersHeader />
            <h5>Hieronder staat een overzicht van de beschikbare voorstellingen die als donateur vervroegd te boeken zijn:</h5>
            <div className="flex-container-vertical">

                {showList.map((item) => {
                    return <ProductBanner id={item} />
                })}

            </div>
            <Footer/>
        </div>
    )
}

export default Page_Begunstigersportaal
