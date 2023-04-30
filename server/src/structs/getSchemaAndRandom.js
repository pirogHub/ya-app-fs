const { keys } = require('lodash');
const _ = require('lodash');
const getRandomImg = require('./randomTools/getRandomImg');
const randomTypeAndCategory = require('./partsOfStructs/randomTypeAndCategory');
const { Schema, model } = require("mongoose");
const randomTools = require('./randomTools/randomTools');
const Author = require('./data/Author');
const toRussianLanguage = require('../../utils/toRussianLanguage');
const connection_offer = require('../connections/offers');



const getTitles = (category, offer) => {
    console.log("getTitles => get title for ", category);
    let mainTitle
    let additionalTitle
    let additionalTitleWithLink = { isExist: false, contentStart: "", contentIntoLink: "", contentEnd: "" }


    switch (category) {
        case "flat":
            mainTitle = `${offer?.aboutFlat?.area?.area_total} м² ${offer?.aboutFlat?.rooms?.rooms_total}-комнатная Квартира`

            additionalTitleWithLink.contentStart = `Новостройка, ЖК `
            additionalTitleWithLink.contentIntoLink = `«Дмитровское небо»`
            additionalTitleWithLink.contentEnd = `4 кварт. ${offer?.aboutBuilding?.year} г., ${offer?.aboutFlat?.floors?.floor_total} этаж из ${offer?.aboutFlat?.floors?.floor_current}`
            additionalTitleWithLink.isExist = true
            break;
        case "room":
            mainTitle = `${toRussianLanguage.declination({ number: offer?.aboutFlat?.rooms?.rooms_forSale[0], root: "Комнат", isWoman: true })} в ${offer?.aboutFlat?.rooms?.rooms_total}-комнатной Квартире ${offer?.aboutFlat?.area?.area_total} м²`

            additionalTitleWithLink.contentStart = `Новостройка, ЖК `
            additionalTitleWithLink.contentIntoLink = `«Дмитровское небо»`
            additionalTitleWithLink.contentEnd = ` 4 кварт. ${offer?.aboutBuilding?.year} г., ${offer?.aboutFlat?.floors?.floor_total} этаж из ${offer?.aboutFlat?.floors?.floor_current}`
            additionalTitleWithLink.isExist = true
            break;
        case "house":
            mainTitle = `${offer?.aboutHouse?.area?.area_total} м² Дом на Участке ${offer?.aboutLand?.area?.area_total} м²`
            additionalTitle = undefined
            break;
        case "garage":
            mainTitle = `${offer?.aboutGarage?.area?.area_total} м² Гараж`
            additionalTitle = `в ${offer?.aboutGarage?.name}`
            break;
        case "commercial":
            mainTitle = `Коммерческая недвижимость "${offer?.aboutCommecial?.appointment}" ${offer?.aboutCommecial?.area?.area_total}  м²`
            additionalTitle = `Под ${offer?.aboutCommecial?.appointment}`
            break;
        case "land":
            mainTitle = `${offer?.aboutLand?.area?.area_total} м² Участок ${offer?.aboutLand?.type}`
            // additionalTitle = `additionalTitle error ${category}`
            break;

        default:
            break;
    }


    return [mainTitle, additionalTitle, additionalTitleWithLink]
}

