import React, { useEffect, useRef } from "react";



const ToTopScroller = () => {
    const refToTopScroll = useRef()


    useEffect(() => {

        if (refToTopScroll.current) {

            refToTopScroll.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [])

    return <div ref={refToTopScroll}></div>
}

export default ToTopScroller