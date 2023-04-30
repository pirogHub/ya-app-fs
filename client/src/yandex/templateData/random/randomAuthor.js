import imgService from "../../services/img.service"
import { superPromise } from "../../utils/superPromise"
import { Options } from "../availableDataOptions"
import dataTools from "../dataTools"
import randomTools from "./randomTools"
import _ from "lodash"

const getRandomOffer = async () => {
    const randomPrice = randomTools.getRandomNumber(10000000, 1000000)
    const randomRooms_total = randomTools.getRandomNumber(6, 1)
    const randomArea_total = randomTools.getRandomNumber(300, 10, 1)
    const randomArea_forLife = randomTools.getRandomNumber(randomArea_total, 10, 1)
    const randomFloors_total = randomTools.getRandomNumber(40, 1)
    const randomFloors_cur = randomTools.getRandomNumber(randomFloors_total, 1)
    const randomType = randomTools.getRandomValueFrom(Options.allOfferTypes)
    const randomCategory = randomTools.getRandomValueFrom(dataTools.getBy_From_Withrules(randomType, Options.allCategories, Options.allOfferTypes))

    const images = await imgService.getRandomImgs()

    const flatPlan = await imgService.getRandomImgs("plan")



    const randomOffer = {
        type: [...randomType],
        category: [...randomCategory],
        images: [...images],
        flatPlan: [...flatPlan],
        video: "https://www.youtube.com/watch?v=pAP9LqDqR_c",
        description: {
            story: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam deserunt commodi nobis. Recusandae repellendus neque quo sit nobis error aut placeat necessitatibus, veritatis corporis pariatur libero reiciendis. Repellat quisquam illo qui porro labore saepe, facilis in provident sint beatae, incidunt, quasi eveniet numquam! Minima, eos molestiae. Numquam laboriosam minus eius quo nulla earum commodi asperiores iste quasi, quae amet. Voluptas ea deserunt obcaecati dolores minus ipsa recusandae nulla eum inventore cum eius consectetur exercitationem qui animi consequatur, maiores expedita debitis architecto consequuntur officiis! Libero error est sequi deserunt voluptatibus quia id iure voluptatem dolor sunt ad, aspernatur doloremque nemo labore?",
            features: [...randomTools.getRandomValueFrom(Options.features, "checkbox")]
        },
        priceDetails: {
            price: `${randomPrice}`,
            dealType: [...randomTools.getRandomValueFrom(Options.dealType)],
            tax: [...randomTools.getRandomValueFrom(Options.taxTypes)],
            deposit: `${randomTools.getRandomNumber(randomPrice, 1000000)}`,
            showOnline: randomTools.getRandomNumber(1, 0) > 0.4
        },
        aboudBuilding: {
            year: `${randomTools.getRandomNumber(1900, 2030)}`,
            ceilHeight: `${randomTools.getRandomNumber(1, 4, 1)}`,
            parking: [...randomTools.getRandomValueFrom(Options.parking)],
            buildingType: [...randomTools.getRandomValueFrom(Options.buildingType)]
        },
        aboutFlat: {
            rooms: { rooms_total: [randomRooms_total], rooms_forSale: [randomTools.getRandomNumber(randomRooms_total, 1)] },
            area: { area_total: `${randomArea_total}`, area_forLive: `${randomArea_forLife}`, area_kitchen: `${(randomArea_total - randomArea_forLife).toFixed(2)}` },
            floors: { floor_cur: `${randomFloors_cur}`, floor_total: `${randomFloors_total}` },
            buildingStatus: [...randomTools.getRandomValueFrom(Options.buildingStatus)],
            toilet: [...randomTools.getRandomValueFrom(Options.toilet)],
            balcony: ["String"],
            typeFloor: [...randomTools.getRandomValueFrom(Options.typeFloor)],
            renovation: [...randomTools.getRandomValueFrom(Options.renovation)],
            windows: [...randomTools.getRandomValueFrom(Options.windows)],

        },
        adress: {
            title: "random",
            center: [randomTools.getRandomNumber(50, -50, 5), randomTools.getRandomNumber(50, -50, 5)]
        }


    }
    console.log("randomOffer", randomOffer);

    return { ...randomOffer }
}



const getSyntheticStateFromDataState = (debugOfRandomPromises, dataState, notWorkingArray) => {
    let randomSeekerWithPromises = {}

    const promises = []


    const syntheticStateWithPromises = {}


    const deepAnalize = (src, key, keyPath, iter) => {
        if (!Array.isArray(src) && typeof src === "object") { //! если object
            if (key) iter.i.push(`${key}`)
            let isMongoTypeNotDetected = true
            Object.keys(src).forEach(k => {

                if (notWorkingArray && notWorkingArray.includes(k)) return
                isMongoTypeNotDetected = deepAnalize(src[k], k, keyPath, iter)
                return isMongoTypeNotDetected
            })
            iter.i.pop()
            return isMongoTypeNotDetected

        } else { //!если number, string, array, function, symbol, undefined

            let currentPath = iter.i.concat()
            const withoutkey = currentPath.slice()
            currentPath.push(key)

            const val = _.at(dataState, currentPath.join("."))
            const promise = superPromise(promises, `${withoutkey.join(".")} ->${key}`)

            _.set(syntheticStateWithPromises, currentPath.join("."), {
                value: val[0],
                promise
            })
            promises.push(promise)
            return true
        }
    }

    const AllKeyPath = []

    const iter = { i: [] }


    deepAnalize(dataState, "", AllKeyPath, iter)

    return [promises, dataState, syntheticStateWithPromises]
}

const RandomAuthor = {
    getRandomOffer,
    getSyntheticStateFromDataState
}

export default RandomAuthor