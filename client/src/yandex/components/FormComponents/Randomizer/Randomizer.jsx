import React, { useEffect, useRef, useState } from "react";

import "./Randomizer.scss"

const Randomizer = ({ forceUpdate_flag, onClick }) => {
    // const isGenerating = useRef(false)
    const refRandomWrapper = useRef()
    const refButton = useRef()
    const refIcon = useRef()
    const [isGenerating, setIsGenerating] = useState(false)

    // const randomRotate = refRandomWrapper.current.querySelector(".random-rotate")


    const afterGenerate = () => {
        const timer = setTimeout(() => {
            refIcon.current.classList.remove("random-rotate-toRotate")

            refButton.current.removeAttribute('disabled');
            refRandomWrapper.current.classList.remove("random__wrapper__rotating")
            // clearTimeout(timer)
            toggleHover(false)

            refRandomWrapper.current.classList.remove("disabled")
            setIsGenerating(false)
            // refRandomWrapper.current.classList.remove("hover")
        }, 500)
    }

    useEffect(() => {
        afterGenerate()
    }, [forceUpdate_flag])

    const handerClick = async () => {
        if (isGenerating) return
        setIsGenerating(true)

        refRandomWrapper.current.classList.add("random__wrapper__rotating")

        refIcon.current.classList.add("random-rotate-toRotate")
        refButton.current.setAttribute('disabled', '');

        toggleHover(true)
        // refRandomWrapper.current.classList.add("hover")
        refRandomWrapper.current.classList.add("disabled")

        const promises = await onClick()

        console.log("Randomizer promises", promises);

        Promise.all(promises).then(data => {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! data", data);
            afterGenerate()
        }).catch(() => afterGenerate())
    }


    const toggleHover = (flag) => {
        const buttons = refRandomWrapper.current.querySelectorAll('button')
        // console.log("buttons", buttons);
        if (flag) buttons.forEach(b => b.classList.add("hover"))
        else buttons.forEach(b => b.classList.remove("hover"))
    }

    return (
        <div
            ref={refRandomWrapper}
            onMouseLeave={() => { if (!isGenerating) toggleHover(false) }}
            onMouseEnter={() => { if (!isGenerating) toggleHover(true) }}
            className="random__wrapper btn-pill">
            <button
                ref={refButton}
                className="btn btn-cirle"
                data-randombutton={"true"}
                onClick={handerClick}
            >
                <div
                    ref={refIcon}
                    className="random-rotate"
                >
                    <i className="bi bi-box before-font-size-150"></i>
                </div>
            </button>
            <div
                // className="btn search-btn"
                onClick={handerClick}>Random
            </div>
        </div>
    )
}

export default Randomizer