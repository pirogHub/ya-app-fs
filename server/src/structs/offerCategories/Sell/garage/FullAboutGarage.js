const Author = require("../../../data/Author");
const Seeker = require("../../../data/Seeker");
const configGenerator = require("../../../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../../../randomTools/randomTools");



const dataAccordingRools = {
    type: [
        { label: "Гараж", value: "garage", },
        { label: "Машиноместо", value: "parking", },
        { label: "Бокс", value: "box", },
    ],
    matherial: [
        { label: "Кирпичный", value: "brick", },
        { label: "Металлический", value: "metal", },
        { label: "Железобетонный", value: "reinforcedConcrete", },
    ],
    status: [
        { label: "Собственность", value: "own", },
        { label: "Кооператив", value: "cooperative", },
        { label: "По доверенности", value: "proxy", },
    ]
}



const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const FullAboutGarage = {
    aboutGarage: {
        label: "О Гараже",
        wrapper: "group",
        components: {

            type: {
                author: {
                    random: function () { this.type = [...randomTools.getRandomValueFrom(data.type)] },
                    mongoType: [String],
                    label: "Тип",
                    type: "radio",
                    config: {
                        options: [...data.type],
                        optionsView: "button"
                    },
                },
                seeker: {
                    random: function () { this.type = [...randomTools.getRandomValueFrom(data.type, true, "checkbox")] },
                    label: "Тип",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.type],
                        optionsView: "button"
                    }),
                }
            },
            matherial: {
                author: {
                    random: function () { this.matherial = [...randomTools.getRandomValueFrom(data.matherial)] },
                    mongoType: [String],
                    label: "Материал",
                    type: "radio",
                    config: {
                        options: [...data.matherial],
                        optionsView: "button"
                    },
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
            status: {
                author: {
                    random: function () { this.status = [...randomTools.getRandomValueFrom(data.status, false, "checkbox")] },
                    mongoType: [String],
                    label: "Статус",
                    type: "checkbox",
                    config: {
                        options: [...data.status],
                        optionsView: "button"
                    }
                },
                seeker: {
                    random: function () { this.status = [...randomTools.getRandomValueFrom(data.status, true, "checkbox")] },
                    label: "Статус",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.status],
                        optionsView: "button"
                    }),
                }
            },
            name: {
                author: {
                    mongoType: String,
                    random: function () { this.name = `ГСК "Незыблемые камни"` },
                    label: "Название ГСК",
                    type: "input",
                    config: {
                        type: "string",
                        maxLength: 20, size: 20, isWidth100: true
                    }
                },
                // seeker: {
                //     label: "Название ГСК",
                //     type: "TwoInputs",
                //     random: function () {
                //         this.area = {}
                //         this.area.$gte = `${randomTools.getRandomNumber(400, 1, 1)}`
                //         this.area.$lte = `${randomTools.getRandomNumber(400, +this.area.$gte, 1)}`

                //     },
                //     config: configGenerator.textInputGroup({
                //         divider: "-",
                //         collectiveBorder: true,
                //         inputsConfig: [
                //             { name: "$gte", placeholder: "с", maxLength: 4, size: 4 },
                //             { name: "$lte", placeholder: "по", maxLength: 4, size: 4 }
                //         ],
                //         Postfix: "м "
                //     })
                // }
            },
            area: { //переделать в area
                area_total: {
                    author: {
                        mongoType: String,
                        random: function () { this.area_total = `${randomTools.getRandomNumber(400, 1, 1)}` },
                        label: "Площадь, м²",
                        type: "input",
                        config: {
                            // type: "number"
                        }
                    },
                    seeker: {
                        label: "Площадь, м²",
                        type: "TwoInputs",
                        random: function () {
                            // this.area = {}
                            this.area_total = {}
                            this.area_total.$gte = `${randomTools.getRandomNumber(400, 1, 1)}`
                            this.area_total.$lte = `${randomTools.getRandomNumber(400, +this.area_total.$gte, 1)}`

                        },
                        config: configGenerator.textInputGroup({
                            divider: "-",
                            collectiveBorder: true,
                            inputsConfig: [
                                { name: "$gte", placeholder: "с", maxLength: 4, size: 4 },
                                { name: "$lte", placeholder: "по", maxLength: 4, size: 4 }
                            ],
                            Postfix: "м "
                        })
                    }
                }
            },
        }

    }


}

module.exports = FullAboutGarage