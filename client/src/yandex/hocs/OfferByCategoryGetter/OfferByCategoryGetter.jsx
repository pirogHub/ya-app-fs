import React, { useEffect, useRef, useState } from "react";
import offerService from "../../services/offer.service";
import randomTools from "../../templateData/random/randomTools";
import Loader from "../../components/ui/Loader";


import "./OfferByCategoryGetter.scss"

const getRusNameByCategory = (category) => {


    switch (category) {
        case "flat": return "Квартира";
        case "room": return "Комната";
        case "house": return "Дом";
        case "garage": return "Гараж";
        case "commercial": return "Комм. недв.";
        case "land": return "Участок";

        default: return "Объект"
    }

}
const categoriesArr = [
    "flat",
    "room",
    "house",
    "garage",
    "commercial",
    "land",
]
const getRandomCategory = () => {
    const randomIdx = randomTools.getRandomNumber(categoriesArr.length - 1, 0, 0)
    const randomCategory = categoriesArr?.[randomIdx]
    return randomCategory
}


const OfferByCategoryGetter = ({ category, Component, ...rest }) => {

    const [realCategory, setRealCategory] = useState(category)
    const was_fetching_ref = useRef(false)
    if (!realCategory) {
        setRealCategory(getRandomCategory())
    }
    const [offer, setOffer] = useState()

    useEffect(() => {

        async function fetchOffer() {
            let tmpData = offer
            if (realCategory) {
                const data = await offerService.getRandomByCategory({ category: realCategory })
                was_fetching_ref.current = true
                tmpData = data
            } else {

            }
            setOffer(tmpData)
        }

        fetchOffer()

    }, [realCategory])

    useEffect(() => {
        const tmp = offer

    }, [offer])

    if (!offer || !Component) {

        return <div className={
            "hocError_emptyOffer_wrapper"
            + (was_fetching_ref.current ? "bg-shadow" : "")
        }>
            <div>Ищем самое лучшее</div>
            <Loader size={"50px"} />
        </div>
    }

    return (
        <Component
            img={offer?.firstImg}
            nameLabel={"Объект:"}
            name={getRusNameByCategory(realCategory)}
            priceLabel="Цена: "
            price={offer.priceDetails.priceLabel}
            location={"Город:"}
            locationName={offer.address.map.city === "Санкт-Петербург" ? "СПб" : offer.address.map.city}
            link={offer.linkToOffer}
            // debug={ }
            isDisabled={false}
            additionalInfoLabel={"Площадь: "}
            additionalInfo={offer.area.totalArea + "м²"}
            isSpaceBetween={true}
            {...rest}
        />
    )

}

export default OfferByCategoryGetter