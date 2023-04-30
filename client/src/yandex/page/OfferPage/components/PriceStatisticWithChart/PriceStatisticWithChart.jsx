import React from "react";


import randomTools from "../../../../templateData/random/randomTools";
import { useMemo } from "react";
import OfferPriceStatistics from "../OfferPriceStatistics";
import MyReChart from "../../../../components/ui/MyReChart/MyReChart";
import { postfixMlnCreator, thousandDelimeter } from "../../../../utils/thousandDelimeter";

import "./PriceStatisticWithChart.scss"
import PriceInfo from "../PriceInfo/PriceInfo";

const rn = randomTools.getRandomNumberObj

const mounthArr = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек",]
const reversedMounthArr = [...mounthArr]
// reversedMounthArr.reverse()
const getMounthById = (idx, currentMounth) => {
    const cycleIdx = (reversedMounthArr.length + (idx % reversedMounthArr.length) + currentMounth) % reversedMounthArr.length
    const mounth = reversedMounthArr[cycleIdx]
    return mounth
}

const getRandomData = (currentPrice, createdAt) => {
    const priceAsNumber = typeof currentPrice === "string" ? +currentPrice.replaceAll(" ", "") : currentPrice
    const dataCount = rn({ max: 20, defMax: 0, min: 6, toFixed: 0, isString: false, canBeEmpty: false })
    const oldPrice = () => rn({ max: priceAsNumber * 3, defMax: 0, min: priceAsNumber / 5, toFixed: 2, isString: false, canBeEmpty: false })

    const data = []
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMounth = date.getMonth()
    let averagePrice = 0
    for (let i = 0; i < dataCount; i++) {
        const thisPrice = oldPrice()
        averagePrice += +thisPrice

        const dataItem = ({
            // "name": "2021",
            "mounth": getMounthById(-i, currentMounth - 1),
            "price": thisPrice,
        })
        if (
            ((i - currentMounth + 1) % 12 === 0)
            || i + 1 === dataCount) {
            const year = Math.floor(currentYear - ((i - currentMounth + 1) / 12))
            dataItem["name"] = year
        }


        data.unshift(dataItem)
    }


    data.push({
        "name": currentYear,
        "mounth": mounthArr[currentMounth],
        "price": priceAsNumber,
    })

    averagePrice += priceAsNumber
    averagePrice = (averagePrice / (dataCount + 1)).toFixed(2)
    return [data, averagePrice]
}



const PriceStatisticWithChart = ({
    currentPrice,
    totalArea,
    additinalLandArea,
    pricePerMeter,
    name,
    currentTotalPriceLabel,
    currentTotalPricePerMeterLabel
}) => {
    const [data, averagePrice] = useMemo(() => getRandomData(currentPrice), [currentPrice])

    const averagePricePerMeter = (+averagePrice / +totalArea).toFixed(2)
    const diffPrice = (+averagePrice - +(currentPrice.replaceAll(" ", ""))).toFixed(0)
    const diffPricePerMeter = (+averagePricePerMeter - +(pricePerMeter.replaceAll(" ", ""))).toFixed(0)

    return (<div className="PriceStatisticWithChart__wrapper">

        <PriceInfo
            priceLabel={currentTotalPriceLabel}
            pricePerMeterLabel={currentTotalPricePerMeterLabel}
        />
        <div className="PriceStatisticWithChart__statistics_wrapper">
            <OfferPriceStatistics
                postfix={"₽"}
                label={`Средняя цена за ${name}`}
                value={averagePrice}
                diff={diffPrice}
                underValue={`Сейчас: ${thousandDelimeter(`${currentPrice}`.replaceAll(" ", "")).formattedString} ₽`}
                formatedFuncForDiff={(str) => postfixMlnCreator(str)}

            />
            <OfferPriceStatistics
                postfix={" ₽/м²"}
                label="Средняя цена за м²"
                value={averagePricePerMeter}
                diff={diffPricePerMeter}
                underValue={`Сейчас: ${thousandDelimeter(`${pricePerMeter}`.replaceAll(" ", "")).formattedString} ₽/м²`}

                formatedFuncForDiff={(str) => thousandDelimeter(str).formattedString}
            />
            <OfferPriceStatistics
                postfix={"м²"}
                label="Всего квардратных метров"
                value={totalArea}
                secondLabel={additinalLandArea ? " Расчеты без учёта площади земли" : ""}
                secondValue={additinalLandArea}
                isNotNeedFormatting={true}
            />
        </div>
        <MyReChart data={data} averagePrice={averagePrice} currentTotalPriceLabel={currentTotalPriceLabel} />
    </div>
    )
}
export default PriceStatisticWithChart