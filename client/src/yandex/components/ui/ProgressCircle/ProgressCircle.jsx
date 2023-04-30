import React, { createRef, useEffect, useRef } from "react";

import "./ProgressCircle.scss"

const ProgressCircle = ({ progress }) => {

    const refSector = useRef()
    const refSectorAbove100 = useRef()

    useEffect(() => {
        if (progress <= 100) refSector.current.style.setProperty('--persent', `${progress}%`)
        else refSector.current.style.setProperty('--persent', `${100}%`)
        if (progress > 100) refSectorAbove100.current.style.setProperty('--persent', `${progress - 100}%`)
        // console.log("ProgressCircle refSector", refSector);
    }, [progress])

    return (

        <div className="Progress__wrapper">

            <div className="percentWrapper">
                <div
                // ref={refPercent} 
                >{progress > 100 ? "100" : progress}%</div>
            </div>

            <div className="ProgressCircle_wrapper">
                <div className="ProgressCircle_outer_gray"></div>
                <div
                    ref={refSector}
                    className="ProgressCircle_outer">
                </div>
                {progress > 100
                    && <div
                        ref={refSectorAbove100}
                        className="ProgressCircle_outer above100">



                    </div>}
                <div className="ProgressCircle_inner">
                </div>

            </div>

        </div>
    )
}

export default ProgressCircle