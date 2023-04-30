const configGenerator = require("../../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../../randomTools/randomTools");

const data = require("./data")


const FullAboutBuilding = {
    aboutBuilding: {
        label: "О доме",
        wrapper: "group",
        components: {
            year: {
                mongoType: String,
                author: {
                    random: function () { this.year = `${randomTools.getRandomNumber(1900, 2030)}` },
                    label: "Год постройки",
                    type: "input",
                    config: {
                        type: "number"
                    }
                },
                seeker: {
                    random: function () {
                        this.year = {}
                        const [from, to] = randomTools.getRandomFromTo({
                            max: 2030, min: 1900, canBeEmpty: true
                        })
                        this.year.$gte = from
                        this.year.$lte = to
                        // const from = randomTools.getRandomNumberObj({ ...{ debugName: "from", max: 2030, min: 1900, canBeEmpty: true } })
                        // this.year.from = from ? `${from}` : ""
                        // const to = randomTools.getRandomNumberObj({ ...{ debugName: "to", max: 2030, min: +this.year.from, defMin: 1900, canBeEmpty: true } })
                        // this.year.to = to ? `${to}` : ""

                    },
                    label: "Год постройки",
                    type: "TwoInputs",
                    config: configGenerator.textInputGroup({
                        divider: "-",
                        collectiveBorder: true,
                        inputsConfig: [
                            { name: "$gte", placeholder: "с", maxLength: 4, size: 4 },
                            { name: "$lte", placeholder: "по", maxLength: 4, size: 4 }
                        ]
                    })
                }
            },
            floors: {
                mongoType: String,
                author: {
                    random: function () { this.floors = `${randomTools.getRandomNumber(100, 1)}` },
                    label: "Этажей в доме",
                    type: "input",
                    config: {

                    }
                },
                seeker: {
                    random: function () {
                        this.floors = {}
                        const [from, to] = randomTools.getRandomFromTo({
                            max: 100, min: 1, canBeEmpty: true
                        })
                        this.floors.$gte = from
                        this.floors.$lte = to
                        //             this.floors.from = `${randomTools.getRandomNumber(1900, 2030)}`
                        //             this.floors.to = `${randomTools.getRandomNumber(this.floors.from, 2030)}`

                    },
                    label: "Этажей в доме",
                    type: "TwoInputs",
                    config: configGenerator.textInputGroup({
                        divider: "-",
                        collectiveBorder: true,
                        inputsConfig: [
                            { name: "$gte", placeholder: "с", maxLength: 4, size: 4 },
                            { name: "$lte", placeholder: "по", maxLength: 4, size: 4 }
                        ]
                    })
                }
            },
            parking: {
                mongoType: [String],
                author: {
                    random: function () { this.parking = [...randomTools.getRandomValueFrom(data.Author.parking)] },
                    label: "Тип парковки",
                    type: "radio",
                    config: configGenerator.radioCheckbox({
                        options: [...data.Author.parking],
                        optionsView: "button"
                    }),
                },
                seeker: {
                    random: function () { this.parking = [...randomTools.getRandomValueFrom(data.Author.parking, true, "checkbox")] },
                    label: "Парковка",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.Author.parking],
                        optionsView: "button"
                    }),
                }
            },
            buildingType: {
                mongoType: [String],
                author: {
                    random: function () { this.buildingType = [...randomTools.getRandomValueFrom(data.Author.buildingType)] },
                    label: "Тип дома",
                    type: "radio",
                    config: configGenerator.radioCheckbox({
                        options: [...data.Author.buildingType],
                        optionsView: "button"
                    }),
                },
                seeker: {
                    random: function () { this.buildingType = [...randomTools.getRandomValueFrom(data.Author.buildingType, true, "checkbox")] },
                    label: "Тип дома",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.Author.buildingType],
                        optionsView: "button"
                    }),
                }
            }
        }



    }
}

module.exports = FullAboutBuilding