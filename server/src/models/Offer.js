// const { Schema, model } = require("mongoose")


// const schema = new Schema(
//     {
//         type: [String],
//         category: [String],
//         imgPhotos: [String],
//         imgPlan: [String],
//         video: String,
//         description: {
//             story: String,
//             features: [String]
//         },
//         priceDetails: {
//             price: String,
//             dealType: [String],
//             tax: [String],
//             deposit: String,
//             showOnline: Boolean,
//         },
//         aboutBuilding: {
//             year: String,
//             ceilHeight: String,
//             parking: [String],
//             buildingType: [String]
//         },
//         aboutFlat: {
//             rooms: { rooms_total: [String], rooms_forSale: [String] },
//             area: { area_total: String, area_forLive: String, area_kitchen: String },
//             floors: { floor_cur: String, floor_total: String },
//             buildingStatus: [String],
//             toilet: [String],
//             balcony: [String],
//             typeFloor: [String],
//             renovation: [String],
//             windows: [String],

//         },
//         adress: {
//             title: String,
//             coords: [Number, Number]
//         }
//     },
//     {
//         timestamps: true,
//         typeKey: '$type'
//     })

// module.exports = model("Offer", schema)