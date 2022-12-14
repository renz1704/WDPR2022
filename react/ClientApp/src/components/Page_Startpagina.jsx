import React from 'react';
import Seats from '../pictures/seats.png';


function Page_Startpagina(){
    return(
        <div className="flex-container-horizontal">
            
            <div >
                <h1>Over het Theater Laak</h1>
                <p>
                    Het theater is heel cool
                    amet justo donec enim diam vulputate ut pharetra 
                    sit amet aliquam id diam maecenas ultricies mi eget 
                    mauris pharetra et ultrices neque ornare aenean 
                    euismod elementum nisi quis eleifend quam adipiscing 
                    vitae proin sagittis nisl rhoncus mattis rhoncus urna neque 
                    viverra justo nec ultrices dui sapien eget mi proin sed
                </p>
            </div>

            <div >
                <img src={Seats} alt=""/>
            </div>
        </div>
    )
}

export default Page_Startpagina;

