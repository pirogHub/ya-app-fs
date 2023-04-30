const structManipulate = require("../../../getSchemaAndRandom")
const FullAboutBuilding = require("../../../partsOfStructs/FullAboutBuilding")
const FullAboutFlat = require("../../../partsOfStructs/FullAboutFlat")
const FullAdditionaly = require("../../../partsOfStructs/FullAdditionaly")
const FullAddress = require("../../../partsOfStructs/FullAddress")
const FullDescription = require("../../../partsOfStructs/FullDescription")
const FullImgPhotos = require("../../../partsOfStructs/FullImgPhotos")
const FullImgPlan = require("../../../partsOfStructs/FullImgPlan")
const FullPriceDetails = require("../../../partsOfStructs/FullPriceDetails")
const FullServiceInfo = require("../../../partsOfStructs/FullServiceInfo")
const FullVideoYoutube = require("../../../partsOfStructs/FullVideoYoutube")
const { getMongoUserId } = require("../../../partsOfStructs/MongoUserId")
const randomMarketType = require("../../../partsOfStructs/randomMarketType")
const getMongoTypeAndCategory = require("../../../partsOfStructs/randomTypeAndCategory")
const randomTypeAndCategory = require("../../../partsOfStructs/randomTypeAndCategory")

const Flat = require("./data")

const flatFullStruct = {
    ...randomMarketType,
    ...getMongoTypeAndCategory({ type: "sell", category: "flat" }),
    ...FullAddress,
    ...FullAboutBuilding,
    ...FullAboutFlat("flat"),
    ...FullImgPlan,
    ...FullImgPhotos(Flat.data.imgPhotos.guideLabel),
    ...FullDescription({
        GroupLabel: "Удобства и подробности",
        features: Flat.data.features
    }),
    ...FullVideoYoutube,
    ...FullPriceDetails(Flat.data.priceDetails),
    ...FullAdditionaly,
    ...getMongoUserId(),
    ...FullServiceInfo


}

const {
    mongoSchema: flatSchema,
    mongoModel: flatModel,
    AuthorWithRandomFuncs: flat_AuthorWithRandomFuncs,
    AuthorStruct: flat_AuthorForClient,
    SeekerWithRandomFuncs: flat_SeekerWithRandomFuncs,
    SeekerStruct: flat_SeekerForClient,
} = structManipulate.generateStructsWithRandomFuncsAndMongoModel(flatFullStruct, "flat")


const flat = {
    mongo: {
        schema: flatSchema,
        mongoModel: flatModel
    },
    author: {
        client: flat_AuthorForClient,
        random: flat_AuthorWithRandomFuncs,
    },
    seeker: {
        client: flat_SeekerForClient,
        random: flat_SeekerWithRandomFuncs,
    }
}
module.exports = flat

