import React, { useContext, useRef, useState } from "react";


import "./modalWindowProvider.scss"
import { current } from "@reduxjs/toolkit";

const ModalWindowContext = React.createContext()

// const BC = ModalWindowContext.Consumer

export const useModalWindow = () => {
    return useContext(ModalWindowContext)
}

const ContentAtCenter = ({ position, children }) => {

    return (
        <div
            // onClick={handleClickContent}
            // ref={refModalWindowContent}
            style={{
                top: position
                    ? position
                    : `${parseFloat(document.documentElement.clientHeight) * 0.35}px`
            }}
            className="modal-window-content">
            {children}
        </div>
    )
}


const ModalWindowProvider = ({ children }) => {

    const refModalWindow = useRef()
    const refModalBg = useRef()
    const refMainWrapper = useRef()
    const refNormalChildren = useRef()
    const [modalWindowContent, setModalWindowContent] = useState()
    const [modalWindowContentAbsolute, setModalWindowContentAbsolute] = useState()
    const [isCanBeClosed, setIsCanBeClosed] = useState(true)
    const [modalWindowContentAsNormal, setModalWindowContentAsNormal] = useState()

    const refOnClose = useRef()

    const showModal = (content) => {
        refModalWindow.current.classList.add("modal-window-show")
        setModalWindowContent(content)
    }
    const loadContentToCenter = (content, position = undefined, canClose = true) => {
        if (!canClose) setIsCanBeClosed(false)
        else setIsCanBeClosed(true)
        // refModalWindowContent.current.style.top = position ? position : `${parseFloat(document.documentElement.clientHeight) * 0.35}px`
        showModal(<ContentAtCenter children={content} position={position} />)
    }

    const loadContentToFull = ({ content, canClose = true, bgOpacity = "0.6", hideNormalChildren = false }) => {

        refModalBg.current.style.setProperty('--bgForce', `${bgOpacity}`)
        if (hideNormalChildren) {

            refNormalChildren.current.style.display = "none"
            setModalWindowContentAsNormal(content)
            refModalWindow.current.classList.add("oveflow__hidden")
            return
        }
        if (!canClose) setIsCanBeClosed(false)
        else setIsCanBeClosed(true)
        if (typeof canClose === "function") {
            refOnClose.current = canClose
            setIsCanBeClosed(true)
        }


        showModal(content)
    }

    const handleCloseModal = () => {

        refNormalChildren.current.style.display = "block"
        console.log(" handleCloseWindow closeModal");
        setModalWindowContent()
        setModalWindowContentAsNormal()
        refModalWindow.current.classList.remove("modal-window-show")
        if (refOnClose.current) refOnClose.current()
    }

    // const handleClickContent = (e) => {
    //     console.log("click");
    // }



    return (
        <>
            <div
                ref={refMainWrapper}
                className="modalWindow__contentWrapper">
                <div ref={refModalWindow} className="modal-window">
                    <div
                        ref={refModalBg}
                        className={
                            "modal-window-bg"
                            + (isCanBeClosed ? "" : " notClosed")}
                        // onClick={isCanBeClosed ? handleCloseModal : undefined}
                        onClick={isCanBeClosed ? handleCloseModal : undefined}
                    >
                    </div>

                    {modalWindowContent}



                </div>
                <div>
                    {modalWindowContentAsNormal}
                </div>
                <div ref={refNormalChildren}>
                    <ModalWindowContext.Provider value={{ loadContentToCenter, loadContentToFull, handleCloseModal }}>
                        {children}
                    </ModalWindowContext.Provider>
                </div>
            </div>
        </>
    )
}

export default ModalWindowProvider