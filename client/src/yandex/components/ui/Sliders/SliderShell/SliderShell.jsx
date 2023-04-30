import React, { createRef, useRef, useEffect } from "react";
import "../sliders.scss"
import "./SliderShell.scss"

const ControllsCircle = ({ LeftRef, RightRef, handleClick }) => {

    return (
        // <div className="slider__controllsCicleWrapper">
        <>
            <div
                className="gallery__control gallery__controlPrevImage gallery__controlScroll"
            >
                <button
                    ref={LeftRef}
                    onClick={() => handleClick(true)}
                    className="btn btn-cirle"><i className="bi bi-arrow-left"></i></button>
            </div>
            <div
                className="gallery__control gallery__controlNextImage gallery__controlScroll"
            // ref={refBtnNext}
            // onClick={() => handleClick(true)}
            >
                <button
                    onClick={() => handleClick(false)}
                    ref={RightRef} className="btn btn-cirle"><i className="bi bi-arrow-right"></i></button>
            </div>
        </>
        // </div>
    )
}



const SliderShell = ({ description, children, controllButtons_flag = true }) => {

    const newChildren = []
    // const childrenRefs = []
    //console.log("render");
    // let i = 0
    children.forEach(c => {
        const ref = createRef()
        const child = React.cloneElement(c,
            {
                ref,
                className: c.props.className + " slider-item" + (true ? " visibility-visible" : " visibility-hidden")
            })
        newChildren.push(child)
        // childrenRefs.push(ref)
        // i++
    })

    const sliderRef = useRef()
    const btnLeftRef = useRef()
    const btnRightRef = useRef()
    const childrenLength = children.length

    let disableLeft = true
    let disableRight = false

    // let transform = 0
    let myIdx = 0
    const showCount = 4
    const perOneTime = 4

    let currentScrollLeft = 0
    // let minScrollLeft = 0
    // let maxScrollLeft
    let scrollLengthEl

    useEffect(() => {

        currentScrollLeft = sliderRef.current.scrollLeft


        btnLeftRef.current.disabled = disableLeft;
        btnRightRef.current.disabled = disableRight;

        if (!controllButtons_flag) btnLeftRef.current.style.visibility = "hidden";

    }, [])
    let newScrollLeft = 0
    const handleClick = (flag) => {

        scrollLengthEl = (sliderRef.current.scrollWidth / childrenLength).toFixed(2)


        btnLeftRef.current.disabled = disableLeft;
        btnRightRef.current.disabled = disableRight;

        if (!flag) {

            const availableCount = childrenLength - myIdx - showCount

            const toSwitch = perOneTime <= availableCount
                ? perOneTime
                : availableCount
            const nextStartIdx = myIdx + toSwitch


            const counter = toSwitch

            newScrollLeft = currentScrollLeft + scrollLengthEl * counter

            myIdx = nextStartIdx

            if (myIdx + toSwitch === childrenLength - 1) {

            }
        } else {
            const availableCount = myIdx

            const toSwitch = perOneTime < availableCount
                ? perOneTime
                : availableCount
            const nextStartIdx = myIdx - toSwitch


            const counter = toSwitch

            newScrollLeft = currentScrollLeft - scrollLengthEl * counter

            myIdx = nextStartIdx


        }

        sliderRef.current.scrollTo({
            left: `${newScrollLeft}`,
            behavior: 'smooth'
        })
        currentScrollLeft = newScrollLeft


        disableLeft = myIdx === 0
        btnLeftRef.current.disabled = disableLeft;
        disableRight = myIdx + showCount === childrenLength
        btnRightRef.current.disabled = disableRight;

        if (!controllButtons_flag) {
            btnLeftRef.current.style.visibility = disableLeft ? "hidden" : "visible";
            btnRightRef.current.style.visibility = disableRight ? "hidden" : "visible";
        }

        if (myIdx + showCount === childrenLength) {
        }

        return
    }


    return (

        <div className="SliderShell__wrapper">

            {controllButtons_flag
                ?
                <div className="SliderShell__header">
                    {description && <div className="SliderShell__description">{description}</div>}
                    <div className="SliderShell__controls_wrapper">
                        <button ref={btnLeftRef} onClick={() => handleClick(true)} className="btn btn-gray-outline m-5"><i className="bi bi-caret-left"></i></button>
                        <button ref={btnRightRef} onClick={() => handleClick(false)} className="btn btn-gray-outline m-5"><i className="bi bi-caret-right"></i></button>
                    </div>
                </div>
                : <ControllsCircle LeftRef={btnLeftRef} RightRef={btnRightRef} handleClick={handleClick} />
            }
            <div ref={sliderRef} className="SliderShell__itemsContainer">
                {children.map((c, i) =>
                    <div
                        className="SliderShell__item"
                        key={i}
                    >{c}</div>
                )
                }
            </div>

        </div>
    )
}



export default SliderShell