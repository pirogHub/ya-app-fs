const structManipulate = require("../../../getSchemaAndRandom");
const FullAboutLand = require("./data/FullAboutLand");
const FullAdditionaly = require("../../../partsOfStructs/FullAdditionaly");
const FullAddress = require("../../../partsOfStructs/FullAddress");
const FullDescription = require("../../../partsOfStructs/FullDescription");
const FullImgPlan = require("../../../partsOfStructs/FullImgPlan")
const FullImgPhotos = require("../../../partsOfStructs/FullImgPhotos");
const FullPriceDetails = require("../../../partsOfStructs/FullPriceDetails");
const FullVideoYoutube = require("../../../partsOfStructs/FullVideoYoutube");



const Land = require("./data");
const getMongoTypeAndCategory = require("../../../partsOfStructs/randomTypeAndCategory");
const { getMongoUserId } = require("../../../partsOfStructs/MongoUserId");
const FullServiceInfo = require("../../../partsOfStructs/FullServiceInfo");

const landFullStruct = {
    ...getMongoTypeAndCategory({ type: "sell", category: "land" }),
    ...FullAddress,
    ...FullAboutLand,
    ...FullImgPlan,
    ...FullImgPhotos(Land.data.imgPhotos.guideLabel),
    ...FullDescription(), // немного другие
    ...FullVideoYoutube,
    ...FullPriceDetails(Land.data.priceDetails), // немного другие
    ...FullAdditionaly,
    ...getMongoUserId(),
    ...FullServiceInfo
}


const {
    mongoSchema: landSchema,
    mongoModel: landModel,
    AuthorWithRandomFuncs: land_AuthorWithRandomFuncs,
    AuthorStruct: land_AuthorForClient,
    SeekerWithRandomFuncs: land_SeekerWithRandomFuncs,
    SeekerStruct: land_SeekerForClient,
} = structManipulate.generateStructsWithRandomFuncsAndMongoModel(landFullStruct, "land")


const land = {
    mongo: {
        schema: landSchema,
        mongoModel: landModel
    },
    author: {
        client: land_AuthorForClient,
        random: land_AuthorWithRandomFuncs,
    },
    seeker: {
        client: land_SeekerForClient,
        random: land_SeekerWithRandomFuncs,
    }
}

module.exports = land