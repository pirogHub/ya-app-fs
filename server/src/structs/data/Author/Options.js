const randomTools = require("../../randomTools/randomTools")

const features = [
    { label: "Интернет", value: "internet" },
    { label: "Холодильник", value: "fridge" },
    { label: "Мебель на кухне", value: "kitchen_furniture" },
    { label: "Кондиционер", value: "conditioner" },
    { label: "Мебель в квартире", value: "flat_furniture" },
    { label: "Лифт", value: "elevator" },
    { label: "Мусоропровод", value: "garbageChute" },
    { label: "Консьерж", value: "concierge" },
    { label: "Закрытая территория", value: "closedArea" },
]


const buildingType = [
    { label: "Кирпич", value: "brick", },
    { label: "Монолит", value: "monolith", },
    { label: "Панель", value: "panel", },
    { label: "Кирпич-монолит", value: "brick-monolith", },
    { label: "Блок", value: "block", },
]

const parking = [
    { label: "Закрытая", value: "closed", },
    { label: "Подземная", value: "under", },
    { label: "Открытая", value: "opened", },
]

const buildingStatus = [
    { label: "Аппартаменты", value: "appartments", },
    { label: "Жилой фонд", value: "stock", }
]

const toilet = [
    { label: "Совмещенный", value: "combined", },
    { label: "Раздельный", value: "separate", },
    { label: "Более одного", value: "more", }
]

const typeFloor = [
    { label: "Линолеум", value: "linoleum", },
    { label: "Ламинат", value: "laminate", },
    { label: "Паркет", value: "parquet", },
    { label: "Кафель", value: "tile", }
]

const renovation = [
    { label: "Косметический", value: "cosmetic", },
    { label: "Евро", value: "euro", },
    { label: "Дизайнерский", value: "design", },
    { label: "Требуется", value: "required", }
]
const windows = [
    { label: "На улицу", value: "street", },
    { label: "Во двор", value: "yard", },
]

const roomsCount = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6+", value: 6 },
]

const dealType = [
    { label: "Прямая аренда", value: "directSell" },
    { label: "Субаренда", value: "sublease" },
    { label: "Продажа права аренды", value: "leaseholdRights" },
]

const taxTypes = [
    { label: "НДС", value: "nds" },
    { label: "УСН", value: "usn" },
]

const types = {
    sell: {
        label: "Продать",
        value: "sell",
        availableOptions: ["flat", "room", "house", "garage", "commercial", "land"]
    },
    rent_long: {
        label: "Сдать надолго",
        value: "rent_long",
        availableOptions: ["flat", "room", "house", "garage", "commercial"]
    },
    rent_short: {
        label: "Сдать посуточно",
        value: "rent_short",
        availableOptions: ["flat", "room", "house"]
    },
}


const categories = {
    flat: {
        label: "Квартира",
        value: "flat",
        availableOptions: ["sell", "rent_long", "rent_short"]
    },
    room: {
        label: "Комната",
        value: "room",
        availableOptions: ["sell", "rent_long", "rent_short"]
    },
    house: {
        label: "Дом",
        value: "house",
        availableOptions: ["sell", "rent_long", "rent_short"]
    },
    garage: {
        label: "Гараж",
        value: "garage",
        availableOptions: ["sell", "rent_long"]
    },
    commercial: {
        label: "Коммерческая",
        value: "commercial",
        availableOptions: ["sell", "rent_long"]
    },
    land: {
        label: "Земля",
        value: "land",
        availableOptions: ["sell"]
    }
}




const OptionsAccordingRools = {
    features,
    buildingType,
    parking,
    buildingStatus,
    toilet,
    typeFloor,
    renovation,
    windows,
    roomsCount,
    dealType,
    taxTypes,
    // categories,
    // types
}

// console.log("AUTHOR OPTIONS categories", categories);
const Options = randomTools.changeValuesByLabelsAtArraysOfObject(OptionsAccordingRools)

Options.categories = categories
Options.types = types
// console.log("AUTHOR OPTIONS categories", categories);
// console.log("AUTHOR OPTIONS Options.categories", Options.categories);
module.exports = { Options }