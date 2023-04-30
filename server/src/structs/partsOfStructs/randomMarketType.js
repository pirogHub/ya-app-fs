const Autor = require("../data/Author");
const Seeker = require("../data/Seeker");
const configGenerator = require("../inputsConfigGenerator/inputConfigGenerator");
const randomTools = require("../randomTools/randomTools")
const randomMarketType = {
    marketType: {
        seeker: {
            random: function () { this.marketType = [...randomTools.getRandomValueFrom(Seeker.Options.marketType)] },

        }
    }
}






module.exports = randomMarketType