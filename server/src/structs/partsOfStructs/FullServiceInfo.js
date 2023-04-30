// const getRandomImg = require("../randomTools/getRandomImg")

const FullServiceInfo = {
    FullServiceInfo: {
        titles: {
            mainTitle: {
                isNotRequired: true,
                mongoType: String,
                author: {
                    // random: async function () {this.firstImg = await getRandomImg()},
                }
            },
            additionalTitle: {
                isNotRequired: true,
                mongoType: String,
                author: {
                    // random: async function () {this.firstImg = await getRandomImg()},
                }
            },
            additionalTitleWithLink:
            {
                isNotRequired: true,
                isExist: {
                    isNotRequired: true,
                    mongoType: Boolean,
                },
                contentStart: {
                    isNotRequired: true,
                    mongoType: String,
                },
                contentIntoLink: {
                    isNotRequired: true,
                    mongoType: String,
                },
                contentEnd: {
                    isNotRequired: true,
                    mongoType: String,
                },

                author: {
                    // random: async function () {this.firstImg = await getRandomImg()},
                }
            }
        }
    }
}

module.exports = FullServiceInfo