const allImgs = require("../models/allImgs")
const Avatar = require("../models/Avatar")
const fs = require("fs");

const IMGModels_VARIABLES = {
    ImageModel: {
        mongoModel: allImgs,
        path: "http://localhost:8080/api/img"
    },
    AvatarModel: {
        mongoModel: Avatar,
        path: "http://localhost:8080/api/user/avatar"
    }
}


const imgParserService = {
    parseLoadAndGetLinkOfImg: async ({ form, req, IMGModel_VARIABLE = IMGModels_VARIABLES.ImageModel, paramsToModel }) => {

        try {

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
                throw new Error("no files")
                // console.log("no files");
                // res.status(400).send("No files")
                // return
            }

            const rawData = fs.readFileSync(files.file.filepath);
            const encode_img = rawData.toString('base64');
            const modalToUpload = {
                name: `${files.file.newFilename}`,
                img: {
                    contentType: files.file.mimetype,
                    data: new Buffer.from(encode_img, 'base64')
                },
                // link: `http://localhost:8080/api/img/${files.file.newFilename}}`
                link: `${IMGModel_VARIABLE.path}/${files.file.newFilename}`,
                ...{ ...(paramsToModel ? paramsToModel : {}) }
            };


            const imgCreated = await IMGModel_VARIABLE.mongoModel.create(modalToUpload)
            console.log("img.service.js created ImgModel", `${imgCreated.link}`);
            return imgCreated.link
        } catch (e) {
            console.log("img.service.js Error", e);
            return null
        }
    },


    getImg: async ({ imgReqParam_alias, req, res, IMGModel_VARIABLE = IMGModels_VARIABLES.ImageModel }) => {
        const imgUrlName = req.params?.[imgReqParam_alias]
        if (imgUrlName) {
            try {
                const img = await IMGModel_VARIABLE.mongoModel.find({ name: imgUrlName })
                if (img) {
                    const buffer = img[0].img.data
                    res.writeHead(200, {
                        'Content-Type': img[0].img.contentType,
                        'Content-Length': buffer.length
                    })
                    res.end(buffer);

                    return
                } else {
                    res.status(400).send(`err: no img  "${imgUrlName}"`)
                }
            } catch (error) {
                res.status(400).send(`err: database when img ${error}`)
                return
            }

        } else {
            res.status(400).send(`err: when img ${imgUrlName}`)
        }
    }
}


module.exports = { imgParserService, IMGModels_VARIABLES }