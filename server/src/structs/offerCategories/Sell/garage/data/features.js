const Author = require("../../../../data/Author")
const randomTools = require("../../../../randomTools/randomTools")


const dataAccordingRools = {
    features: [
        { label: "Пожарная сигнализация", value: "fireAlarm" },
        { label: "Доступ на объект24/7", value: "access24" },
        { label: "Пропусная система", value: "passSystem" },
        { label: "Отопление", value: "heating" },
        { label: "Водопровод", value: "waterpipes" },
        { label: "Электросеть", value: "circuit" },
        { label: "Автоматические ворота", value: "automaticGates" },
        { label: "Видеонаблюдение", value: "cctv" },
        { label: "Охрана", value: "security" },
        { label: "Смотровая яма", value: "viewingHole" },
        { label: "Автомойка", value: "carWash" },
        { label: "Автосервис", value: "carService" },

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