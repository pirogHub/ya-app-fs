import { useEffect, useRef } from "react"
import "./Loader.scss"

const NoSize = ({ children }) => {
    return children
}

const SizeWrapper = ({ children, size, ...rest }) => {
    return <div style={{ height: size }} {...rest} className={"lds-roller-sizeWrapper"}>
        {children}
    </div>
}


const Loader = ({ className, color, size, ...rest }) => {

    const refLdsLoader = useRef()

    const Sizer = size ? SizeWrapper : NoSize

    useEffect(() => {

    })

    return (
        <Sizer size={size} {...rest}>
            <div className="lds-roller-wrapper">
                <div ref={refLdsLoader} className={"lds-roller" + (className ? ` ${className}` : '')} >
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div >
            </div>
        </Sizer>
    )
}

// return (
//     <div className="b">
//         <div className="b-inner"></div>
//     </div>
// )
// }

export default Loader