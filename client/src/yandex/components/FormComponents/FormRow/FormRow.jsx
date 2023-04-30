import React, { useEffect } from "react";

import "./FormRow.scss"

const FormRow = ({ errorsState, label, children, withoutErrors, isNotRequired, isErrorWrapperWidthMax }) => {

    if (!children) return <></>
    // useEffect(() => {
    //     console.log("FormRow", errorsState);

    // }, [errorsState])
    return (
        <div className={"FormRow"
            + (errorsState ? " invalid" : "")

        }>
            {errorsState
                &&
                <>
                    <div className={"error-wrapper" + (isErrorWrapperWidthMax ? " maxWidth" : "")}>
                        {errorsState?.message ? errorsState.message : "Поле обязательно для заполнения"}
                    </div>
                    <div className="FormRow__icon-wrapper">
                        <i className="bi bi-exclamation-circle"></i>
                    </div>
                </>
            }
            {label
                && <div className="FormRow__titleWrapper">
                    <span className="FormRow__title">
                        {label}
                    </span>
                </div>
            }
            {isNotRequired
                && <div className="FormRow__isNotRequiredTitleWrapper">
                    <span className="FormRow__isNotRequiredTitle">
                        *Необязательно для заполнения*
                    </span>
                </div>
            }
            <div className={"FormRow-content"
                + (label ? "" : " withoutLabel")
                + (withoutErrors ? " withoutErrors" : "")
            }>

                {children}
            </div>
        </div>
    )
}

export default FormRow