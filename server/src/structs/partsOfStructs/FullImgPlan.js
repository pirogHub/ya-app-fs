const getRandomImg = require("../randomTools/getRandomImg")

const FillImgPlan = {
    imgPlan: {
        label: "Добавить планировку",
        wrapper: "group",
        // components: {
        // label: "Окна",
        // imgPlan: {
        isNotRequired: true,
        mongoType: [String],
        author: {
            random: async function () { this.imgPlan = await getRandomImg("plan") },
            type: "imgPlan",
        }
        // }

        // }


    }
}

module.exports = FillImgPlan