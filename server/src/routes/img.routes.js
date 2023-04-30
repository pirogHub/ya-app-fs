const express = require("express")
const allImgs = require("../models/allImgs")
// const multer = require("multer");

const fs = require("fs");
const formidable = require('formidable');
const { imgParserService, IMGModels_VARIABLES } = require("../services/img.service");

const router = express.Router({ mergeParams: true })


router.get("/:imgUrlName", async (req, res) => {
    const { imgUrlName } = req.params

    if (imgUrlName) {
        try {
            const img = await allImgs.find({ name: imgUrlName })
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

})


router.post("/:type", async (req, res) => {
    console.debug("post uploadImg");

    const form = new formidable.IncomingForm();

    const newLink = await imgParserService.parseLoadAndGetLinkOfImg({ form, req, res, IMGModel_VARIABLE: IMGModels_VARIABLES.ImageSchema })

    try {
        if (!newLink) throw new Error("serverError")
        // const files = await new Promise(function (resolve, reject) {
        //     form.parse(req, function (err, fields, files) {
        //         if (err) {
        //             reject(undefined)
        //             return;
        //         }
        //         resolve(files);
        //     })
        // })

        // if (!files && !Object.keys(files).length) {
        //     console.log("img.routes.js no files");
        //     res.status(400).send("No files")
        //     return
        // }

        // const rawData = fs.readFileSync(files.file.filepath);
        // const encode_img = rawData.toString('base64');
        // const modalToUpload = {
        //     name: `${files.file.newFilename}`,
        //     img: {
        //         contentType: files.file.mimetype,
        //         data: new Buffer.from(encode_img, 'base64')
        //     },
        //     link: `http://localhost:8080/api/img/${files.file.newFilename}`
        // };
        // try {

        //     const imgCreated = await allImgs.create(modalToUpload)
        //     console.log("img.routes.js created ImgModel", `${imgCreated.link}`);
        res.status(201).send(newLink)
        // return
    } catch (error) {
        res.status(400).json({})
        return
    }

})
module.exports = router