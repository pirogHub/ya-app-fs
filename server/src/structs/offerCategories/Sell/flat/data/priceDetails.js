const Author = require("../../../../data/Author")
const randomTools = require("../../../../randomTools/randomTools")


const dataAccordingRools = {
    dealType: [
        { label: "Прямая аренда", value: "directSell" },
        { label: "Субаренда", value: "sublease" },
        { label: "Продажа права аренды", value: "leaseholdRights" },
    ],
    taxTypes: [
        { label: "НДС", value: "nds" },
        { label: "УСН", value: "usn" },
    ],
    additionaly: [
        { label: "Возможен торг", value: "bargaining" },
        { label: "Ипотека", value: "mortgage" },
    ]
}

const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const priceDetails = {
    dealType: {
        author: {
            random: function () { this.dealType = [...randomTools.getRandomValueFrom(data.dealType)] },
            mongoType: [String],
            label: "Тип сделки",
            type: "radio",
            config: {
                options: [...data.dealType],
                optionsView: "button"
            }
        }
    },
    tax: {
        author: {
            random: function () { this.tax = [...randomTools.getRandomValueFrom(data.taxTypes)] },
            mongoType: [String],
            label: "Налог",
            type: "radio",
            config: {
                options: [...data.taxTypes],
                optionsView: "button"
            }
        }
    },
    deposit: {
        author: {
            random: function () { this.deposit = `${randomTools.getRandomNumber(this.price, 1000000)}` },
            mongoType: String,
            label: "Обеспечительный платёж, ₽",
            type: "input",
            config: {
                isThousandDelimeter: true
            }
        }
    },
    additionaly: {
        author: {
            isNotRequired: true,
            random: function () { this.additionaly = [...randomTools.getRandomValueFrom(data.additionaly, false, "checkbox")] },
            mongoType: [String],
            label: "Дополнительно",
            type: "checkbox",
            config: {
                options: [...data.additionaly],
                optionsView: "button"
            }
        }
    },
}

module.exports = priceDetails