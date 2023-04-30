const randomTools = require("../../randomTools/randomTools")

const dataAccordingRools = {
    roomsCount: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
    ],
    buildingStatus: [
        { label: "Аппартаменты", value: "appartments", },
        { label: "Жилой фонд", value: "stock", }
    ],
    toilet: [
        { label: "Совмещенный", value: "combined", },
        { label: "Раздельный", value: "separate", },
        { label: "Более одного", value: "more", }
    ],
    typeFloor: [
        { label: "Линолеум", value: "linoleum", },
        { label: "Ламинат", value: "laminate", },
        { label: "Паркет", value: "parquet", },
        { label: "Кафель", value: "tile", }
    ],
    renovation: [
        { label: "Косметический", value: "cosmetic", },
        { label: "Евро", value: "euro", },
        { label: "Дизайнерский", value: "design", },
        { label: "Требуется", value: "required", }
    ],
    windows: [
        { label: "На улицу", value: "street", },
        { label: "Во двор", value: "yard", },
    ]


}
const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const roomsCount = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    // { label: "Студия", value: "studio" },
]
module.exports = {
    room: { ...data },
    flat: {
        ...data,
        roomsCount: randomTools.changeValuesByLabelsAtArray(roomsCount),
    },
}