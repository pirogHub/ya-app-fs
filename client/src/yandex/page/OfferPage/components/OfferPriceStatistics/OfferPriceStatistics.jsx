import React from "react";

import "./OfferPriceStatistics.scss"
import { postfixMlnCreator, thousandDelimeter } from "../../../../utils/thousandDelimeter";


const OfferPriceStatistics = ({
    label,
    value,
    secondLabel,
    secondValue,
    diff,
    isNotNeedFormatting,
    postfix,
    underValue,
    formatedFuncForDiff
}) => {


    let diffColor
    let diration

    if (diff > 0) {
        diffColor = " fill-green"
        diration = "down"
    } else {
        diffColor = " fill-red"
        diration = "up"
    }
    const formattingFunc = isNotNeedFormatting ? (str) => str : (str) => thousandDelimeter(str)?.formattedString
    const formattedValue = formattingFunc(value) + " " + postfix

    return (<div className="OfferPriceStatistics">
        <div className="OfferPriceStatistics__featureLabel fw-bold">{label}</div>
        <div className="OfferPriceStatistics__featureValue fw-bold">{formattedValue}</div>
        {secondLabel && <div className="OfferPriceStatistics__featureLabel fw-bold second">{secondLabel}</div>}
        {secondValue && <div className="OfferPriceStatistics__featureValue fw-bold second">({secondValue} м²)</div>}
        {underValue && <div className="OfferPriceStatistics__underValue ">{underValue}</div>}
        {diff && <div className={"featureDiff" + diffColor}>{formatedFuncForDiff(diff) + " " + postfix} <i className={`bi bi-caret-${diration}-fill`}></i></div>}
    </div>)
}

export default OfferPriceStatistics