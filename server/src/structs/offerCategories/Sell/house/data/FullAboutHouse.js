const Author = require("../../../../data/Author");
const configGenerator = require("../../../../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../../../../randomTools/randomTools");


const dataAccordingRools = {
    buildingType: [
        { label: "Отдельный дом", value: "whole", },
        { label: "Часть дома", value: "part", },
        { label: "Таунхаус", value: "townhouse", },
        { label: "Дуплекс", value: "duplex", },
        { label: "Триплекс", value: "thirdplex", },
    ],
    matherial: [
        { label: "Кирпич", value: "brick", },
        { label: "Монолит", value: "monolith", },
        { label: "Панель", value: "panel", },
        { label: "Кирпич-монолит", value: "brick-monolith", },
        { label: "Блок", value: "block", },
        { label: "Дерево", value: "tree", },
        { label: "Железобетон", value: "reinforcedConcrete", },
    ],
    toilet: [
        { label: "В доме", value: "inside", },
        { label: "На улице", value: "outside", },
        { label: "Отсутствует", value: "none", },
    ],
    shower: [
        { label: "В доме", value: "inside", },
        { label: "На улице", value: "outside", },
        { label: "Отсутствует", value: "none", },
    ],
}

const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const FullAboutHouse = {
    aboutHouse: {
        label: "О доме",
        wrapper: "group",
        components: {
            area: {
                area_total: {
                    mongoType: String,
                    author: {
                        random: function () { this.area_total = `${randomTools.getRandomNumber(200, 1)}` },
                        label: "Площадь, м²",
                        type: "input",
                        config: {
                            // type: "number"
                        }
                    },
                    seeker: {
                        random: function () {
                            // this.area = {}
                            this.area_total = {}
                            const [from, to] = randomTools.getRandomFromTo({
                                max: 200, min: 1, canBeEmpty: true
                            })
                            this.area_total.$gte = from
                            this.area_total.$lte = to

                        },
                        label: "Площадь, м²",
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
                        random: function () { this.floors = `${randomTools.getRandomNumber(10, 1)}` },
                        label: "Количество этажей",
                        type: "input",
                        config: {
                            type: "number"
                        }
                    },
                    seeker: {
                        random: function () {
                            this.floors = {}
                            const [from, to] = randomTools.getRandomFromTo({
                                max: 10, min: 1, canBeEmpty: true
                            })
                            this.floors.$gte = from
                            this.floors.$lte = to
                            // const from = randomTools.getRandomNumberObj({ ...{ debugName: "from", max: 2030, min: 1900, canBeEmpty: true } })
                            // this.year.from = from ? `${from}` : ""
                            // const to = randomTools.getRandomNumberObj({ ...{ debugName: "to", max: 2030, min: +this.year.from, defMin: 1900, canBeEmpty: true } })
                            // this.year.to = to ? `${to}` : ""

                        },
                        label: "Количество этажей",
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
            },
            buildingType: {
                mongoType: [String],
                author: {
                    random: function () { this.buildingType = [...randomTools.getRandomValueFrom(data.buildingType)] },
                    label: "Тип дома",
                    type: "radio",
                    config: configGenerator.radioCheckbox({
                        options: [...data.buildingType],
                        optionsView: "button"
                    }),
                },
                seeker: {
                    random: function () { this.buildingType = [...randomTools.getRandomValueFrom(data.buildingType, true, "checkbox")] },
                    label: "Тип дома",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.buildingType],
                        optionsView: "button"
                    }),
                }
            },
            matherial: {
                mongoType: [String],
                author: {
                    random: function () { this.matherial = [...randomTools.getRandomValueFrom(data.matherial)] },
                    label: "Материал",
                    type: "radio",
                    config: configGenerator.radioCheckbox({
                        options: [...data.matherial],
                        optionsView: "button"
                    }),
                },
                seeker: {
                    random: function () { this.matherial = [...randomTools.getRandomValueFrom(data.matherial, true, "checkbox")] },
                    label: "Материал",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.matherial],
                        optionsView: "button"
                    }),
                }
            },
            toilet: {
                mongoType: [String],
                author: {
                    random: function () { this.toilet = [...randomTools.getRandomValueFrom(data.toilet)] },
                    label: "Туалет",
                    type: "radio",
                    config: configGenerator.radioCheckbox({
                        options: [...data.toilet],
                        optionsView: "button"
                    }),
                },
                seeker: {
                    random: function () { this.toilet = [...randomTools.getRandomValueFrom(data.toilet, true, "checkbox")] },
                    label: "Туалет",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.toilet],
                        optionsView: "button"
                    }),
                }
            },
            shower: {
                mongoType: [String],
                author: {
                    random: function () { this.shower = [...randomTools.getRandomValueFrom(data.shower)] },
                    label: "Душ",
                    type: "radio",
                    config: configGenerator.radioCheckbox({
                        options: [...data.shower],
                        optionsView: "button"
                    }),
                },
                seeker: {
                    random: function () { this.shower = [...randomTools.getRandomValueFrom(data.shower, true, "checkbox")] },
                    label: "Душ",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.shower],
                        optionsView: "button"
                    }),
                }
            }
        }



    }
}

module.exports = FullAboutHouse