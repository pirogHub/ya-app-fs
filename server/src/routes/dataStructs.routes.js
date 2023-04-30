const express = require("express")
const _ = require("lodash")
const structManipulate = require("../structs/getSchemaAndRandom")
const allCategories = require("../structs/allCategories")
const router = express.Router({ mergeParams: true })

router.get("/:type/:category/:toWhoom/:random?/:notForce?", async (req, res) => {
    // type = sell | rent_short | rent_long 
    // category = flat | room | house | garage | commercial | land
    // toWhoom = author | seeker
    // ---author:  для получения объекта-структуры для характеристик объекта объявления для страницы добавления объявления /add addOfferPage
    // ---seeker:  для получения объекта-структуры для фильтров для искателя объявлений
    // ---mongoShema:  для получения объекта-структуры mongoShema
    // ---mongoModel:  для получения объекта-структуры mongoModel
    // random = random | ""
    // ---random: выдать объект-структуру случайных значений для 'фильтров'/'параметров объекта объявления'
    // ---"":  выдать объект-структуру компонентов для отрисовки компонентов в react
    try {


        const params = req.params

        console.log("--------------dataStructs.routes.js params:");
        console.group();
        console.log("-type", params?.type);
        console.log("-category", params?.category);
        console.log("-toWhoom", params?.toWhoom);
        console.log("-random", params?.random);
        console.log("-notForce", params?.notForce);
        console.groupEnd();
        const path = []
        let type = ["sell", "rent_short", "rent_long"].includes(params.type) ? params.type : ""
        let category = allCategories.keys.includes(params.category) ? params.category : ""
        // const category = "commercial"


        const [newType, newCategory] = structManipulate.getRandomIfUndefined([type], [category], params?.notForce ? false : params.random === "random")



        type = newType
        category = newCategory

        console.log("dataStructs.routes.js type", type, "category", category);
        path.push(category)
        // path.push(params.toWhoom)

        console.log("dataStructs.routes.js path", path);

        let structToSend = { error: "error" }

        let endPoint
        const isAskServiceInfo = params.toWhoom === "mongoModel" || params.toWhoom === "schema"
        if (isAskServiceInfo) {
            path.push("mongo")
            endPoint = `.${params.toWhoom}`
        } else {
            path.push(params.toWhoom)
            endPoint = ".client"
        }

        if (params.random === "random" && !(isAskServiceInfo)) {
            structToSend = await structManipulate
                .generateRandomValuesFromStructWithRandomFuncs(
                    {
                        ..._.at(allCategories.categories, path.join(".") + ".random")[0]
                    }
                    , params.toWhoom === "seeker" ? true : false,
                    { type, category }
                )

        } else {
            structToSend = _.at(allCategories.categories, path.join(".") + endPoint)[0]
            // structToSend = _.at(allCategories.categories, path.join(".") + ".client")[0]

        }
        console.log("fff");
        console.log("structToSend type", structToSend?.type, "structToSend category", structToSend?.category,);
        // console.log("structToSend ", path.join(".") + endPoint, " ", _.at(allCategories.categories, path.join(".") + endPoint));
        res.json(structToSend)
        res.end()
    } catch (error) {
        res.status(400).send("wrong url or server error")
    }
})

module.exports = router