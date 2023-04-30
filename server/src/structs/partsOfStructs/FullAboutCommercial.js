const Author = require("../data/Author");
const Seeker = require("../data/Seeker");
const configGenerator = require("../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../randomTools/randomTools");

const dataAccordingRools = {
    appointment: [
        {
            label: "Для офиса",
            value: "office"
        },
        {
            label: "Торговое помещение",
            value: "commercial"
        },
        {
            label: "Свободное назначение",
            value: "free"
        },
        {
            label: "Общепит",
            value: "catering"
        },
        {
            label: "Автосервис",
            value: "carService"
        },
        {
            label: "Готовый бизнес",
            value: "business"
        },
        {
            label: "Склад",
            value: "stock"
        },
        {
            label: "Земля комм.назначения",
            value: "commercialLand"
        },
        {
            label: "Гостиница",
            value: "hotel"
        },
        {
            label: "Производство",
            value: "production"
        },
    ]

}
const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const FullAboutCommercial = {
    aboutCommecial: {
        label: "Коммерческая недвижимость",
        wrapper: "group",
        components: {
            area: {
                area_total: {
                    author: {
                        mongoType: String,
                        random: function () { this.area_total = `${randomTools.getRandomNumber(10000, 1, 1)}` },
                        label: "Площадь недвижимости, м²",
                        type: "input",
                        config: {
                            // type: "number"
                        }
                    },
                    seeker: {
                        label: "Площадь недвижимости, м²",
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

            appointment: {
                author: {
                    random: function () { this.appointment = [...randomTools.getRandomValueFrom(data.appointment)] },
                    mongoType: [String],
                    label: "Назначение",
                    type: "radio",
                    config: {
                        options: [...data.appointment],
                        optionsView: "button"
                    },
                },
                seeker: {
                    random: function () { this.appointment = [...randomTools.getRandomValueFrom(data.appointment, true, "checkbox")] },
                    label: "Назначение",
                    type: "checkbox",
                    config: configGenerator.radioCheckbox({
                        options: [...data.appointment],
                        optionsView: "button"
                    }),
                }
            },
        }

    }


}

module.exports = FullAboutCommercial