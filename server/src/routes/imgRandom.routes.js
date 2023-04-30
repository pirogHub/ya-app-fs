const express = require("express")
const Random_Plan = require("../models/randoms/randomPlanSchema")
const Random_Img = require("../models/randoms/randomImgSchema")
const User = require("../models/User")
const _ = require("lodash")
const ArrayList = require("arraylist")
const fs = require("fs");
const formidable = require('formidable');
const structManipulate = require("../structs/getSchemaAndRandom")
const allCategories = require("../structs/allCategories")
const randomTools = require("../structs/randomTools/randomTools")
const Author = require("../structs/data/Author")
const randomNames = require("../structs/randomTools/randomUsers/genderKits")

const tokenService = require("../services/token.service")
const AuthorTestUser = require("../models/AuthorTestUser")
const generateRandomUser = require("../services/random.service")
const femaleNames = require("../structs/randomTools/randomUsers/femaleKit")
const maleNames = require("../structs/randomTools/randomUsers/maleKit")
const genderKits = require("../structs/randomTools/randomUsers/genderKits")
const femaleKit = require("../structs/randomTools/randomUsers/femaleKit")


const router = express.Router({ mergeParams: true })

///массив-лист для вырезания индексов уже полученных фото
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

const userIds = [
    "6447fe3d2bb9d217a9672295",
    "6447fe912bb9d217a96722a0",
    "6447feb82bb9d217a96722aa",
    "6447fed22bb9d217a96722b4",
    "6447fef22bb9d217a96722be",
    "6448015f2bb9d217a9672328",
    "64481aa5837bc10d1e918f10",
    "64481ac4837bc10d1e918f1b",
    "64481b10837bc10d1e918f26",
    "64481b34837bc10d1e918f31"
]

const offersStatistic = {
    types: {},
    categories: {}

}

let userNum = 1

const countStatistic = (type, category) => {
    offersStatistic.types[type] = offersStatistic.types[type] !== undefined ? offersStatistic.types[type] + 1 : 0
    offersStatistic.categories[category] = offersStatistic.categories[category] !== undefined ? offersStatistic.categories[category] + 1 : 0
}

router.get("/random/statistic", async (req, res) => {


    res.status(201).json({ offersStatistic })

})


router.get("/random/generate10", async (req, res) => {
    console.log("/random/generate10");

    try {
        const obj = {}
        // const gender = "female"
        // const namesArr = maleNames.reverse()
        for await (const g_kit of genderKits) {

            const namesArr = g_kit.names
            const gender = g_kit.gender
            userNum = 1
            for await (const name of namesArr) {
                // const userDb = await User.findById(id)
                console.log(`for ${name}`);
                const [newUser, newUserAuthor] = await generateRandomUser(name, gender)
                const userName = name
                console.group(`for user ${userName} id: ${newUser._id}`);
                obj[userName] = {}
                userNum++
                const randomCount = Math.floor(Math.random() * (25 - 6) + 1)
                for (let i = 0; i < randomCount; i++) {
                    console.log("i-", i, "/", randomCount, `---------------gender_pack:${gender}`, userNum, "/", namesArr.length, `${userName} <${gender}> id: ${newUser._id}`)

                    console.group()

                    // const [newType, newCategory] = structManipulate.getRandomIfUndefined([undefined], [undefined])
                    const newCategory = randomTools.getRandomValueFrom(randomTools.getDefault(Author.Options.categories))
                    const newType = randomTools.getRandomValueFrom(
                        randomTools
                            .getBy_From_Withrules(newCategory, Author.Options.types, Author.Options.categories)
                    )
                    obj[userName][i] = [newType?.[0], newCategory?.[0]]
                    countStatistic(newType, newCategory)
                    const path = []
                    type = newType
                    category = newCategory
                    // type = ["sell"]
                    // category = ["commercial"]
                    path.push(category)
                    path.push("author")
                    console.log("--type", type, "category", category);
                    structToSend = await structManipulate
                        .generateRandomValuesFromStructWithRandomFuncs(
                            {
                                ..._.at(allCategories.categories, path.join(".") + ".random")[0]
                            }
                            , false,
                            { type, category }
                        )
                    console.log("--random Data generated");
                    // res.status(201).json(structToSend)
                    const curOfferModel = _.at(allCategories.categories, category + ".mongo.mongoModel")[0]

                    if (!curOfferModel) {
                        console.log("--wrong current modelOffer");
                        throw new Error("wrong current modelOffer")
                    }
                    console.log("--curOfferModel get successful");
                    const newOffer = new curOfferModel({ ...structToSend })
                    newOffer.userId = newUser._id
                    console.log("--offer created");

                    const err = await newOffer.save()
                    console.log("--offer saved");
                    newUser.public.offerList.push(`/${category}/${newOffer._id}`)
                    newUserAuthor.public.offerList.push(`/${category}/${newOffer._id}`)
                    console.log("--offer pushed to user");
                    await newUser.save()
                    await newUserAuthor.save()
                    console.log("--user saved");
                    console.groupEnd()
                    // res.status(201).json(newOffer)
                }
                console.groupEnd()
            }
        }
        res.status(201).json({ offersStatistic, obj })

    } catch (error) {
        console.log("error", error);
        res.json(error)
    }

})

