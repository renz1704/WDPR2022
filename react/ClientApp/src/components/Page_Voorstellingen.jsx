import React from 'react';
import DropdownMenu from './DropdownMenu';
import ProductBanner from './ProductBanner';


function Page_Voorstellingen() {

    {/*deze lijsten zijn de opties die in de dropdownmenus worden getoonds*/ }
    const sortOptions = ["Datum", "Kosten", "Populariteit"]
    const filterOptions = ["geen", "idee"]
    
    {/*deze lijst moet gevuld worden met de ids van de shows die de mensen die geen donateur zijn
    	mogen zien, showList.map maakt een productbanner voor elke show */}
    let showList = [1,2,3]

    return (
        <body>
            <div className="flex-container-horizontal">
                <DropdownMenu type="Sorteer" options={sortOptions} />
                <DropdownMenu type="Filter" options={filterOptions} />
                <input />
            </div>

            <div className="flex-container-vertical">
                
                {showList.map((item) => {
                    return <ProductBanner id={item} />
                })}

            </div>


        </body>
    )
}

export default Page_Voorstellingen;