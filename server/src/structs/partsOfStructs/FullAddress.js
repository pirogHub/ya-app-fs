const CoordsGenerator = require("../randomTools/getCoords");

const FullAddress = {
    address: {
        label: "Адрес",
        wrapper: "group",
        components: {
            map: {
                isNotRequired: true,
                author: {
                    title: {
                        random: function () { this.title = "random" },
                        mongoType: String
                    },
                    city: {
                        mongoType: String
                    },
                    coords: {
                        random: function () {
                            const [coords, city] = CoordsGenerator.getCoords()
                            this.coords = coords
                            this.city = city
                        },
                        mongoType: [String, String]
                    },
                    type: "map",
                    label: ""
                }
            }

        }



    }
}

module.exports = FullAddress