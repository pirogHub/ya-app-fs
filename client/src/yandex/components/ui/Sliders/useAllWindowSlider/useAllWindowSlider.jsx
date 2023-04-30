import { useEffect, useRef, useState } from "react"
import { useModalWindow } from "../../../../providers/modalWindow/modalWindowProvider"
import Button from "../../Button"
import SliderShell from "../SliderShell/SliderShell"

import "./useAllWindowSlider.scss"
import SliderShellForAllWindowSlider from "../SliderShellForAllWindowSlider/SliderShellForAllWindowSlider"


const Control = ({ direction, onClick }) => {
    const [isOnHover, setIsOnHover] = useState(false)
    return <div
        onClick={() => onClick(direction === "prev" ? false : true)}
        onMouseEnter={() => setIsOnHover(true)}
        onMouseLeave={() => setIsOnHover(false)}
        className={"imageControl_wrapper " + direction}>
        <Button
            className={"btn btn-cirle" + (isOnHover ? " hover" : "")}>
            <i className={"bi bi-arrow" + (direction === "prev" ? "-left" : "-right")}></i>
        </Button>
    </div>
}

const Slider = ({ contentArr, lastIndex, label, onImgChange, isGetImgToMainOnInit, isNeedClearIndex, globalIdx, indexRanges }) => {
    const [currentIndex, setCurrentIndex] = useState(lastIndex ? lastIndex : 0)
    const refHalfTranslate = useRef(contentArr?.length ? ((contentArr.length - 1) * (90 / 2)) : 0)

    const refSlider = useRef()
    const refIsFirstSending = useRef(true)


    useEffect(() => {
        if (indexRanges
            && indexRanges[0] <= globalIdx
            && indexRanges[1] >= globalIdx) {
            const index = globalIdx - indexRanges[0]
            setCurrentIndex(index)
        }
    }, [globalIdx])

    useEffect(() => {
        if (isNeedClearIndex !== undefined) {
            if (isNeedClearIndex) setCurrentIndex(undefined)
        }
    }, [isNeedClearIndex])

    useEffect(() => {
        if (currentIndex === undefined) return
        let newTranslate = refHalfTranslate.current - currentIndex * (90)
        console.log("half", refHalfTranslate.current);
        refSlider.current.style.setProperty('--translateVal', `${newTranslate}px`)
        if (refIsFirstSending.current) {
            if (isGetImgToMainOnInit)
                onImgChange(contentArr[currentIndex]?.myBlob ? contentArr[currentIndex]?.myBlob : contentArr[currentIndex], currentIndex)
        } else {
            onImgChange(contentArr[currentIndex]?.myBlob ? contentArr[currentIndex]?.myBlob : contentArr[currentIndex], currentIndex)
        }
        refIsFirstSending.current = false
    }, [currentIndex])

    const changeImg = (toNext) => {
        if (typeof toNext === "boolean") {
            if (toNext) setCurrentIndex(prev => prev + 1)
            else setCurrentIndex(prev => prev - 1)
        } else {
            setCurrentIndex(prev => toNext)
        }
    }

    return <div className="AllWindowSlider__bottomSlider_wrapper">
        <div className="AllWindowSlider__bottomSlider_title">
            {label}
        </div>
        <div
            ref={refSlider}
            className="AllWindowSlider__bottomSlider">
            {contentArr && contentArr.map((p, index) =>
                <img
                    key={p?.myBlob ? p?.myBlob : p}
                    onClick={() => changeImg(index)}
                    className={
                        "AllWindowSlider__bottomSlider_item"
                        + (currentIndex === index ? " active" : "")
                    } src={p?.myBlob ? p?.myBlob : p}
                />
            )}
        </div>
    </div>
}

const wasPlan = false
const wasPhoto = true

