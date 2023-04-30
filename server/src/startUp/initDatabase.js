// const { objectTemplate, generateItem } = require("./filters")

// const Offer = require("../models/Offer")


// async function createInitialOrdersEntity(Model, count) {
//     // await Model.collection.drop()
//     console.log("createInitialOrdersEntity dropped");
//     const a = Array.from(Array(count).keys())
//     return Promise.all(
//         a.map(async () => {
//             try {

//                 const newItem = new Model({ ...generateItem(objectTemplate) })

//                 // console.log("Item created", newItem);
//                 console.log("createInitialOrdersEntity Item created");
//                 const err = await newItem.save()
//                 console.log("createInitialOrdersEntity Item saved", err);
//                 return newItem
//             } catch (error) {
//                 return error
//             }
//         })
//     )
// }


// async function initDatabase() {
//     console.log("function initDatabase");
//     const orders = await Offer.find()
//     console.log(orders.length);
//     if (orders.length !== 10) {
//         createInitialOrdersEntity(Order, 10)
//     }

//     // console.log("initDatabase");
//     // const SimpleModels = await SimpleModel.find()
//     // console.log(SimpleModels.length);
//     // if (SimpleModels.length !== 10) {
//     //     createInitialOrdersEntity(SimpleModel, 10)
//     // }

// }

// module.exports = initDatabase