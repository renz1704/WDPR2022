import React, { useState } from 'react';
import Modal from 'react-modal';
import "../styles/generalStyle.css";

{/*npm install --save react-modal*/ }
function PopUp(props) {

    return (
        <Modal
            isOpen={true}
            onRequestClose={props.onClose}>
            <p>{props.message}</p>
            <button id="button" onClick={props.onClose}>
                Oke
            </button>
        </Modal>
    );
}

export default PopUp;