import React, { useState } from "react";
import "./OptionButton.scss"

const OptionButton = ({
    handler,
    status,
    label,
    value,
    btnClass,
    view,
    type = "button",
    isDisableByOpacity,
    isDarkWarning
}) => {
    const returnedValue = { value: value }
    const isDeepDevelopment = isDisableByOpacity

    const [isShowDeepDevelopment, setIsShowDeepDevelopment] = useState(false)

    return (
        <div
            onMouseEnter={isDeepDevelopment ? () => setIsShowDeepDevelopment(true) : undefined}
            onMouseLeave={isDeepDevelopment ? () => setIsShowDeepDevelopment(false) : undefined}
            className="buttonWrapper">
            {isDeepDevelopment && isShowDeepDevelopment &&
                <div className={
                    "deepDevelopment"
                    + (isShowDeepDevelopment ? " show" : "")
                    + (isDarkWarning ? " dark" : "")
                }
                >Функция находится в глубокой разработке</div>
            }
            <button
                type={type}
                onClick={handler ? status !== "disable" ? () => handler(returnedValue) : undefined : undefined}
                className={"OptionButton"
                    + (btnClass ? ` ${btnClass}` : "")
                    + (view ? ` ${view}` : "")
                    + (status ? ` ${status}` : "")
                    + (isDisableByOpacity ? " disableByOpacity" : "")}
            >
                {label}
            </button>
        </div>
    )
}

export default OptionButton
