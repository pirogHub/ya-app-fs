const maleKit = require("./maleKit")
const femaleKit = require("./femaleKit")

const onePersonKit = {
    names: ["Pe"],
    gender: "female"
}
const genderKits = [
    maleKit,
    femaleKit,
    // onePersonKit
]

module.exports = genderKits