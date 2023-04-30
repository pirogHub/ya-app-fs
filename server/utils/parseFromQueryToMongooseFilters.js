const setToField = (obj, parentFieldName, fieldName, value) => {
    if (!(obj?.[parentFieldName])) obj[parentFieldName] = {}
    obj[parentFieldName][fieldName] = value
    // if (fieldName === "$gte")  obj[parentFieldName].$gte = value
    // if (fieldName === "$gte")  obj[parentFieldName].$gte = value

}

const parseFromQueryToMongooseFilters = (filters) => {

    const mongooseFilters = {}
    // type: [String],
    if (filters?.category)
        mongooseFilters.category = filters.category


    // images: [String],
    // flatPlan: [String],
    // video: String,
    // description: {
    // story: String,
    //! "description.features": [String],
    // },
    // priceDetails: {
    if (filters?.price_from) setToField(mongooseFilters, "priceDetails.price", "$gte", filters.price_from)
    if (filters?.price_to) setToField(mongooseFilters, "priceDetails.price", "$lte", filters.price_to)
    //  "priceDetails.price": { $gte: filters.price_from, $lte: filters.price_to },
    // !"priceDetails.dealType": [String],
    // !"priceDetails.tax": [String],
    // !"priceDetails.deposit": String,
    // !"priceDetails.showOnline": Boolean,
    // },
    // aboutBuilding: {
    if (filters?.year_from) setToField(mongooseFilters, "aboutBuilding.year", "$gte", filters.year_from)
    if (filters?.year_to) setToField(mongooseFilters, "aboutBuilding.year", "$lte", filters.year_to)
    //"aboutBuilding.year": { $gte: filters.year_from, $lte: filters.year_to },
    //"aboutBuilding.ceilHeight": { $gte: filters.ceilGeight_from, $lte: filters.ceilGeight_to },

    if (filters?.parking && filters.parking.length) mongooseFilters["aboutBuilding.parking"] = { $in: filters.parking }
    if (filters?.buildingType && filters.buildingType.length) mongooseFilters["aboutBuilding.buildingType"] = { $in: filters.buildingType }
    //"aboutBuilding.parking": { $in: filters.parking },
    //"aboutBuilding.buildingType": { $in: filters.buildingType },


    // },
    // aboutFlat: {
    //! "aboutFlat.rooms.rooms_total": [String] ,
    //! "aboutFlat.rooms.rooms_forSale": [String] ,

    // "aboutFlat.area.area_total": { $gte: filters.allArea_from, $lte: filters.allArea_to },
    //! "aboutFlat.area.area_forLive": String ,
    if (filters?.allArea_from) setToField(mongooseFilters, "aboutFlat.area.area_total", "$gte", filters.allArea_from)
    if (filters?.allArea_to) setToField(mongooseFilters, "aboutFlat.area.area_total", "$lte", filters.allArea_to)

    // "aboutFlat.area.area_kitchen": { $gte: filters.kitchenArea_from, $lte: filters.kitchenArea_to },
    if (filters?.kitchenArea_from) setToField(mongooseFilters, "aboutFlat.area.area_kitchen", "$gte", filters.kitchenArea_from)
    if (filters?.kitchenArea_to) setToField(mongooseFilters, "aboutFlat.area.area_kitchen", "$lte", filters.kitchenArea_to)

    // "aboutFlat.floors.floor_cur": { $gte: filters.flat_floorsRange_from, $lte: filters.flat_floorsRange_to },
    if (filters?.flat_floorsRange_from) setToField(mongooseFilters, "aboutFlat.floors.floor_cur", "$gte", filters.flat_floorsRange_from)
    if (filters?.flat_floorsRange_to) setToField(mongooseFilters, "aboutFlat.floors.floor_cur", "$lte", filters.flat_floorsRange_to)

    // "aboutFlat.floors.floor_total": { $gte: filters.bulding_floorsRange_from, $lte: filters.bulding_floorsRange_to },
    if (filters?.bulding_floorsRange_from) setToField(mongooseFilters, "aboutFlat.floors.floor_total", "$gte", filters.bulding_floorsRange_from)
    if (filters?.bulding_floorsRange_to) setToField(mongooseFilters, "aboutFlat.floors.floor_total", "$lte", filters.bulding_floorsRange_to)

    // "aboutFlat.buildingStatus": { $in: filters.buildingStatus },
    if (filters?.buildingStatus && filters.buildingStatus.length) mongooseFilters["aboutFlat.buildingStatus"] = { $in: filters.buildingStatus }

    // "aboutFlat.toilet": { $in: filters.toilet },
    // !"aboutFlat.balcony": [String],
    if (filters?.toilet && filters.toilet.length) mongooseFilters["aboutFlat.toilet"] = { $in: filters.toilet }

    // "aboutFlat.typeFloor": { $in: filters.typeFloor },
    if (filters?.typeFloor && filters.typeFloor.length) mongooseFilters["aboutFlat.typeFloor"] = { $in: filters.typeFloor }

    // "aboutFlat.renovation": { $in: filters.renovation },
    if (filters?.renovation && filters.renovation.length) mongooseFilters["aboutFlat.renovation"] = { $in: filters.renovation }

    // "aboutFlat.windows": { $in: filters.windows },
    if (filters?.windows && filters.windows.length) mongooseFilters["aboutFlat.windows"] = { $in: filters.windows }

    // },
    // adress: {
    //     title: String,
    //     coords: [Number, Number]
    // }




    return { ...mongooseFilters }
}

