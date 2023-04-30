const flat = require("../offerCategories/Sell/flat/flat")
const room = require("../offerCategories/Sell/room/room")
const house = require("../offerCategories/Sell/house/house")
const garage = require("../offerCategories/Sell/garage/garage")
const commercial = require("../offerCategories/Sell/commercial/commercial")
const land = require("../offerCategories/Sell/land/land")


const categories = {
    flat,
    room,
    house,
    garage,
    commercial,
    land,

}
const keys = Object.keys(categories)

const allCategories = {
    categories,
    keys
}

module.exports = allCategories