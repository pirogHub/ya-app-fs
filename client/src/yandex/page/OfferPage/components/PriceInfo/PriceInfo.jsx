import React from "react";

import "./PriceInfo.scss"

const PriceInfo = ({ priceLabel, pricePerMeterLabel }) => {

    const [priceLabelNumber] = priceLabel.split("₽")
    const [pricePerMeterLabelNumber] = pricePerMeterLabel.split("₽")

    return (
        <div className="PriceInfo__Wrapper">
            <div className="PriceInfo__Labels">
                <div className="PriceTotal">
                    <span>Текущая цена</span>
                    <span>&nbsp;:&nbsp;</span>
                </div>
                <div className="PricePerMeter">
                    <span>Текущая Цена за м² </span>
                    <span>&nbsp;:&nbsp;</span>
                </div>
            </div>
            <div className="PriceInfo__Prices">

                <div className="PriceTotal">
                    <span>{priceLabelNumber}</span>

                </div>
                <div className="PricePerMeter">
                    <span>{pricePerMeterLabelNumber}</span>
                </div>

            </div>
            <div className="PriceInfo__Postfixes">

                <div className="PriceTotal">
                    &nbsp;₽&nbsp;
                </div>
                <div className="PricePerMeter">
                    &nbsp;₽/м²&nbsp;
                </div>
            </div>
        </div>
    )
}

export default PriceInfo