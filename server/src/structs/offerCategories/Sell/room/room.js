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


const Room = require("./data")

const roomFullStruct = {
    ...randomMarketType,
    ...getMongoTypeAndCategory({ type: "sell", category: "room" }),
    ...FullAddress,
    ...FullAboutBuilding,
    ...FullAboutFlat("room"),
    ...FullImgPlan,
    ...FullImgPhotos(),
    ...FullDescription({
        GroupLabel: "Удобства и подробности",
        features: Room.data.features
    }),
    ...FullVideoYoutube,
    ...FullPriceDetails(Room.data.priceDetails),
    ...FullAdditionaly,
    ...getMongoUserId(),
    ...FullServiceInfo


}

const {
    mongoSchema: roomSchema,
    mongoModel: roomModel,
    AuthorWithRandomFuncs: room_AuthorWithRandomFuncs,
    AuthorStruct: room_AuthorForClient,
    SeekerWithRandomFuncs: room_SeekerWithRandomFuncs,
    SeekerStruct: room_SeekerForClient,
} = structManipulate.generateStructsWithRandomFuncsAndMongoModel(roomFullStruct, "room")


const room = {
    mongo: {
        schema: roomSchema,
        mongoModel: roomModel
    },
    author: {
        client: room_AuthorForClient,
        random: room_AuthorWithRandomFuncs,
    },
    seeker: {
        client: room_SeekerForClient,
        random: room_SeekerWithRandomFuncs,
    }
}
module.exports = room

