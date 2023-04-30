import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./smallSlider.scss"
import "../sliders.scss"

const SmallSlider = ({ className, images, bottomImgs_flag, linkToOffer }) => {


    let curIdx = 0
    let prevIdx = 0
    const refImg = createRef()
    const refBulletWrapper = createRef()
    const refActiveImgWrapper = createRef()

    const curImages = Array.isArray(images)

    const onMouseOver = ({ target }) => {
        const newIdx = target.dataset.idx
        if (!newIdx) return
        if (curIdx !== newIdx) {
            curIdx = newIdx

            refImg.current.src = images?.[curIdx]

            refBulletWrapper.current.children[prevIdx].classList.remove("active")
            refBulletWrapper.current.children?.[curIdx].classList.add("active")



            prevIdx = curIdx
        }
    }
    useEffect(() => {

    })

    const getBottomImgs = (imgs) => {
        const sliced = imgs.slice(4, 6)
        // console.log("sliced", sliced);

        return sliced || []
        // if (sliced.length)
    }
    return (
        <Link to={linkToOffer} className={"gallery-link " + className} >
            <div className="gallery">
                <div className="activeImg_wrapper">
                    <img ref={refImg} src={images?.[curIdx]} />
                    <div ref={refActiveImgWrapper} className={"activeImg_background"} ></div>
                </div>
                <div className="bulletIndicator_wrapper">
                    <ul ref={refBulletWrapper} className="bulletIndicator">
                        {Array.isArray(images) &&
                            (images.slice(0, 4)).map((i, idx) => {
                                return <li
                                    key={idx}
                                    data-idx={idx}
                                    className={
                                        "bulletIndicator__bullet"
                                        + (+prevIdx === +idx ? " active" : "")
                                    }
                                >
                                </li>
                            })}

                        <li className="bulletIndicator__overlimit">{images?.length - 4 > 0 ? `+${images?.length - 4}` : ""}</li>
                    </ul>

                </div>
                <ul onMouseOver={onMouseOver} className="gallery__items_wrapper">
                    {
                        Array.isArray(images) && images.slice(0, 4)
                            .map((i, idx) =>
                                <li key={idx} className="gallery__item">
                                    <img data-idx={idx} src={i} />
                                </li>)
                    }

                </ul>
            </div>
            {bottomImgs_flag
                ? <div className="bottom-imgs">
                    {getBottomImgs(images).map((i, idx) => <img key={idx} src={i} />)}
                </div>
                : <></>}
        </Link>
    )
}

export default SmallSlider