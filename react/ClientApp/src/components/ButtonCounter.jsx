import React from "react";

function ButtonCounter(props) {
    return (
        <div className="flex-container-horizontal">
            <button onClick={props.decrement}>-</button>
            <div>{props.value}</div>
            <button onClick={props.increment}>+</button>
        </div>
    )
}
export default ButtonCounter;