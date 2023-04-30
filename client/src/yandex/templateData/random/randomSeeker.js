import { superPromise } from "../../utils/superPromise";
import { Options } from "../availableDataOptions";
import Seeker from "../dataSeeker";
import dataTools from "../dataTools";
import randomTools from "./randomTools";

const grvf = randomTools.getRandomValueFrom
const grn = randomTools.getRandomNumberObj


const _maxAllArea = 300
const _maxPrice = 10000000
const _maxFlatFloorsRange = 40
const _maxKitchenArea = 250
const _maxCeilHeight = 4
const _maxYear = 2035
const _maxBuildingFloorsRange = 40
const _minAllArea = 10
const _minPrice = 1000000
const _minFlatFloorsRange = 1
const _minKitchenArea = 9
const _minCeilHeight = 1
const _minYear = 1900
const _minBuildingFloorsRange = 1

const getRandomSeeker = (debugOfRandomPromises, isShowAdditionalFilters) => {
    const canBeEmpty = true


    const randomType = grvf(Seeker.Options.types)
    const randomCategory = grvf(dataTools.getBy_From_Withrules(randomType, Seeker.Options.categories, Seeker.Options.types))

    const allArea_to = grn({ max: _maxAllArea, min: _minAllArea, isString: true, canBeEmpty: true });
    const price_to = grn({ max: _maxPrice, min: _minPrice, isString: true, canBeEmpty: true });

    const shortRandomSeeker = {
        // AlwaysFilters: {
        type: [...randomType],
        category: [...randomCategory],
        rooms: [...grvf(Seeker.Options.roomsCount, canBeEmpty, "checkbox")],//["studio", 1, 2],
        marketType: [...grvf(Seeker.Options.marketType)],
        // }
        //     allArea: {
        allArea_from: `${grn({ max: allArea_to, defMax: _maxAllArea, min: _minAllArea, isString: true, canBeEmpty: true })}`,
        allArea_to: `${allArea_to}`,
        //     },
        //     price: {
        price_from: `${grn({ max: price_to, defMax: _maxPrice, min: _minPrice, isString: true, canBeEmpty: true })}`,
        price_to: `${price_to}`,
        //     }
    }

    let bigRandomSeeker = {}
    if (isShowAdditionalFilters) {

        const Flat_floorsRange_to = grn({ max: _maxFlatFloorsRange, min: _minFlatFloorsRange, isString: true, canBeEmpty: true });
        const kitchenArea_to = grn({ max: allArea_to, defMax: _maxKitchenArea, min: _minKitchenArea, isString: true, canBeEmpty: true });
        const ceilHeight_to = grn({ max: _maxCeilHeight, min: _minCeilHeight, isString: true, canBeEmpty: true });
        const year_to = grn({ max: _maxYear, min: _minYear, isString: true, canBeEmpty: true });
        const building_floorsRange_to = grn({ max: _maxBuildingFloorsRange, min: _minBuildingFloorsRange, isString: true, canBeEmpty: true });

        bigRandomSeeker = {
            flat_floorsRange_from: `${grn({ max: Flat_floorsRange_to, defMax: _maxFlatFloorsRange, min: _minFlatFloorsRange, isString: true, canBeEmpty: true })}`,
            flat_floorsRange_to: `${Flat_floorsRange_to}`,
            //     },
            floorNum: [...grvf(Seeker.Options.floorNum, canBeEmpty, "checkbox")],
            renovation: [...grvf(Options.renovation, canBeEmpty, "checkbox")],
            balcony: [...grvf(Seeker.Options.balcony, canBeEmpty)],
            furniture: [...grvf(Seeker.Options.furniture, canBeEmpty, "checkbox")],
            //    kitchenArea: {
            kitchenArea_from: `${grn({ max: kitchenArea_to, defMax: _maxKitchenArea, min: _minKitchenArea, isString: true, canBeEmpty: true })}`,
            kitchenArea_to: `${kitchenArea_to}`,
            //    },
            //    ceilHeight: {
            ceilHeight_from: `${grn({ max: ceilHeight_to, defMax: _maxCeilHeight, toFixed: 2, min: _minCeilHeight, isString: true, canBeEmpty: true })}`,
            ceilHeight_to: `${ceilHeight_to}`,
            //    },

            toilet: [...grvf(Seeker.Options.toilet, canBeEmpty)],
            dealLaw: [...grvf(Seeker.Options.dealLaw, canBeEmpty)],
            dealType: [...grvf(Seeker.Options.dealType, canBeEmpty)],
            typeFloor: [...grvf(Options.typeFloor, canBeEmpty, "checkbox")],
            windows: [...grvf(Options.windows, canBeEmpty, "checkbox")],
            //},
            //SeekAboutBuilding: {
            //      year: {
            year_from: `${grn({ max: year_to, defMax: _maxYear, min: _minYear, isString: true, canBeEmpty: true })}`,
            year_to: `${year_to}`,
            //      }    
            //},
            //floorsRange: {
            bulding_floorsRange_from: `${grn({ max: building_floorsRange_to, defMax: _maxBuildingFloorsRange, min: _minBuildingFloorsRange, canBeEmpty: true, isString: true })}`,
            bulding_floorsRange_to: `${grn({ max: building_floorsRange_to, defMax: _maxBuildingFloorsRange, min: _minBuildingFloorsRange, canBeEmpty: true, isString: true })}`,
            //},
            parking: [...grvf(Options.parking, canBeEmpty, "checkbox")],
            buildingStatus: [...grvf(Options.buildingStatus, canBeEmpty)],
            buildingType: [...grvf(Options.buildingType, canBeEmpty, "checkbox")],
            // SeekAdress: {
            subwayWay: [...grvf(Seeker.Options.subwayWay)],
            subwayTime: [...grvf(Seeker.Options.subwayTime, canBeEmpty)],
            //},
            //SeekAditionaly: {
            SeekAditionaly: [...grvf(Seeker.Options.anotherFilters, canBeEmpty, "checkbox")],
            //}
        }

    }

    { //AllRandomSeeker
        // const randomSeeker = {
        //     // AlwaysFilters: {
        //     type: [...randomType],
        //     category: [...randomCategory],
        //     rooms: [...grvf(Seeker.Options.roomsCount, canBeEmpty, "checkbox")],//["studio", 1, 2],
        //     marketType: [...grvf(Seeker.Options.marketType)],
        //     // }
        //     //     allArea: {
        //     allArea_from: `${grn({ max: allArea_to, defMax: _maxAllArea, min: _minAllArea, isString: true, canBeEmpty: true })}`,
        //     allArea_to: `${allArea_to}`,
        //     //     },
        //     //     price: {
        //     price_from: `${grn({ max: price_to, defMax: _maxPrice, min: _minPrice, isString: true, canBeEmpty: true })}`,
        //     price_to: `${price_to}`,
        //     //     }
        //     // },
        //     // SeekAboutFlat: {
        //     //     floorsRange: {
        //     flat_floorsRange_from: `${grn({ max: Flat_floorsRange_to, defMax: _maxFlatFloorsRange, min: _minFlatFloorsRange, isString: true, canBeEmpty: true })}`,
        //     flat_floorsRange_to: `${Flat_floorsRange_to}`,
        //     //     },
        //     floorNum: [...grvf(Seeker.Options.floorNum, canBeEmpty, "checkbox")],
        //     renovation: [...grvf(Options.renovation, canBeEmpty, "checkbox")],
        //     balcony: [...grvf(Seeker.Options.balcony, canBeEmpty)],
        //     furniture: [...grvf(Seeker.Options.furniture, canBeEmpty, "checkbox")],
        //     //    kitchenArea: {
        //     kitchenArea_from: `${grn({ max: kitchenArea_to, defMax: _maxKitchenArea, min: _minKitchenArea, isString: true, canBeEmpty: true })}`,
        //     kitchenArea_to: `${kitchenArea_to}`,
        //     //    },
        //     //    ceilHeight: {
        //     ceilHeight_from: `${grn({ max: ceilHeight_to, defMax: _maxCeilHeight, toFixed: 2, min: _minCeilHeight, isString: true, canBeEmpty: true })}`,
        //     ceilHeight_to: `${ceilHeight_to}`,
        //     //    },

        //     toilet: [...grvf(Seeker.Options.toilet, canBeEmpty)],
        //     dealLaw: [...grvf(Seeker.Options.dealLaw, canBeEmpty)],
        //     dealType: [...grvf(Seeker.Options.dealType, canBeEmpty)],
        //     typeFloor: [...grvf(Options.typeFloor, canBeEmpty, "checkbox")],
        //     windows: [...grvf(Options.windows, canBeEmpty, "checkbox")],
        //     //},
        //     //SeekAboutBuilding: {
        //     //      year: {
        //     year_from: `${grn({ max: year_to, defMax: _maxYear, min: _minYear, isString: true, canBeEmpty: true })}`,
        //     year_to: `${year_to}`,
        //     //      }    
        //     //},
        //     //floorsRange: {
        //     bulding_floorsRange_from: `${grn({ max: building_floorsRange_to, defMax: _maxBuildingFloorsRange, min: _minBuildingFloorsRange, canBeEmpty: true, isString: true })}`,
        //     bulding_floorsRange_to: `${grn({ max: building_floorsRange_to, defMax: _maxBuildingFloorsRange, min: _minBuildingFloorsRange, canBeEmpty: true, isString: true })}`,
        //     //},
        //     parking: [...grvf(Options.parking, canBeEmpty, "checkbox")],
        //     buildingStatus: [...grvf(Options.buildingStatus, canBeEmpty)],
        //     buildingType: [...grvf(Options.buildingType, canBeEmpty, "checkbox")],
        //     // SeekAdress: {
        //     subwayWay: [...grvf(Seeker.Options.subwayWay)],
        //     subwayTime: [...grvf(Seeker.Options.subwayTime, canBeEmpty)],
        //     //},
        //     //SeekAditionaly: {
        //     SeekAditionaly: [...grvf(Seeker.Options.anotherFilters, canBeEmpty, "checkbox")],
        //     //}
        // }
    }

    const randomSeeker = { ...shortRandomSeeker, ...bigRandomSeeker }

    // let randomSeekerWithPromises = {}
    // // let debugOfRandomPromises = {}
    // const promises = []
    // Object.keys(randomSeeker).forEach(f => {
    //     debugOfRandomPromises[f] = false
    //     const promise = superPromise(debugOfRandomPromises, f)
    //     randomSeekerWithPromises = {
    //         ...randomSeekerWithPromises,
    //         [f]: {
    //             value: randomSeeker[f],
    //             promise
    //         }
    //     }

    //     promises.push(promise)
    // })

    // return [promises, { ...randomSeeker }, randomSeekerWithPromises]
    return getSpesialStateForInitSyntheticFilters(debugOfRandomPromises, randomSeeker)
}

const getSpesialStateForInitSyntheticFilters = (debugOfRandomPromises, randomSeeker) => {
    let randomSeekerWithPromises = {}
    // let debugOfRandomPromises = {}
    const promises = []
    Object.keys(randomSeeker).forEach(f => {
        debugOfRandomPromises[f] = false
        const promise = superPromise(debugOfRandomPromises, f)
        randomSeekerWithPromises = {
            ...randomSeekerWithPromises,
            [f]: {
                value: randomSeeker[f],
                promise
            }
        }

        promises.push(promise)
    })



    return [promises, { ...randomSeeker }, randomSeekerWithPromises]
}


const getRandomSeekerWithOutMainFields = () => {
    const canBeEmpty = true

    const usualRandomSeeker = getRandomSeeker()
    const tmp = Object.keys(usualRandomSeeker).reduce((acc, f) => {

        acc = { ...acc, ...(usualRandomSeeker[f]) }
        return acc
    }, {})

    // console.log("tmp", tmp);
    return { ...tmp }

}



const RandomSeeker = {
    getRandomSeeker,
    getSpesialStateForInitSyntheticFilters
    // getRandomSeekerWithOutMainFields
}

export default RandomSeeker