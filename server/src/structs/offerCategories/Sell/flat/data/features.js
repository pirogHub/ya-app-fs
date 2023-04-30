const Author = require("../../../../data/Author")
const randomTools = require("../../../../randomTools/randomTools")


const dataAccordingRools = {
    features: [
        { label: "Интернет", value: "internet" },
        { label: "Холодильник", value: "fridge" },
        { label: "Мебель на кухне", value: "kitchen_furniture" },
        { label: "Кондиционер", value: "conditioner" },
        { label: "Мебель в квартире", value: "flat_furniture" },
        { label: "Лифт", value: "elevator" },
        { label: "Мусоропровод", value: "garbageChute" },
        { label: "Консьерж", value: "concierge" },
        { label: "Закрытая территория", value: "closedArea" },
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