import React from 'react';
import DropdownMenu from './DropdownMenu';

function Page_Voorstellingen() {

    {/*deze lijsten zijn de opties die in de dropdownmenus worden getoonds*/}
    const sortOptions = ["Datum","Kosten","Populariteit"]
    const filterOptions = ["geen","idee"]

    return (
        <>
            <div className="flex-container-horizontal">
                <DropdownMenu type="Sorteer" options={sortOptions}/>
                <DropdownMenu type="Filter" options={filterOptions}/>
                <input/>
            </div>
            
            <div className="flex-container-vertical">

            </div>


        </>
    )
}

export default Page_Voorstellingen;