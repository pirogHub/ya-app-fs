import MyLink from "../components/ui/MyLink";
import mySuperValidator from "./mySuperValidator";
import { thousandDelimeter, thousandDelimeterFromStringOrNumber } from "./thousandDelimeter";
import toRussianLanguage from "./toRussianLanguage";

const ise = mySuperValidator.isEmptyDetecter



const getName = (category, offer) => {
    switch (category) {
        case "room": return toRussianLanguage.declinationPro({ number: offer?.aboutFlat.rooms.rooms_forSale, root: "комнат", for1: "у", for234: "ы", for5: "" })
        case "flat": return " эту квартиру"
        case "house": return " этот дом"
        // case "garage": return " продаваемую часть квартиры"
        // case "commercial": return "продаваемую часть квартиры"
        case "land": return " эту землю"


        default:
            return " этот объект"
    }
}

const getCharacteristics = (category, offer) => {
    let characteristics = { mainRow: {}, additional: [], priceDetails: {} }
    let aboutRooms = [{}]
    if (category === "flat") {
        aboutRooms = [{
            value: offer?.aboutFlat?.rooms?.rooms_total + " комнат",
            label: "В квартире",
            isNotEmpty: !ise(offer?.aboutFlat?.rooms?.rooms_total)
        }]
        characteristics.priceDetails = ({
            label: "О сделке",
            content: [{
                value: offer?.priceDetails.dealType,
                label: "Тип сделки",
                isNotEmpty: !ise(offer?.priceDetails?.dealType)
            }, {
                value: offer?.priceDetails.tax,
                label: "Налог",
                isNotEmpty: !ise(offer?.priceDetails?.tax)
            }, {
                value: thousandDelimeterFromStringOrNumber(offer?.priceDetails?.deposit) + " ₽",
                label: "Обеспечительный платёж",
                isNotEmpty: !ise(thousandDelimeterFromStringOrNumber(offer?.priceDetails?.deposit))
            }]
        })
    } else if (category === "room") {
        aboutRooms = [{
            value: "Всего",
            label: toRussianLanguage.declinationPro({ number: offer?.aboutFlat?.rooms?.rooms_total, root: "комнат", for1: "а", for234: "ы", for5: "" }),
            isNotEmpty: !ise(offer?.aboutFlat?.rooms?.rooms_total)
        }, {
            value: "На продажу",
            label: toRussianLanguage.declinationPro({ number: offer?.aboutFlat?.rooms?.rooms_forSale, root: "комнат", for1: "а", for234: "ы", for5: "" }),
            isNotEmpty: !ise(offer?.aboutFlat?.rooms?.rooms_forSale)
        }]
        characteristics.priceDetails = ({
            label: "О сделке",
            content: [{
                value: offer?.priceDetails.dealType,
                label: "Тип Сделки",
                isNotEmpty: !ise(offer?.priceDetails.dealType)
            }, {
                value: offer?.priceDetails.additionaly,
                // label: "Дополнительно",
                isNotEmpty: !ise(offer?.priceDetails.additionaly)
            }]
        })

    }

    switch (category) {
        case "flat":
        case "room":
            characteristics.mainRow = {
                label: "О Квартире",
                content: [
                    ...aboutRooms,

                ]
            }
            characteristics.additional.push({
                label: "",
                content: [
                    {
                        value: offer?.aboutFlat?.floors?.floor_current + " этаж",
                        label: "из " + offer?.aboutFlat?.floors?.floor_total,
                        isNotEmpty: !ise(offer?.aboutFlat?.floors?.floor_current) && !ise(offer?.aboutFlat?.floors?.floor_total)
                    },
                    {
                        value: offer?.aboutFlat?.ceilHeight + " м",
                        label: "потолки",
                        isNotEmpty: !ise(offer?.aboutFlat?.ceilHeight)
                    }

                ]
            })
            characteristics.additional.push({
                label: "Плошадь",
                content: [
                    {
                        value: offer?.aboutFlat?.area?.area_total + " м²",
                        label: "общая",
                        isNotEmpty: !ise(offer?.aboutFlat?.area?.area_total)
                    },
                    {
                        value: offer?.aboutFlat?.area?.area_forLive + " м²",
                        label: "жилая",
                        isNotEmpty: !ise(offer?.aboutFlat?.area?.area_forLive)
                    },
                    {
                        value: offer?.aboutFlat?.area?.area_kitchen + " м²",
                        label: "кухня",
                        isNotEmpty: !ise(offer?.aboutFlat?.area?.area_kitchen)
                    }

                ]
            })

            characteristics.additional.push({
                label: "Внутри",
                content: [
                    {
                        value: offer?.aboutFlat?.toilet,
                        label: "Санузел",
                        isNotEmpty: !ise(offer?.aboutFlat?.toilet)
                    },
                    {
                        value: offer?.aboutFlat?.typeFloor,
                        label: "Покрытие пола",
                        isNotEmpty: !ise(offer?.aboutFlat?.typeFloor)
                    },
                    {
                        value: offer?.aboutFlat?.renovation,
                        label: "Ремонт",
                        isNotEmpty: !ise(offer?.aboutFlat?.renovation)
                    },
                    {
                        value: "Окна",
                        label: offer?.aboutFlat?.windows,
                        isNotEmpty: !ise(offer?.aboutFlat?.windows)
                    },
                ]
            })
            characteristics.additional.push({
                label: "О доме",
                content: [
                    {
                        value: offer?.aboutBuilding?.parking,
                        label: "Парковка",
                        isNotEmpty: !ise(offer?.aboutBuilding?.parking)
                    },
                    {
                        value: offer?.aboutBuilding?.buildingType,
                        label: "Материал",
                        isNotEmpty: !ise(offer?.aboutBuilding?.buildingType)
                    },
                    {
                        value: offer?.aboutBuilding?.year + " год",
                        label: "срок сдачи",
                        isNotEmpty: !ise(offer?.aboutBuilding?.year)
                    },
                ]
            })

            break;
        case "house":

            characteristics.additional.push({
                label: "Об участке",
                content: [
                    {
                        value: offer?.aboutLand?.area?.area_total + " м²",
                        label: "Площадь участка",
                        isNotEmpty: !ise(offer?.aboutLand?.area?.area_total)
                    },
                    {
                        value: offer?.aboutLand?.type,
                        label: "Тип участка",
                        isNotEmpty: !ise(offer?.aboutLand?.type)
                    }
                ]
            })
            characteristics.additional.push({
                label: "О доме",
                content: [
                    {
                        value: offer?.aboutHouse?.area?.area_total + " м²",
                        label: "Площадь дома",
                        isNotEmpty: !ise(offer?.aboutHouse?.area?.area_total)
                    },
                    {
                        value: offer?.aboutHouse?.floors,
                        label: "Этажей",
                        isNotEmpty: !ise(offer?.aboutHouse?.floors)
                    },
                    {
                        value: offer?.aboutHouse?.buildingType,
                        label: "Тип дома",
                        isNotEmpty: !ise(offer?.aboutHouse?.buildingType)
                    },
                    {
                        value: offer?.aboutHouse?.matherial,
                        label: "Материал",
                        isNotEmpty: !ise(offer?.aboutHouse?.matherial)
                    },
                    {
                        value: "Туалет",
                        label: offer?.aboutHouse?.toilet,
                        isNotEmpty: !ise(offer?.aboutHouse?.toilet)
                    },
                    {
                        value: "Душ",
                        label: offer?.aboutHouse?.shower,
                        isNotEmpty: !ise(offer?.aboutHouse?.shower)
                    },
                ]
            })
            characteristics.priceDetails = ({
                label: "О сделке",
                content: [{
                    value: offer?.priceDetails.dealType,
                    label: "Тип Сделки",
                    isNotEmpty: !ise(offer?.priceDetails.dealType)
                }, {
                    value: offer?.priceDetails.additionaly,
                    // label: "Дополнительно",
                    isNotEmpty: !ise(offer?.priceDetails.additionaly)
                }]
            })

            break;
        case "garage":
            characteristics.mainRow = {
                label: "О постройке",
                content: [
                    {
                        value: offer?.aboutGarage?.type,
                        label: "Тип постройки",
                        isNotEmpty: !ise(offer?.aboutGarage?.type)
                    },
                    {
                        value: offer?.aboutGarage?.matherial,
                        label: "Материал",
                        isNotEmpty: !ise(offer?.aboutGarage?.matherial)
                    },
                    {
                        value: Array.isArray(offer?.aboutGarage?.status) ? offer?.aboutGarage?.status.join(",\n") : offer?.aboutGarage?.status,
                        label: "Правовой статус",
                        isNotEmpty: !ise(offer?.aboutGarage?.status)
                    }
                ]
            }
            characteristics.additional.push({
                label: "Подробнее",
                content: [
                    {
                        value: offer?.aboutGarage?.area?.area_total + " м²",
                        label: "Площадь",
                        isNotEmpty: !ise(offer?.aboutGarage?.area?.area_total)
                    },
                    {
                        value: offer?.aboutGarage?.name,
                        label: "Название ГСК",
                        isNotEmpty: !ise(offer?.aboutGarage?.name)
                    },
                ]
            })
            characteristics.priceDetails = ({
                label: "О сделке",
                content: [{
                    value: offer?.priceDetails.additionaly,
                    label: "Торги",
                    isNotEmpty: !ise(offer?.priceDetails.additionaly)
                }]
            })

            break;
        case "commercial":
            characteristics.mainRow = {
                label: "Об объекте",
                content: [
                    {
                        value: offer?.aboutCommecial?.appointment,
                        label: "Назначение",
                        isNotEmpty: !ise(offer?.aboutCommecial?.appointment)
                    }
                ]
            }
            characteristics.priceDetails = ({
                label: "О сделке",
                content: [{
                    value: offer?.priceDetails.additionaly,
                    label: "Торги",
                    isNotEmpty: !ise(offer?.priceDetails.additionaly)
                }]
            })
            break;
        case "land":
            characteristics.mainRow = {
                label: "Об участке",
                content: [
                    {
                        value: offer?.aboutLand?.area?.area_total + " м²",
                        label: "Площадь участка",
                        isNotEmpty: !ise(offer?.aboutLand?.area.area_total)
                    },
                    {
                        value: offer?.aboutLand?.type,
                        label: "Тип участка",
                        isNotEmpty: !ise(offer?.aboutLand?.type)
                    }
                ]
            }
            characteristics.priceDetails = ({
                label: "О сделке",
                content: [{
                    value: offer?.priceDetails.dealType,
                    label: "Тип сделки",
                    isNotEmpty: !ise(offer?.priceDetails.dealType)
                },
                {
                    value: offer?.priceDetails.additionaly,
                    label: "Торги",
                    isNotEmpty: !ise(offer?.priceDetails.additionaly)
                }]
            })

            break;

        default:
            break;
    }
    if (offer?.description?.features?.length) characteristics.additional.push({
        label: "Удобства",
        content: offer?.description?.features.map(f => ({ label: f, value: f, isNotEmpty: !ise(f) }))
    })

    const qualities = offer?.priceDetails.additionaly ? offer?.priceDetails.additionaly.slice(0) : []

    const showOnline = offer?.fullAdditionaly.filters.includes("Показ онлайн")
    if (showOnline) qualities.push("Показ онлайн")
    return [characteristics, qualities]
}

