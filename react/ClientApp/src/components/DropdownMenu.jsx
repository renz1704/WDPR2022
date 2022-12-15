import React, { useState } from 'react';

function DropdownMenu(props) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((value) => !value);

    const [optionPicked, setOptionPicked] = useState(props.options[0])
    
    const onOptionClicked = (item) => {
        setOptionPicked(item)
        toggleMenu()
        props.optionClicked(item)
    }
    
    return (
        <div>
            <button onClick={toggleMenu}>{props.type}: {optionPicked}</button>
            {isOpen && (
                <ul style={{position:"absolute"}}>
                    {/*dit maakt een item aan in de dropdown 
                    voor elk item in options (een lijst van de parent)*/}
                    {props.options.map((item, index) => {
                        return <li key={index}>
                            <button onClick={() => onOptionClicked(item)}>
                                {item}
                            </button>
                        </li>
                    })}
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;