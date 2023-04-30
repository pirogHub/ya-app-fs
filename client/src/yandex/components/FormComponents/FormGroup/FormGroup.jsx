import React from "react";
import "./FormGroup.scss"


const FormGroup = ({ myRef, className, label, children, ...args }) => {

    if (!children || (children?.length === 1 && !children[0])) return <></>


    return (
        <div ref={myRef}
            className={"FormGroup" + (className ? ` ${className}` : "")}
        >
            {label && <h2>{label}</h2>}
            <div
                className="FormGroup__inner">
                {children}
            </div>
        </div>
    )
}

export default FormGroup