const generateStructsWithRandomFuncsAndMongoModel = (struct, modelName) => {
    // console.log("generateStructsWithRandomFuncsAndMongoModel", struct);
    if (!struct || !modelName) throw new Error("myError: generateStructsWithRandomFuncsAndMongoModel need struct and modelName")
    const preMongoSchema = {}
    const AuthorWithRandomFuncs = {}
    const AuthorStruct = {}

    const SeekerWithRandomFuncs = {}
    const SeekerStruct = {}

    const deepAnalize = (src, key, keyPath, iter) => {

        if (key === "mongoType") {

            keyPath.push(iter.i.concat())

            let currentPath = iter.i.concat()
            const idxComponents = currentPath.findIndex(i => i === "components")
            if (idxComponents !== -1) currentPath.splice(idxComponents, 1)
            const val = _.at(struct, iter.i.join(".") + ".mongoType")

            currentPath = currentPath.filter(i => i !== "author" && i !== "seeker")

            _.set(preMongoSchema, currentPath, ...val)

            return false
        }
        if (key === "random") {

            let toWhom = "author"
            let toWhomStruct = AuthorWithRandomFuncs

            if (iter.i.includes("seeker")) {
                toWhom = "seeker"
                toWhomStruct = SeekerWithRandomFuncs
            }

            let currentPath = iter.i.concat()
            currentPath = currentPath.filter(i => i !== "components")
            // if (idxComponents !== -1) currentPath.splice(idxComponents, 1)
            if (currentPath.includes("alwaysFilters")) {
                currentPath = currentPath.filter(i => i !== "alwaysFilters")
                currentPath.unshift("alwaysFilters")
            }
            const idxToWhom = currentPath.findIndex(i => i === toWhom)
            if (idxToWhom !== -1) currentPath.splice(idxToWhom, 1)
            // console.log("idxToWhom", idxToWhom, "currentPath", currentPath);
            const val = _.at(struct, iter.i.join(".") + ".random")
            _.set(toWhomStruct, currentPath, ...val)


        }

        if (!Array.isArray(src) && typeof src === "object") { //! если object

            if (key) iter.i.push(`${key}`)

            let isMongoTypeNotDetected = true
            Object.keys(src).map(k => {

                isMongoTypeNotDetected = deepAnalize(src[k], k, keyPath, iter)
                return isMongoTypeNotDetected
            })
            iter.i.pop()
            return isMongoTypeNotDetected

        } else { //-если number, string, array, function, symbol, undefined
            if (key !== "mongoType" && key !== "random") {
                let toWhom = "author"
                let toWhomStruct = AuthorStruct

                if (iter.i.includes("seeker")) {
                    toWhom = "seeker"
                    toWhomStruct = SeekerStruct
                }
                let currentPath = iter.i.concat()
                currentPath.push(key)


                const val = _.at(struct, currentPath.join("."))
                const toWhomIdx = currentPath.findIndex(i => i === toWhom)
                // console.log("toWhomIdx", toWhomIdx, "currentPath", currentPath);
                // currentPath.splice(1, 1)
                if (currentPath.includes("alwaysFilters")) {
                    currentPath = currentPath.filter(i => i !== "alwaysFilters")
                    currentPath.unshift("alwaysFilters")
                }
                currentPath = currentPath.filter(i => i !== "parts")
                if (toWhomIdx !== -1) {
                    currentPath.splice(toWhomIdx, 1)
                    _.set(toWhomStruct, currentPath.join("."), val[0])
                } else {
                    _.set(AuthorStruct, currentPath.join("."), val[0])
                    _.set(SeekerStruct, currentPath.join("."), val[0])
                }


            }
            return true
        }
    }

    const AllKeyPath = []

    const iter = { i: [] }


    deepAnalize(struct, "", AllKeyPath, iter)

    const mongoSchema = new Schema({ ...preMongoSchema }, {
        timestamps: true,
        typeKey: '$type'
    })
    const mongoModel = connection_offer.model(modelName, mongoSchema)

    return {
        mongoSchema, mongoModel,
        AuthorWithRandomFuncs, AuthorStruct,
        SeekerStruct, SeekerWithRandomFuncs
    }
}

const generateRandomValuesFromStructWithRandomFuncs = async (StructWithRandomFuncs, isSeeker, alreadyHadTypeAndCategory) => {
    // console.log("generateRandomValuesFromStructWithRandomFuncs")
    // console.log("---StructWithRandomFuncs", StructWithRandomFuncs);
    // console.log("generateRandomValuesFromStructWithRandomFuncs with:-> StructWithRandomFuncs", StructWithRandomFuncs,);
    const s = _.cloneDeep({ ...StructWithRandomFuncs })
    // console.log("s before cloneDeep", s);
    async function generateRandomFields(struct, parentObj, key) {
        if (typeof struct === "function") {
            // console.log("struct Function:", struct, "parentObj", parentObj);
            if (parentObj) {
                await struct.call(parentObj)
                return true
            }
            else return new Error("Error when <generateRandomValuesFromStructWithRandomFuncs()>. parentObj occured")
        } else if (!Array.isArray(struct) && typeof struct === "object") {
            const mapOfKeys = Object.keys(struct)
            for (let i = 0; i < mapOfKeys.length; i++) {
                if (mapOfKeys[i] === "type" || mapOfKeys[i] === "category") {
                    struct[mapOfKeys[i]]()
                } else {
                    const forAwaiting = await generateRandomFields(struct[mapOfKeys[i]], struct, i)
                    // console.log("b", forAwaiting);
                }
            }



        } else {

            return new Error("Error when <generateRandomValuesFromStructWithRandomFuncs()>. wrong somewhere in struct ")

        }
    }
    await generateRandomFields(s)

    if (alreadyHadTypeAndCategory) {
        s.type = alreadyHadTypeAndCategory?.type
        s.category = alreadyHadTypeAndCategory?.category

    }

    if (!isSeeker) {
        console.log("================================Not Seeker");
        const [mainTitle, additionalTitle, additionalTitleWithLink] = getTitles(s.category[0], s)
        s.FullServiceInfo = {}
        s.FullServiceInfo.titles = {}
        s.FullServiceInfo.titles.mainTitle = mainTitle
        s.FullServiceInfo.titles.additionalTitle = additionalTitle
        s.FullServiceInfo.titles.additionalTitleWithLink = additionalTitleWithLink
    }
    // console.log("s", s);
    return s
}

const getRandomIfUndefined = (type, category, isForse) => {
    console.log("getRandomIfUndefined type", type, "category", category);
    let newType = type
    let newCategory = category
    if (isForse) {
        console.log("create All Random struct");
        newType = [undefined]
        newCategory = [undefined]
    }

    if (!newCategory?.[0]) {
        newCategory = randomTools.getRandomValueFrom(
            randomTools.getBy_From_Withrules(newType, Author.Options.categories, Author.Options.types)
        )
    }

    if (!newType?.[0]) {
        newType = randomTools.getRandomValueFrom(
            randomTools
                .getBy_From_Withrules(newCategory, Author.Options.types, Author.Options.categories)
        )
    }



    return [newType, newCategory]
}

const structManipulate = {
    getRandomIfUndefined,
    generateStructsWithRandomFuncsAndMongoModel,
    generateRandomValuesFromStructWithRandomFuncs,
    getTitles
}

module.exports = structManipulate