const getPricePerMeter = (price, totalArea) => {

    let tmpprice = typeof price === "string" ? +(price.replaceAll(" ", "")) : price
    return (tmpprice / +totalArea).toFixed(0)
}

const getParsed = (category, offer) => {
    let title
    let additionalTitle
    let totalArea

    switch (category) {
        case "flat":
            title = `${offer?.aboutFlat?.area?.area_total} м² ${offer?.aboutFlat?.rooms?.rooms_total}-комнатная Квартира`
            additionalTitle = <div>Новостройка, ЖК <MyLink isDisabled={true}>«Дмитровское небо»</MyLink> 4 кв. {offer?.aboudBuilding?.year} г., {offer?.aboutFlat?.floors?.floor_total} этаж из {offer?.aboutFlat?.floors?.floor_current}</div>
            totalArea = offer?.aboutFlat?.area?.area_total
            break;
        case "room":
            title = `${toRussianLanguage.declination({ number: offer?.aboutFlat?.rooms?.rooms_forSale[0], root: "Комнат", isWoman: true })} в ${offer?.aboutFlat?.rooms?.rooms_total}-комнатной Квартире ${offer?.aboutFlat?.area?.area_total} м²`
            additionalTitle = <div>Новостройка, ЖК <MyLink isDisabled={true}>«Дмитровское небо»</MyLink> 4 кв. {offer?.aboudBuilding?.year} г., {offer?.aboutFlat?.floors?.floor_total} этаж из {offer?.aboutFlat?.floors?.floor_current}</div>
            totalArea = offer?.aboutFlat?.area?.area_total
            break;
        case "house":
            title = `${offer?.aboutHouse?.area?.area} м² Дом на Участке ${offer?.aboutLand?.area} м²`
            additionalTitle = undefined
            totalArea = offer?.aboutHouse?.area?.area_total
            break;
        case "garage":
            title = `${offer?.aboutGarage?.area?.total_area} м² Гараж`
            additionalTitle = `в ${offer?.aboutGarage?.name}`
            totalArea = offer?.aboutGarage?.area?.area_total
            break;
        case "commercial":
            title = `Коммерческая недвижимость "${offer?.aboutCommecial?.appointment}" ${offer?.aboutCommecial?.area}  м²`
            additionalTitle = `Под ${offer?.aboutCommecial?.appointment}`
            totalArea = offer?.aboutCommecial?.area?.area_total
            break;
        case "land":
            title = `${offer?.aboutLand?.area?.area_total} м² Участок`
            // additionalTitle = `additionalTitle error ${category}`
            totalArea = offer?.aboutLand?.area?.area_total
            break;

        default:
            break;
    }


    return [title, additionalTitle, totalArea]
}

