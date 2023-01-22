import React from 'react';
import "../../styles/tableStyle.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";

function Page_VoorstellingInfo() {

    let showName = "Een mooie naam"
    let showDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis purus turpis, ullamcorper quis nunc sed, scelerisque vehicula metus. Vestibulum mollis nibh nulla, id congue quam consequat vitae. In ut nisi consequat, tristique massa ullamcorper, ornare velit. Maecenas vel pulvinar orci. Donec cursus lacus augue, id sodales lorem tempor non. Maecenas nunc leo, cursus in cursus ut, finibus quis nunc. Maecenas lacinia augue sit amet tortor aliquam eleifend. Curabitur vel urna vel quam mollis consequat. Curabitur ultrices dapibus nibh eu rhoncus. " +
        "Fusce vestibulum euismod dolor at maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit ipsum felis, id dapibus tortor hendrerit semper. In nisi ipsum, accumsan nec accumsan sit amet, tincidunt eu diam. Pellentesque ultricies leo tortor, imperdiet euismod orci convallis nec. Maecenas libero augue, vulputate in mollis ac, rutrum a sem. Phasellus sapien libero, maximus et elementum nec, egestas eu augue. Donec molestie gravida ipsum. Vivamus sollicitudin laoreet ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vulputate ornare varius. Integer fermentum est quis arcu consequat fermentum. Vestibulum faucibus metus dolor, et feugiat metus cursus eget. Fusce eleifend felis vitae lacus viverra hendrerit."

    let dateArray = ["1 Jan", "2 Jan", "3 Jan"]

    let tableArray = [
        [dateArray[0], "12:00", "13:00"],
        [dateArray[1], "13:00", "16:45"],
        [dateArray[2], "11:30", "13:15", "16:45"],
    ];


    {/*dit maakt de header van de tabel even lang als de inhoud */ }
    const emptyTableHeaders = [];
    for (let i = 0; i < tableArray.length - 1; i++) {
        emptyTableHeaders.push(<th></th>);
    }



    return (
        <>
            <Header />
            <body style={{ margin: "1%" }}>
                <h1>{showName}</h1>
                <p>{showDescription}</p>

                <p>Klik op een tijdstip om je stoelen te kiezen</p>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr className='topRow'>
                            <th>Datum</th>
                            <th>Tijd</th>
                            {emptyTableHeaders}
                        </tr>
                    </thead>

                    <tbody>
                        {/*maakt een rij voor het aantal waardes (de lengte) in tableArray */}
                        {tableArray.map((row, rowIndex) => (
                            <tr key={rowIndex}>

                                {/*TODO datums worden ook knoppen */}
                                {/*vult de rij met cellen met daarin de waardes van de arrays in dateArrays */}
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}><Link className="timeButton" to="/stoelKeuze">{cell}</Link></td>
                                ))}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </body>
            <Footer/>
        </>
    )
}
export default Page_VoorstellingInfo;