const Author = require("../../../../data/Author")
const randomTools = require("../../../../randomTools/randomTools")


const dataAccordingRools = {
    additionaly: [
        { label: "Возможен торг", value: "BargainingPossible" },
        { label: "Торг невозможен", value: "BargainingImpossible" },
    ]
}

const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const priceDetails = {
    additionaly: {
        author: {
            isNotRequired: true,
            random: function () { this.additionaly = [...randomTools.getRandomValueFrom(data.additionaly)] },
            mongoType: [String],
            label: "Дополнительно",
            type: "radio",
            config: {
                options: [...data.additionaly],
                optionsView: "button"
            }
        }
    },
}

module.exports = priceDetails