const getNormalDate = (notNormalDate) => {
    let [date, time] = notNormalDate.split("T")
    time = time.split(".")?.[0]

    const normalDate = date && time ? `${date} ${time}` : notNormalDate

    return normalDate
}


const toGeneralView = (category, offer) => {

    const nameForOfferPage = `${getName(offer.category[0], offer)}`
    const [title, additionalTitle, totalArea] = getParsed(category[0], offer)
    const [characteristics, qualities] = getCharacteristics(category[0], offer)
    const pricePerMeter = getPricePerMeter(offer.priceDetails.price, totalArea)
    const fixedCoords = [
        (+offer.address.map.coords[0]).toFixed(6),
        (+offer.address.map.coords[1]).toFixed(6),
    ]
    const addressTitle = offer?.address.map.title + ` [${fixedCoords[0]}, ${fixedCoords[1]}]`
    let additionalTitleWithLink

    if (offer.FullServiceInfo?.titles?.additionalTitleWithLink?.isExist) {
        const conteiner = offer?.FullServiceInfo.titles.additionalTitleWithLink

        additionalTitleWithLink = [
            conteiner.contentStart
            , <>&nbsp;</>, <MyLink isDisabled={true}>{conteiner.contentIntoLink}</MyLink>
            , <>&nbsp;</>, conteiner.contentEnd]
    }


    const generalViewOffer = {
        _id: offer?._id,
        original: { ...offer },
        generalView: true,
        userId: offer?.userId,
        linkToOffer: `/offer/${offer?.category}/${offer?._id}`,
        type: offer?.type,
        category: offer?.category,
        address: {
            ...offer.address,
            addressTitle: offer?.adress?.map?.title,
            fixedCoords
        },
        description: {
            ...offer.description,
        },
        priceDetails: {
            ...offer.priceDetails,
            pricePerMeter,
            pricePerMeterLabel: `${thousandDelimeterFromStringOrNumber(pricePerMeter)} ₽/м²`,
            priceLabel: `${thousandDelimeter(offer?.priceDetails?.price).formattedString} ₽`,
        },
        titles: {
            ...offer?.FullServiceInfo?.titles,
            addressTitle,
            additionalTitleWithLink
        },
        area: {
            ...offer.area,
            totalArea,

        },
        videoYoutube: offer?.videoYoutube,

        // images: {
        // fistImg: offer?.imgPhotos?.[0],
        // allImages: [...(offer?.imgPhotos ? offer?.imgPhotos : []), ...(offer?.imgPlan ? offer?.imgPlan : [])],
        //    firstIm
        imgPhotos: offer?.imgPhotos,
        imgPlan: offer?.imgPlan,
        firstImg: offer?.imgPhotos?.[0],
        // },
        characteristics,
        qualities,
        createdAt: getNormalDate(offer?.createdAt),
        nameForOfferPage
    }

    return generalViewOffer
}


//    label="ЛСР"
// img="//avatars.mds.yandex.net/get-realty/165294/company.3003453.921567858723861966/builder_logo_info"


// const isAdditionalFiltersExist = (offer) => {

//     const fistDeepKeys = Object.keys(offer)


// }

const offerTransform = {
    toGeneralView,
    // isAdditionalFiltersExist
}

export default offerTransform