const { uid } = require("uid")

const parkingList = [
    "parking_open",
    "parking_close",
    "parking_none"
]

function randomFromInvironments() {
    const randomIdx = random(0, parkingList.length, 0)

    const tmp = []
    tmp.push(parkingList[randomIdx])
    if (random(0, 1, 0) > 0.5) tmp.push("rubbish")
    if (random(0, 1, 0) > 0.5) tmp.push("lift")
    if (random(0, 1, 0) > 0.5) tmp.push("security")

    return tmp
}

const typeBuildingArr = [
    "Новостройка",
    "Сталинка",
    "Быстростройка"
]

const subwayArr = [
    "Щёлковская",
    "Первомайская",
    "Измайловская",
    "Партизанская",
    "Семёновская",
    "Электрозаводская",
    "Бауманская",
    "Курская",
    "Площадь Революции",
    "Арбатская",
    "Смоленская",
    "Киевская",
    "Парк Победы",
    "Славянский бульвар",
    "Кунцевская",
    "Молодёжная",
    "Крылатское",
    "Строгино",
    "Мякинино",
    "Волоколамская",
    "Митино",
    "Пятницкое шоссе",
    "Битцевский парк",
    "Лесопарковая",
    "Улица Старокачаловская",
    "Улица Скобелевская",
    "Бульвар адмирала Ушакова",
    "Улица Горчакова",
    "Бунинская аллея",
    "Речной вокзал",
    "Водный стадион",
    "Войковская",
    "Сокол",
    "Аэропорт",
    "Динамо",
    "Белорусская",
    "Маяковская",
    "Тверская",
    "Театральная",
    "Новокузнецкая",
    "Павелецкая",
    "Коломенская",
    "Каширская",
    "Кантемировская",
    "Царицыно",
    "Орехово",
    "Домодедовская",
    "Красногвардейская",
    "Алма-Атинская",
    "Технопарк",
    "Автозаводская",
    "Новокосино",
    "Новогиреево",
    "Перово",
    "Шоссе Энтузиастов",
    "Авиамоторная",
    "Площадь Ильича",
    "Марксистская",
    "Третьяковская",
    "Медведково",
    "Бабушкинская",
    "Свиблово",
    "ВДНХ",
    "Алексеевская",
    "Рижская",
    "Проспект Мира",
    "Сухаревская",
    "Тургеневская",
    "Китай-Город",
    "Октябрьская",
    "Шаболовская",
    "Ленинский проспект",
    "Академическая",
    "Профсоюзная",
    "Новые Черёмушки",
    "Калужская",
    "Беляево",
    "Коньково",
    "Тёплый Стан",
    "Ясенево",
    "Новоясеневская",
    "Ботанический сад",
    "Варшавская",
    "Каховская",
    "Краснопресненская",
    "Новослободская",
    "Комсомольская",
    "Таганская",
    "Добрынинская",
    "Парк Культуры",
    "Марьина роща",
    "Достоевская",
    "Трубная",
    "Сретенский бульвар",
    "Чкаловская",
    "Римская",
    "Крестьянская застава",
    "Кожуховская",
    "Печатники",
    "Волжская",
    "Люблино",
    "Братиславская",
    "Марьино",
    "Борисово",
    "Шипиловская",
    "Зябликово",
    "Фонвизинская",
    "Бутырская",
    "Дубровка",
    "Алтуфьево",
    "Бибирево",
    "Отрадное",
    "Петровско-Разумовская",
    "Тимирязевская",
    "Дмитровская",
    "Савёловская",
    "Менделеевская",
    "Цветной бульвар",
]

