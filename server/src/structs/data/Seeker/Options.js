const randomTools = require("../../randomTools/randomTools")

const floorClarification = [
    {
        value: "notFirst",
        label: "Не первый",
    },
    {
        value: "notLast",
        label: "Не последний",
    },
    {
        value: "last",
        label: "Последний",
        aloneVal: true,
    }
]

const roomsCount = [
    { label: "Студия", value: "studio" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
]

const anotherFilters = [
    {
        value: "owner",
        label: "От собственника",
    },
    {
        value: "showOnline",
        label: "Онлайн показ",
    },
    {
        value: "company",
        label: "От застройщика",
    },
    {
        value: "mortgage",
        label: "Возможна ипотека",
    },
]


const types = {
    sell: {
        label: "Купить",
        value: "sell",
        availableOptions: ["flat", "room", "house", "garage", "commercial", "land"]
    },
    rent_long: {
        label: "Снять",
        value: "rent_long",
        availableOptions: ["flat", "room", "house", "garage", "commercial"]
    },
    rent_short: {
        label: "Посуточно",
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

const marketType = [
    { label: "Новостройки", value: "new" },
    { label: "Вторичный рынок", value: "old" },
    { label: "Вторичка, Новостройки", value: "both" },
]


const Options = {
    floorClarification: randomTools.changeValuesByLabelsAtArray(floorClarification),
    anotherFilters: randomTools.changeValuesByLabelsAtArray(anotherFilters),
    roomsCount: randomTools.changeValuesByLabelsAtArray(roomsCount),
    categories,
    types,
    marketType: randomTools.changeValuesByLabelsAtArray(marketType),
}

module.exports = { Options }