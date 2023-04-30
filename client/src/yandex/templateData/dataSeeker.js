
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

// const categories = {
//     flat: {
//         label: "Квартира",
//         value: "flat",
//         availableOptions: ["sell", "rent_long", "rent_short"]
//     },
//     room: {
//         label: "Комната",
//         value: "room",
//         availableOptions: ["sell", "rent_long", "rent_short"]
//     },
//     house: {
//         label: "Дом",
//         value: "house",
//         availableOptions: ["sell", "rent_long", "rent_short"]
//     },
//     garage: {
//         label: "Гараж",
//         value: "garage",
//         availableOptions: ["sell", "rent_long"]
//     },
//     commercial: {
//         label: "Коммерческая",
//         value: "commercial",
//         availableOptions: ["sell", "rent_long"]
//     },
//     land: {
//         label: "Земля",
//         value: "land",
//         availableOptions: ["sell"]
//     }
// }


const furniture = [
    {
        value: "true",
        label: "Есть",
    },
    {
        value: "false",
        label: "Нет",
    }
]

const floorNum = [
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

const toilet = [
    {
        value: "combo",
        label: "Совмещенный",
    },
    {
        value: "separate",
        label: "Раздельный",
    },
    {
        value: "more",
        label: "Более одного",
    }
]
const balcony = [
    {
        value: "balcony",
        label: "Балкон",
    },
    {
        value: "loggia",
        label: "Лоджия",
    },
    {
        value: "or",
        label: "Балкон или Лоджия",
    }
]

const dealLaw = [
    {
        value: "fz214",
        label: "214 ФЗ",
    }
]

const dealType = [

    {
        value: "exchange",
        label: "С возможностью обмена",
    },
    {
        value: "assignment",
        label: "С возможностью переуступки",
    }
]

const subwayTime = [
    {
        value: "5",
        label: "5 мин",
    },
    {
        value: "10",
        label: "10 мин",
    },
    {
        value: "15",
        label: "15 мин",
    },
    {
        value: "20",
        label: "20 мин",
    },
    {
        value: "30",
        label: "30 мин",
    },
]

const subwayWay = [
    {
        value: "foot",
        label: "Пешком",
        default: true
    },
    {
        value: "transport",
        label: "На транспорте"
    }
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
// { value: "studio", label: "Студия" }, ...Options.roomsCount.slice(0, 4)
const roomsCount = [
    { label: "Студия", value: "studio" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
]

const marketType = [
    { label: "Новостройки", value: "new" },
    { label: "Вторичный рынок", value: "old" },
    { label: "Вторичка, Новостройки", value: "both" },
]

// const marketType = [
//     { label: "Новостройки", value: "Новостройки" },
//     { label: "Вторичный рынок", value: "Вторичный рынок" },
//     { label: "Вторичка, Новостройки", value: "Вторичка, Новостройки" },
// ]


const Options = {
    types,
    categories,
    furniture,
    floorNum,
    balcony,
    toilet,
    dealType,
    dealLaw,
    subwayTime,
    subwayWay,
    anotherFilters,
    roomsCount,
    marketType
    // features,
    // buildingType,
    // parking,
    // buildingStatus,
    // toilet,
    // typeFloor,
    // renovation,
    // windows,
    // roomsCount,
    // dealType,
    // taxTypes
}

const Seeker = {
    Options
}

export default Seeker