const districtArr = [
    "Сокольники",
    "Солнцево",
    "Капотня",
    "Куркино",
    "Левобережный",
    "Кузьминки",
    "Бибирево",
    "Мещанский",
    "Тверской",
    "Щукино",
    "Царицыно",
    "Хорошёвский",
    "Проспект Вернадского",
    "Чертаново Северное",
    "Соколиная Гора",
    "Кунцево",
    "Академический",
    "Новокосино",
    "Южное Тушино",
    "Южнопортовый",
    "Нагатино-Садовники",
    "Митино",
    "Текстильщики",
    "Рязанский",
    "Поселение Внуковское",
    "Поселение Рязановское",
    "Печатники",
    "Южное Бутово",
    "Некрасовка",
    "Северный",
    "Северное Тушино",
    "Ясенево",
    "Хорошёво-Мнёвники",
    "Измайлово",
    "Крылатское",
    "Покровское-Стрешнево",
    "Алтуфьевский",
    "Аэропорт",
    "Бескудниковский",
    "Братеево",
    "Бутырский",
    "Вешняки",
    "Орехово-Борисово Южное",
    "Отрадное",
    "Очаково-Матвеевское",
    "Косино-Ухтомский",
    "Москворечье-Сабурово",
    "Войковский",
    "Восточное Дегунино",
    "Восточное Измайлово",
    "Выхино-Жулебино",
    "Гагаринский",
    "Головинский",
    "Гольяново",
    "Даниловский",
    "Дмитровский",
    "Донской",
    "Дорогомилово",
]

function getRandomFromArray(array) {
    const randomIdx = random(0, array.length, 0)
    return array[randomIdx]
}

function getLorem() {
    return "Lorem ipsum dolor sit amet. Et nulla error cum molestiae temporibus vel nihil dolore aut aperiam beatae ea laborum tempora. Eos consequatur voluptatibus eum adipisci nihil vel voluptates totam ut asperiores magni ad incidunt dolores. Ut quidem cumque ut accusantium repellendus ut ipsam eligendi non beatae dolores"
}

function getDeveloper() {
    return "Lorem ipsum dolor sit amet"
}


function random(min, max, fixed) {
    return (Math.random() * (max - min) + min).toFixed(fixed)
}



