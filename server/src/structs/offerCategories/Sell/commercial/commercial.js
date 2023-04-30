const structManipulate = require("../../../getSchemaAndRandom");
const FullAboutCommercial = require("../../../partsOfStructs/FullAboutCommercial");
const FullAdditionaly = require("../../../partsOfStructs/FullAdditionaly");
const FullAddress = require("../../../partsOfStructs/FullAddress");
const FullDescription = require("../../../partsOfStructs/FullDescription");
const FullImgPlan = require("../../../partsOfStructs/FullImgPlan")
const FullImgPhotos = require("../../../partsOfStructs/FullImgPhotos");
const FullPriceDetails = require("../../../partsOfStructs/FullPriceDetails");
const FullServiceInfo = require("../../../partsOfStructs/FullServiceInfo");
const FullVideoYoutube = require("../../../partsOfStructs/FullVideoYoutube");
const { getMongoUserId } = require("../../../partsOfStructs/MongoUserId");
const getMongoTypeAndCategory = require("../../../partsOfStructs/randomTypeAndCategory");
const Commercial = require("./data");




const commercialFullStruct = {
    // ...randomTypeAndCategory,
    ...getMongoTypeAndCategory({ type: "sell", category: "commercial" }),
    ...FullAddress,
    ...FullAboutCommercial,
    ...FullImgPlan,
    ...FullImgPhotos(Commercial.data.imgPhotos.guideLabel),
    ...FullDescription(), // немного другие
    ...FullVideoYoutube,
    ...FullPriceDetails(Commercial.data.priceDetails), // немного другие
    ...FullAdditionaly,
    ...getMongoUserId(),
    ...FullServiceInfo
}

const {
    mongoSchema: commercialSchema,
    mongoModel: commercialModel,
    AuthorWithRandomFuncs: commercial_AuthorWithRandomFuncs,
    AuthorStruct: commercial_AuthorForClient,
    SeekerWithRandomFuncs: commercial_SeekerWithRandomFuncs,
    SeekerStruct: commercial_SeekerForClient,
} = structManipulate.generateStructsWithRandomFuncsAndMongoModel(commercialFullStruct, "commercial")


const commercial = {
    mongo: {
        schema: commercialSchema,
        mongoModel: commercialModel
    },
    author: {
        client: commercial_AuthorForClient,
        random: commercial_AuthorWithRandomFuncs,
    },
    seeker: {
        client: commercial_SeekerForClient,
        random: commercial_SeekerWithRandomFuncs,
    }
}

module.exports = commercial