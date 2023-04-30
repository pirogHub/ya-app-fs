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

const House = require("./data");
const FullAboutHouse = require("./data/FullAboutHouse");
const FullAboutLand = require("./data/FullAboutLand");


const houseFullStruct = {
    ...getMongoTypeAndCategory({ type: "sell", category: "house" }),
    ...FullAddress,
    ...FullAboutLand,
    ...FullAboutHouse,
    ...FullImgPlan,
    ...FullImgPhotos(House.data.imgPhotos.guideLabel),
    ...FullDescription({
        GroupLabel: "Удобства и подробности",
        features: House.data.features
    }),
    ...FullVideoYoutube,
    ...FullPriceDetails(House.data.priceDetails),
    ...FullAdditionaly,
    ...getMongoUserId(),
    ...FullServiceInfo
}


const {
    mongoSchema: houseSchema,
    mongoModel: houseModel,
    AuthorWithRandomFuncs: house_AuthorWithRandomFuncs,
    AuthorStruct: house_AuthorForClient,
    SeekerWithRandomFuncs: house_SeekerWithRandomFuncs,
    SeekerStruct: house_SeekerForClient,
} = structManipulate.generateStructsWithRandomFuncsAndMongoModel(houseFullStruct, "house")

// console.log("houseSchema", houseSchema);
// console.log("house_AuthorWithRandomFuncs", house_AuthorWithRandomFuncs);
// console.log("house_AuthorForClient", house_AuthorForClient);
// console.log("...FullDescription(house.data.features),", { ...FullDescription(house.data.features) });
const house = {
    mongo: {
        schema: houseSchema,
        mongoModel: houseModel
    },
    author: {
        client: house_AuthorForClient,
        random: house_AuthorWithRandomFuncs,
    },
    seeker: {
        client: house_SeekerForClient,
        random: house_SeekerWithRandomFuncs,
    }
}
module.exports = house
