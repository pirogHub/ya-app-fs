const Autor = require("../data/Author");
const randomTools = require("../randomTools/randomTools")
const FullPriceDetails = (priceDetails) => ({
    priceDetails: {
        label: "Цена и условия сделки",
        wrapper: "group",
        components: {
            price: {
                author: {
                    mongoType: { $type: String },
                    random: function () { this.price = `${randomTools.getRandomNumber(100000000, 1000000)}` },
                    label: "",
                    type: "inputWithFakePlaceholder",
                    config: {
                        type: "number",
                        placeholder: "₽",
                        className: "InputControl_box-big",
                        isThousandDelimeter: true
                    }
                },
                seeker: {

                    random: function () {
                        this.price = {}
                        const [from, to] = randomTools.getRandomFromTo({
                            max: 10000000, min: 1000000, canBeEmpty: true
                        })
                        this.price.$gte = from
                        this.price.$lte = to
                    }

                }
            },
            ...(priceDetails ? priceDetails : {})
        }



    }
}
)

module.exports = FullPriceDetails