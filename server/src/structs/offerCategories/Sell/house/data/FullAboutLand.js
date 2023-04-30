const Author = require("../../../../data/Author");
const Seeker = require("../../../../data/Seeker");
const configGenerator = require("../../../../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../../../../randomTools/randomTools");

const dataAccordingRools = {
    type: [
        { label: "ИЖС", value: "izs", },
        { label: "Садовый", value: "garden", },
        { label: "Фермерский", value: "fermer", }
    ]

}
const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const FullAboutLand = {
    aboutLand: {
        label: "Об участке",
        wrapper: "group",
        components: {
            area: {
                area_total: {
                    author: {
                        mongoType: String,
                        random: function () { this.area_total = `${randomTools.getRandomNumber(10000, 1, 1)}` },
                        label: "Площадь участка, м²",
                        type: "input",
                        config: {
                            // type: "number"
                        }
                    },
                    seeker: {
                        label: "Площадь участка, м²",
                        type: "TwoInputs",
                        random: function () {
                            this.area_total = {}
                            this.area_total.$gte = `${randomTools.getRandomNumber(10000, 1, 1)}`
                            this.area_total.$lte = `${randomTools.getRandomNumber(10000, +this.area_total.$gte, 1)}`

                        },
                        config: configGenerator.textInputGroup({
                            divider: "-",
                            collectiveBorder: true,
                            inputsConfig: [
                                { name: "$gte", placeholder: "от", maxLength: 6, size: 6 },
                                { name: "$lte", placeholder: "до", maxLength: 6, size: 6 }
                            ],
                            Postfix: " м²"
                        })
                    }
                }
            },
            type: {
                author: {
                    random: function () { this.type = [...randomTools.getRandomValueFrom(data.type)] },
                    mongoType: [String],
                    label: "Тип участка",
                    type: "radio",
                    config: {
                        options: [...data.type],
                        optionsView: "button"
                    },
                },
                seeker: {
                    random: function () { this.type = [...randomTools.getRandomValueFrom(data.type, true, "checkbox")] },
                    label: "Тип участка",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.type],
                        optionsView: "button"
                    }),
                }
            },
        }

    }


}

module.exports = FullAboutLand