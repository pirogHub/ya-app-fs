const structManipulate = require("../../../getSchemaAndRandom");
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
const FullAboutGarage = require("./FullAboutGarage");

const Garage = require("./data")


const garageFullStruct = {
    ...getMongoTypeAndCategory({ type: "sell", category: "garage" }),
    ...FullAddress,
    ...FullAboutGarage,
    ...FullImgPlan,
    ...FullImgPhotos(Garage.data.imgPhotos.guideLabel),
    ...FullDescription({ features: Garage.data.features }),
    ...FullVideoYoutube,
    ...FullPriceDetails(Garage.data.priceDetails),
    ...FullAdditionaly,
    ...getMongoUserId(),
    ...FullServiceInfo
}


const {
    mongoSchema: garageSchema,
    mongoModel: garageModel,
    AuthorWithRandomFuncs: garage_AuthorWithRandomFuncs,
    AuthorStruct: garage_AuthorForClient,
    SeekerWithRandomFuncs: garage_SeekerWithRandomFuncs,
    SeekerStruct: garage_SeekerForClient,
} = structManipulate.generateStructsWithRandomFuncsAndMongoModel(garageFullStruct, "garage")

// console.log("garageSchema", garageSchema);
// console.log("garage_AuthorWithRandomFuncs", garage_AuthorWithRandomFuncs);
// console.log("garage_AuthorForClient", garage_AuthorForClient);
// console.log("...FullDescription(garage.data.features),", { ...FullDescription(garage.data.features) });
const garage = {
    mongo: {
        schema: garageSchema,
        mongoModel: garageModel
    },
    author: {
        client: garage_AuthorForClient,
        random: garage_AuthorWithRandomFuncs,
    },
    seeker: {
        client: garage_SeekerForClient,
        random: garage_SeekerWithRandomFuncs,
    }
}
module.exports = garage
