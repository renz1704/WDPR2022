import React, { useState } from 'react';

function DropdownMenu(props) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((value) => !value);

    return (
        <div>
            <button onClick={toggleMenu}>{props.type}</button>
            {isOpen && (
                <ul>
                    {/*dit maakt een item aan in de dropdown 
                    voor elk item in options (een lijst van de parent)*/}
                    {props.options.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;