// для получения изображения/изображений из базы рандомных изображений
router.get("/random/:type/:what/:randomNumFromReactClient?", async (req, res) => {
    let { type, what } = req.params
    // type = plan | photo
    // ---plan:  изображения-планы объекта
    // ---photo:  изображения-фото объекта
    // what = list | url | oneImg
    // ---randomList: выдать массив случайных изображений
    // ---`url`: выдать одно изображение по `url`
    // ---oneImg: получить любое ОДНО изображение в зависимости от type
    if (type && what) {
        const path = (type === "plan") ? "plan" : "photo"

        const curSchema = type === "plan" ? Random_Plan : Random_Img
        if (
            !alreadyFetchedRandomImgs?.[path]?.content?.length
            || alreadyFetchedRandomImgs?.[path]?.expiresIn < Date.now()
        ) {


            const entities = await curSchema.find()

            if (!Array.isArray(entities)) {
                alreadyFetchedRandomImgs[path].content = [entities.name]
            } else {

                alreadyFetchedRandomImgs[path].content = entities.map(i => i.name)
            }


            alreadyFetchedRandomImgs[path].expiresIn = Date.now() + 1000 * 60 * 60 * 24

        }

        if (what) {
            try {
                if (what === 'randomList' || what === "oneImg") {

                    let randomCount = 1
                    const resultArr = []
                    // const docsCount = await curSchema.countDocuments({})
                    const docsCount = alreadyFetchedRandomImgs?.[path]?.content?.length


                    if (indexesArr.length < docsCount) addIndexes(docsCount)
                    const list = new ArrayList
                    list.add(indexesArr.slice(0, docsCount))
                    if (what === "randomList") {
                        if (type === "plan") { // изображения-планы объекта
                            randomCount = Math.floor(Math.random() * (4 - 1) + 1)
                        } else { // type === "photo" изображения-фото объекта
                            randomCount = Math.floor(Math.random() * (10 - 5) + 5)
                        }
                    }
                    for (let i = 0; i < randomCount && i < docsCount; i++) {
                        var random = Math.floor(Math.random() * (list.size() - 1))
                        const randomIdx = list.get(random)
                        list.remove(random)


                        const name = alreadyFetchedRandomImgs[path].content[randomIdx]
                        // const randomImgName = await curSchema.findOne().skip(randomIdx).exec()
                        // const name = randomImgName.name
                        if (what === "oneImg") what = name
                        const link = `http://localhost:8080/api/img/random/${type}/${name}`

                        resultArr.push(link)

                    }
                    if (what === "randomList") {
                        // const dataToSend = what === "oneImg" ? resultArr?.[0] : resultArr
                        console.log(`imgRandom.routes.js get(/:${type}/:${what} `);
                        res.status(200).send(resultArr)
                        res.end()
                    }
                }

                if (what !== 'randomList' && what !== "oneImg") { // тогда what - `url` изображения

                    const img = await curSchema.find(({ name: what }))
                    const buffer = img[0].img.data
                    // console.log(`get(/:${type}/:${what} `);
                    res.writeHead(200, {
                        'Content-Type': img[0].img.contentType,
                        'Content-Length': buffer.length
                    })
                    res.end(buffer);

                }
            } catch (error) {
                console.log(`imgRandom.routes.js err: database when img ${error}`);
                res.status(401).send(`err: database when img ${error}`)
                res.end()
            }
        }


    } else {
        console.log(`imgRandom.routes.js err: when img ${imgName}`);
        res.status(401).send(`err: when img ${imgName}`)
        res.end()
    }



    // if (type) {
    //     const curSchema = type === "plan" ? Random_Plan : Random_Img
    //     if (what) {
    //         try {
    //             if (what === 'randomList') {

    //                 const resultArr = []
    //                 const docsCount = await curSchema.countDocuments({})

    //                 if (indexesArr.length < docsCount) addIndexes(docsCount)
    //                 const list = new ArrayList
    //                 list.add(indexesArr.slice(0, docsCount))

    //                 if (type === "plan") { // изображения-планы объекта
    //                     randomCount = Math.floor(Math.random() * (4 - 1) + 1)
    //                 } else { // type === "photo" изображения-фото объекта
    //                     randomCount = Math.floor(Math.random() * (10 - 5) + 5)
    //                 }

    //                 for (let i = 0; i < randomCount && i < docsCount; i++) {
    //                     var random = Math.floor(Math.random() * (list.size() - 1))
    //                     const randomIdx = list.get(random)
    //                     list.remove(random)

    //                     const randomImgName = await curSchema.findOne().skip(randomIdx).exec()
    //                     const name = randomImgName.name

    //                     const link = `http://localhost:8080/api/img/random/${type}/${name}`

    //                     resultArr.push(link)

    //                 }
    //                 console.log(`imgRandom.routes.js get(/:${type}/:${what} `);
    //                 res.status(200).send(resultArr)
    //                 res.end()

    //             } else { // тогда what - `url` изображения

    //                 const img = await curSchema.find(({ name: what }))
    //                 const buffer = img[0].img.data
    //                 // console.log(`get(/:${type}/:${what} `);
    //                 res.writeHead(200, {
    //                     'Content-Type': img[0].img.contentType,
    //                     'Content-Length': buffer.length
    //                 })
    //                 res.end(buffer);

    //             }
    //         } catch (error) {
    //             console.log(`imgRandom.routes.js err: database when img ${error}`);
    //             res.status(401).send(`err: database when img ${error}`)
    //             res.end()
    //         }
    //     }


    // } else {
    //     console.log(`imgRandom.routes.js err: when img ${imgName}`);
    //     res.status(401).send(`err: when img ${imgName}`)
    //     res.end()
    // }

})



