import React from "react";

import "./OfferDetailItem.scss"
import randomTools from "../../../../templateData/random/randomTools";

const randomSvgs = [
    <i className="bi bi-filetype-svg"></i>,
    <i className="bi bi-airplane"></i>,
    <i className="bi bi-apple"></i>,
    <i className="bi bi-balloon"></i>,
    <i className="bi bi-bookmark-check"></i>,
    <i className="bi bi-calendar2-month"></i>,
    <i className="bi bi-cart-plus"></i>,
    <i className="bi bi-cash-coin"></i>,
    <i className="bi bi-cloud-haze"></i>,
    <i className="bi bi-controller"></i>,
    <i className="bi bi-cpu"></i>,
    <i className="bi bi-dribbble"></i>,
    <i className="bi bi-emoji-laughing"></i>,
    <i className="bi bi-emoji-kiss"></i>,
    <i className="bi bi-emoji-smile-upside-down"></i>,
    <i className="bi bi-ev-station"></i>,
    <i className="bi bi-file-earmark-image"></i>,
    <i className="bi bi-fire"></i>,
    <i className="bi bi-fingerprint"></i>,
    <i className="bi bi-hand-thumbs-up"></i>,
]

const getRandomSvg = () => {
    const randomIdx = randomTools.getRandomNumberObj({ max: randomSvgs.length, min: 0 })
    return randomSvgs[randomIdx]
}


const OfferDetailItem = ({ label, value, isNotEmpty }) => {


    return (
        <>{
            isNotEmpty
                ?

                <div className="OfferDetailItem">

                    <div className="OfferDetailItem__contentWrapper">
                        <div className="OfferDetailItem__content__firstRow">
                            <div className="OfferDetailItem__iconWrapper">
                                {getRandomSvg()}

                            </div>
                            <div className="OfferDetailItem__featureValue">{value}</div>
                        </div>
                        <div className="OfferDetailItem__featureLabel">{label}</div>
                    </div>
                </div>
                // </div>
                : <></>

        }
        </>
    )

}

export default OfferDetailItem