const getRandomImg = require("../randomTools/getRandomImg")

const FullImgPhotos = (guideLabel) => ({
    imgPhotos: {
        label: "Фотографии",
        wrapper: "group",

        mongoType: [String],
        author: {
            random: async function () { this.imgPhotos = await getRandomImg() },
            type: "imgPhotos",
            config: {
                guideLabel: guideLabel
            }
        }
    }
})

module.exports = FullImgPhotos