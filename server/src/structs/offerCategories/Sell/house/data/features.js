const Author = require("../../../../data/Author")
const randomTools = require("../../../../randomTools/randomTools")


const dataAccordingRools = {
    features: [
        { label: "Канализация", value: "sewerage" },
        { label: "Электросеть", value: "circuit" },
        { label: "Газ", value: "gas" },
        { label: "Бильярд", value: "billiards" },
        { label: "Сауна", value: "sauna" },
        { label: "Бассейн", value: "pool" },
        { label: "Возможность ПМЖ", value: "pmzh" },
        { label: "Кухня", value: "kitchen" },
        { label: "Отопление", value: "heating" },
        { label: "Водопровод", value: "waterPipes" },

    ]
}


const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)


const features = {
    features: {
        author: {
            random: function () { this.features = [...randomTools.getRandomValueFrom(data.features, false, "checkbox")] },
            type: "checkbox",
            mongoType: [String],
            config: {
                options: [...data.features],
                optionsView: "rectangle"
            }
        }
    }
}


module.exports = features