import React, { forwardRef, useEffect } from "react";
import "./AOoptionCard.scss"

export const inputViews = {
    square: "Option_sizeBox_big",
    rectangle: "OptionSizeBox_reсtangle",
    circle: "OptionSizeBox_circle",
    button: "OptionSizeBox_button",
    pill: {
        whiteBlue: "OptionSizeBox_pill",
        black: "OptionSizeBox_pill black"
    }
}


const AOoptionCard = forwardRef(({ view, value, svg, label, handler, status, className }, ref) => {
    const returnedValue = ref ? { value: value, ref } : { value: value }
    // console.log("status", status);
    return (
        <div
            ref={ref ? ref : undefined}
            id={value}
            onClick={handler ? status !== "disable" ? () => handler(returnedValue) : undefined : undefined}
            className={"Option"
                + (className ? ` ${className}` : "")
                + ` ${view}`
                + (status ? ` ${status}` : "")}
        >
            {svg && <div>{svg}</div>}
            {/* <div className="divButton"> */}
            {/* <span className="Button__text"> */}
            {label}
            {/* </span> */}
            {/* </div> */}
        </div>
    )
})

export default AOoptionCard