const objectTemplate = {
    images: {
        simple: [
            "//avatars.mds.yandex.net/get-realty/3503639/offer.2967407085318114201.6130303921079536218/orig",
            "//avatars.mds.yandex.net/get-realty/399902/offer.2967407085318114201.705623949781648415/orig",
            "//avatars.mds.yandex.net/get-realty/2789840/offer.1285835330088297334.4854130331299923156/orig",
            "//avatars.mds.yandex.net/get-realty/197397/offer.1285835330088297334.5385645533370631615/orig",
            "//avatars.mds.yandex.net/get-realty/1375352/offer.2967407085318114173.7926021166299821512/orig",
            "//avatars.mds.yandex.net/get-realty/3580716/offer.2967407085318114146.8831475532372039092/orig",
            "//avatars.mds.yandex.net/get-realty/1053271/offer.2967407085318114146.768111993559661142/orig",
            "//avatars.mds.yandex.net/get-realty/1641373/offer.1285835330088297334.8529456160926354728/orig",
            "//avatars.mds.yandex.net/get-realty/197637/offer.2967407085318114146.4250603495809832706/orig",
            "//avatars.mds.yandex.net/get-realty/3508978/offer.2967407085318114146.760220415965899986/orig",
            "//avatars.mds.yandex.net/get-realty/2031790/offer.2967407085318114203.1289111906097720705/orig",
            "//avatars.mds.yandex.net/get-realty/3503871/offer.2967407085318114173.1788025963415693705/orig",
            "//avatars.mds.yandex.net/get-realty/1549750/offer.2967407085318114146.8304639534546701014/orig",
            "//avatars.mds.yandex.net/get-realty/4219942/offer.2967407085318114143.5125423915495797681/orig",
            "//avatars.mds.yandex.net/get-realty/1601726/offer.2967407085318114173.1208825482584668846/orig",
            "//avatars.mds.yandex.net/get-realty/40771/offer.1285835330088297334.1592403680995469557/orig",
            "//avatars.mds.yandex.net/get-realty/1391468/offer.2967407085318114146.4153961370056976679/orig",
            "//avatars.mds.yandex.net/get-realty/196463/offer.2967407085318114202.4585314922189606142/orig",
            "//avatars.mds.yandex.net/get-realty/767001/offer.2967407085318114173.3511625689428598472/orig",
            "//avatars.mds.yandex.net/get-realty/149462/offer.2967407085318114173.2607995729936545822/orig",
            "//avatars.mds.yandex.net/get-realty/758502/offer.2967407085318114143.6719415640242994528/orig",
            "//avatars.mds.yandex.net/get-realty/5331770/offer.2967407085318114143.3016747276976382243/orig",
            "//avatars.mds.yandex.net/get-realty/1676077/offer.2967407085318114173.4421117920830918510/orig",
            "//avatars.mds.yandex.net/get-realty/1244288/offer.2967407085318114173.7764031871706036123/orig",
            "//avatars.mds.yandex.net/get-realty/120898/offer.2967407085318114145.7547215621792465173/orig",
            "//avatars.mds.yandex.net/get-realty/5234136/offer.2967407085318114145.4151025983441383638/orig",
            "//avatars.mds.yandex.net/get-realty/142395/offer.2967407085318114173.6642555764551030653/orig",
            "//avatars.mds.yandex.net/get-realty/2004662/offer.2967407085318114173.6839674250073947998/orig",
            "//avatars.mds.yandex.net/get-realty/897442/offer.2967407085318114201.5325030058663176937/orig",
            "//avatars.mds.yandex.net/get-realty/1749614/offer.2967407085318114201.115735498171883025/orig",
            "//avatars.mds.yandex.net/get-verba/787013/2a0000017d51c12a465de9c8d77bdb602bcd/orig"
        ],
        plan: ["//avatars.mds.yandex.net/get-realty/3503639/offer.2967407085318114201.6130303921079536218/orig"],
        flor_plan: ["//avatars.mds.yandex.net/get-verba/787013/2a0000017d51c12a465de9c8d77bdb602bcd/orig"]
    },
    building_info: {
        area: {
            value: () => random(30, 400, 2),
            unit: "m2"
        },
        floorsOffered: {
            value: () => random(1, 20, 0),
            unit: "item"
        },
        floorsTotal: {
            value: () => random(1, 20, 0),
            unit: "item"
        },
        ceilingHeight: {
            value: () => random(1.5, 3, 1),
            unit: "m"
        },
        builtYear: {
            value: () => random(2000, 2023, 0),
            unit: "year"
        },
        plainType: {
            value: () => random(30, 400, 0)
        },
        buildingType: {
            value: () => getRandomFromArray(typeBuildingArr)
        },
        porchesCount: {
            value: () => random(1, 5, 0),
            unit: "item"
        },
        developer: {
            value: () => getDeveloper()
        },
        improvements: () => randomFromInvironments()
    },
    rooms: () => random(3, 6, 0),
    location: {
        footTime: () => random(1, 20, 0),
        nearestSubway: () => getRandomFromArray(subwayArr),
        district: () => getRandomFromArray(districtArr)
    },
    price: {
        // pricePerMeter: {
        //     value: () => random(30, 400, 2)
        // },
        priceTotal: {
            value: () => random(3000000, 400000000, 2)
        }
    },
    description: {
        value: () => getLorem()
    }

}


const generateItem = (templObj) => {

    let keysArray = []
    let dest = {}

    const getByKeyLoop = (source, subDest, antiClosingKey = undefined) => {
        Object.keys(source).forEach(key => {

            if (key === "component") {
                const val = source[key]()
                subDest["value"] = val
            }

            else if (Array.isArray(source[key])) {
                const val = source[key]
                subDest[key] = val
            } else if (typeof (source[key]) === "function") {
                subDest[key] = source[key]()
            }

            else if (typeof (source[key]) === "object") {
                keysArray.unshift(key)
                if (!subDest[key]) subDest[key] = {}
                getByKeyLoop(source[key], subDest[key], key)
                keysArray.shift()
            }

            else {
                subDest[key] = source[key]
            }
        })
    }

    getByKeyLoop(templObj, dest)


    return { ...dest }
}

module.exports = {
    objectTemplate,
    generateItem
}