const Random_Plan = require("../../models/randoms/randomPlanSchema")
const Random_Img = require("../../models/randoms/randomImgSchema")

const config = require("config")

const ArrayList = require("arraylist")
const indexesArr = []
const addIndexes = (count) => {
    for (let i = indexesArr.length; i < count; i++) {
        indexesArr.push(i)
    }
}

const alreadyFetchedRandomImgs = {
    plan: {
        expiresIn: 0,
        content: []
    },
    photo: {
        expiresIn: 0,
        content: []
    }
}



const getRandomImg = async (type = "photos", getOne = false) => {

    const resultArr = []
    const path = (type === "plan") ? "plan" : "photo"

    const curSchema = type === "plan" ? Random_Plan : Random_Img

    try {

        if (
            !alreadyFetchedRandomImgs?.[path]?.content?.length
            || alreadyFetchedRandomImgs?.[path]?.expiresIn < Date.now()
        ) {
            console.log("------------------------------------------------Ask Img from Db ", type);
            console.log("1");
            const entities = await curSchema.find()
            // console.log("entities", entities.length);
            // console.log("2");
            if (!Array.isArray(entities)) {
                alreadyFetchedRandomImgs[path].content = [entities.name]
            } else {

                alreadyFetchedRandomImgs[path].content = entities.map(i => i.name)
            }


            alreadyFetchedRandomImgs[path].expiresIn = Date.now() + 1000 * 60 * 60 * 24

        }
        // const docsCount = await curSchema.countDocuments({})
        const docsCount = alreadyFetchedRandomImgs?.[path]?.content?.length

        if (indexesArr.length < docsCount) addIndexes(docsCount)
        const list = new ArrayList
        list.add(indexesArr.slice(0, docsCount))

        if (type === "plan") {
            randomCount = Math.floor(Math.random() * (4 - 1) + 1)
        } else {
            randomCount = Math.floor(Math.random() * (10 - 5) + 5)
        }
        const condition = (i) => {
            if (getOne) return i < 1
            else return i < randomCount && i < docsCount
        }
        for (let i = 0; condition(i); i++) {
            // var random = Math.floor(Math.random() * (docsCount - 1))
            var random = Math.floor(Math.random() * (list.size() - 1))
            const randomIdx = list.get(random)
            list.remove(random)

            // const randomImgName = await curSchema.findOne().skip(randomIdx).exec()
            // const name = randomImgName.name
            // const link = `http://localhost:8080/api/img/random/${type}/${name}`

            const name = alreadyFetchedRandomImgs[path].content[randomIdx]
            const link = `${config.get('serverUrl')}/api/img/random/${type}/${name}`


            if (!resultArr.includes(link)) resultArr.push(link)

        }

    }
    catch (e) {
        console.log("getRandomImg ERRRORORR", e);
    }


    // }
    console.log("getRandomImg success for ", type);
    return resultArr
}

module.exports = getRandomImg