// для загрузки изображения в базу рандомных данных
router.post("/random/:type", async (req, res) => {
    console.debug("imgRandom.routes.js post RANDOM uploadImg");
    const { type } = req.params
    const curType = type === "plan" ? type : "photo"
    const curSchema = curType === "plan" ? Random_Plan : Random_Img

    const form = new formidable.IncomingForm();

    const files = await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(undefined)
                return;
            }
            resolve(files);
        })
    })
    if (!files && !Object.keys(files).length) {
        console.log("imgRandom.routes.js post:type No files");
        res.status(400).send("No files")
        res.end()
    }

    const rawData = fs.readFileSync(files.file.filepath);
    const encode_img = rawData.toString('base64');
    const modalToUpload = {
        name: `${files.file.newFilename}`,
        img: {
            contentType: files.file.mimetype,
            data: new Buffer.from(encode_img, 'base64')
        }
    };
    try {
        const imgCreated = await curSchema.create(modalToUpload)
        // console.log("created ImgModel", `http://localhost:8080/api/img/${imgCreated.name}`);
        // res.status(201).json({ link: `http://localhost:8080/api/img/${imgCreated.name}` })

        //! может быть, возвращать ссылку
        console.log(`imgRandom.routes.js post:type random ${type}s uploaded`);
        // res.status(201).send(`random ${type}s uploaded`)
        res.status(201).json({ link: `http://localhost:8080/api/img/${curType}/${imgCreated.name}` })

        res.end()
    } catch (error) {
        console.log(`imgRandom.routes.js post:type random ${type}s NOT uploaded`);
        res.status(400).send(`ERR: random ${type}s NOT uploaded`)
        res.end()
    }

})




module.exports = router