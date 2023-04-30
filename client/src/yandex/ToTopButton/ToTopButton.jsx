import Button from "../components/ui/Button"

import "./ToTopButton.scss"

const ToTopButton = ({
    onClick,
    isHide,
    anotherButtonClassName,
    isTurnOffStickyAndAbsolute,
    label
}) => {

    return (
        <div className={
            "toTopBtn_button_wrapper"
            + (isHide ? " d-hide" : "")
            + (isTurnOffStickyAndAbsolute ? " simplePosition" : "")
        }>
            <Button
                label={label}
                className={
                    (anotherButtonClassName ? anotherButtonClassName : "btn btn-cirle btn_more_shadow toTopButton")

                    + (isTurnOffStickyAndAbsolute ? " simplePosition" : "")
                }
                onClick={onClick}
            >
                {

                    label ? null : <i className="bi bi-arrow-up"></i>
                }

            </Button>
        </div>
    )

}

export default ToTopButton