const getEnabling = (whatWas, currentIndex, photoLen, planLen) => {
    let controlPrev = false
    let controlNext = false
    let globalIndex = undefined
    if (whatWas === wasPlan) {
        controlPrev = currentIndex > 0
        // controlNext = currentIndex + 1 < planLen
        controlNext = true
        globalIndex = currentIndex - planLen
    } else {
        // controlPrev = currentIndex > 0
        controlPrev = true
        controlNext = currentIndex + 1 < photoLen
        globalIndex = currentIndex
    }

    return [controlPrev, controlNext, globalIndex]
}

const AllWindowSlider = ({ photos, plans, closeFunc, lastIndex, wasClickOnPhotosNotPlans }) => {

    const [mainImg, setMainImg] = useState()
    const [whatWas, toggleWhatWas] = useState(wasClickOnPhotosNotPlans)

    const [isControlPrevEnable, setIsControlPrevEnable] = useState()
    const [isControlNextEnable, setIsControlNextEnable] = useState()
    const [globalIndex, setGlobalIndex] = useState()

    // useEffect(() => {
    //     if (!mainImg) return
    //     const [prev, next] = getEnabling(whatWas, refSomeOneIndex.current)

    // }, [whatWas])

    const handlerImgChanging = (img, currentIndex, whatWas) => {
        setMainImg(img)
        toggleWhatWas(whatWas)
        const [prev, next, globalIdx] = getEnabling(whatWas, currentIndex, photos?.length, plans?.length)
        setIsControlPrevEnable(prev)
        setIsControlNextEnable(next)
        setGlobalIndex(globalIdx)
    }

    return (
        <div className="AllWindowSlider__wrapper">
            <div className="closeButton__wrapper">
                <Button
                    onClick={() => closeFunc()}
                    className="btn btn-white big">
                    <i className="bi bi-x-lg"></i>
                </Button>
            </div>
            <div className="AllWindowSlider__mainImage_wrapper">
                {
                    isControlPrevEnable
                    &&
                    <Control
                        onClick={() => setGlobalIndex(prev => prev - 1)}
                        direction="prev"
                    />
                }
                {
                    isControlNextEnable
                    &&
                    <Control
                        onClick={() => setGlobalIndex(prev => prev + 1)}
                        direction="next"
                    />
                }
                <img src={mainImg} />
            </div>
            <div className="AllWindowSlider__bottom_wrapper">
                {plans && <Slider
                    label={"План объекта"}
                    contentArr={plans}
                    onImgChange={(img, currentIndex) => {
                        // setMainImg(img)
                        // toggleWhatWas(wasPlan)
                        // refSomeOneIndex.current = currentIndex
                        handlerImgChanging(img, currentIndex, wasPlan)
                    }}
                    isGetImgToMainOnInit={!wasClickOnPhotosNotPlans}
                    isNeedClearIndex={whatWas}
                    indexRanges={[-plans.length, -1]}
                    globalIdx={globalIndex}
                />
                }
                {photos && <Slider
                    label={"Фото объекта"}
                    contentArr={photos}
                    lastIndex={lastIndex}
                    isGetImgToMainOnInit={wasClickOnPhotosNotPlans}
                    isNeedClearIndex={!whatWas}
                    onImgChange={(img, currentIndex) => {
                        // setMainImg(img)
                        // toggleWhatWas(wasPhoto)
                        // refSomeOneIndex.current = currentIndex
                        handlerImgChanging(img, currentIndex, wasPhoto)
                    }}
                    indexRanges={[0, photos.length]}
                    globalIdx={globalIndex}
                />
                }

            </div>


        </div >
    )
}

export const useAllWindowSlider = () => {
    const { loadContentToFull, handleCloseModal } = useModalWindow()

    const showAtAllWindowSlider = ({ photos, plans, lastIndex, wasClickOnPhotosNotPlans }) => {
        loadContentToFull({
            content: <AllWindowSlider {...{ photos, plans, lastIndex, wasClickOnPhotosNotPlans, closeFunc: handleCloseModal }} />,
            canClose: false, bgOpacity: "1", hideNormalChildren: true
        })
    }

    return [showAtAllWindowSlider, handleCloseModal]
}
