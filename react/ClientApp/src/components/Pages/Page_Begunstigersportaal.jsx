import React from 'react';
HEAD:react/ClientApp/src/components/Pages/Page_Begunstigersportaal.jsx
import BegunstigersHeader from '../BegunstigersPortaalHeader';


function Page_Begunstigersportaal() {

    // Deze lijst moet worden aangepast naar de shows die nog niet voor het gewone publiek te boeken zijn.
    let showList = [1,2,3,4]
    
    return (
        <div>
            <BegunstigersHeader />
            <h5>Hieronder staat een overzicht van de beschikbare voorstellingen die als donateur vervroegd te boeken zijn:</h5>
            <div className="flex-container-vertical">
                
                {showList.map((item) => {
                    return <ProductBanner id={item} />
                })}

            </div>
        </div>
    )
}

export default Page_Begunstigersportaal
