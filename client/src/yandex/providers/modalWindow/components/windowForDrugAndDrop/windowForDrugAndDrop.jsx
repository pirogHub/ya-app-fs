import React from "react";

import "./WindowForDrugAndDrop.scss"

const WindowForDrugAndDrop = ({ onDropHandler }) => {

    return (
        <div

            style={{
                height: `${document.documentElement.clientHeight}px`
            }}
            className="windowForDrugAndDrop">
            Ловлю!
        </div>
    )
}

export default WindowForDrugAndDrop