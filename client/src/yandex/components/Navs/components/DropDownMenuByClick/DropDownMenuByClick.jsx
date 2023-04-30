import { useEffect, useRef } from "react"

import "./DropDownMenuByClick.scss"

const DropDownMenuByClick = ({
    dropdownCenterContent,
    children,
    isRight
}) => {
    const refDropDownMenu = useRef()
    const refDropDownCenter = useRef()
    const refTimer = useRef()

    const hideMenu = () => {
        refDropDownMenu.current.classList.remove("show")
        // refDropDownCenter.current.classList.remove("show")
    }

    useEffect(() => {
        hideMenu()
    }, [])

    const handlerToggleShow = () => {
        refDropDownMenu.current.classList.toggle("show")
        // if (refDropDownMenu.current.classList.includes("show")) 
        refDropDownMenu.current.focus()
        // refDropDownCenter.current.classList.toggle("show")
    }

    const handleSetOrClearTimeout = (isSet) => {
        if (isSet) {
            console.log("mouseLeave setTimeout");
            refTimer.current = window.setTimeout(() => {
                hideMenu()
            }, 1000)
        } else {
            if (refTimer.current) clearTimeout(refTimer.current)
            refTimer.current = undefined
        }
    }
    return (
        <div
            className="dropdown-wrapper"
        // style={{ border: "1px solid #000" }}
        // onBlur={(e) => console.log("onBlur", e)}
        >
            <div


                onMouseLeave={() => handleSetOrClearTimeout(true)}
                onMouseEnter={() => handleSetOrClearTimeout(false)}
                className="dropdown-center"
            >
                <div onClick={handlerToggleShow}>
                    {dropdownCenterContent}
                </div>
                <ul

                    ref={refDropDownMenu}
                    className={"dropdown-menu" + (isRight ? " right" : "")}>
                    {children.length > 1
                        ? children.map((c, idx) => <li key={idx} className="dropdown-item">{c}</li>)
                        : <li className="dropdown-item">{children}</li>}
                </ul>
            </div>
        </div>
    )
}

export default DropDownMenuByClick