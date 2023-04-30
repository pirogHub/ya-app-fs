const randomTools = require("../../randomTools/randomTools")

const parking = [
    { label: "Закрытая", value: "closed", },
    { label: "Подземная", value: "under", },
    { label: "Открытая", value: "opened", },
]

const buildingType = [
    { label: "Кирпич", value: "brick", },
    { label: "Монолит", value: "monolith", },
    { label: "Панель", value: "panel", },
    { label: "Кирпич-монолит", value: "brick-monolith", },
    { label: "Блок", value: "block", },
]

// dataAccordingRools
const data = {
    Author: {
        parking: randomTools.changeValuesByLabelsAtArray(parking),
        buildingType: randomTools.changeValuesByLabelsAtArray(buildingType),


    },
    Seeker: {

    }
}



module.exports = data