const parseFromQueryToMongooseFiltersNew = (obj) => {

    issues = ["marketType", "clarification", "fullAdditionaly"]



    const mongooseFilters = {}

    const path = { i: [] }
    const mongoFilters = ["$gte", "$lte", "$in"]

    const deepTransform = (src, key) => {


        if (mongoFilters.includes(key)) {
            let curPath = path.i.concat()
            // if (curPath.includes("aboutBuilding")) curPath = curPath.map(i => i === "aboutBuilding" ? "aboudBuilding" : i)
            mongooseFilters[curPath.join(".")] = { [key]: src }
        } else {
            if (key) path.i.push(key)
            if (Array.isArray(src)) {
                let curPath = path.i.concat()
                // if (curPath.includes("aboutBuilding")) curPath = curPath.map(i => i === "aboutBuilding" ? "aboudBuilding" : i)
                mongooseFilters[curPath.join(".")] = { "$in": src }
            }
        }

        if (!Array.isArray(src) && typeof src === "object") {
            Object.keys(src).forEach(k => {
                if (issues.includes(k)) { }
                else { deepTransform(src[k], k) }
            })

        }

        if (key && path.i.includes(key)) path.i = path.i.filter(i => i !== key)


    }
    deepTransform(obj)
    return { ...mongooseFilters }
}

module.exports = {
    parseFromQueryToMongooseFilters,
    parseFromQueryToMongooseFiltersNew
}


// {
//      // type: [String],
//      category: filters.category,


//      // images: [String],
//      // flatPlan: [String],
//      // video: String,
//      // description: {
//      // story: String,
//      //! "description.features": [String],
//      // },
//      // priceDetails: {
//      "priceDetails.price": { $gte: filters.price_from, $lte: filters.price_to },
//      // !"priceDetails.dealType": [String],
//      // !"priceDetails.tax": [String],
//      // !"priceDetails.deposit": String,
//      // !"priceDetails.showOnline": Boolean,
//      // },
//      // aboutBuilding: {
//      "aboutBuilding.year": { $gte: filters.year_from, $lte: filters.year_to },
//      "aboutBuilding.ceilHeight": { $gte: filters.ceilGeight_from, $lte: filters.ceilGeight_to },
//      "aboutBuilding.parking": { $in: filters.parking },
//      "aboutBuilding.buildingType": { $in: filters.buildingType },


//      // },
//      // aboutFlat: {
//      //! "aboutFlat.rooms.rooms_total": [String] ,
//      //! "aboutFlat.rooms.rooms_forSale": [String] ,
//      "aboutFlat.area.area_total": { $gte: filters.allArea_from, $lte: filters.allArea_to },
//      //! "aboutFlat.area.area_forLive": String ,
//      "aboutFlat.area.area_kitchen": { $gte: filters.kitchenArea_from, $lte: filters.kitchenArea_to },
//      "aboutFlat.floors.floor_cur": { $gte: filters.flat_floorsRange_from, $lte: filters.flat_floorsRange_to },
//      "aboutFlat.floors.floor_total": { $gte: filters.bulding_floorsRange_from, $lte: filters.bulding_floorsRange_to },
//      "aboutFlat.buildingStatus": { $in: filters.buildingStatus },
//      "aboutFlat.toilet": { $in: filters.toilet },
//      // !"aboutFlat.balcony": [String],
//      "aboutFlat.typeFloor": { $in: filters.typeFloor },
//      "aboutFlat.renovation": { $in: filters.renovation },
//      "aboutFlat.windows": { $in: filters.windows },

//      // },
//      // adress: {
//      //     title: String,
//      //     coords: [Number, Number]
//      // }

// }