const randomTools = require("./randomTools")


const Moscow = {
    center: [55.755811, 37.615600],
    radius: +(0.1).toFixed(6),
}

const SPb = {
    center: [59.945451, 30.379175],
    radius: +((0.105369).toFixed(6)),
}



const getCoords = (CityObj) => {
    // const curCityObj = CityObj && CityObj?.center[0] && CityObj?.center[1] && CityObj.radius ? CityObj : Math.random() > 0.5 ? SPb : Moscow
    let curCityObj = SPb
    let curCityName = "Санкт-Петербург"

    if (Math.random() > 0.5) {
        curCityObj = Moscow
        curCityName = "Москва"
    }
    // const curCityObj = CityObj && CityObj?.center[0] && CityObj?.center[1] && CityObj.radius ? CityObj : Math.random() > 0.5 ? SPb : Moscow
    const randomNum = +((randomTools.getRandomNumber(1, 0, 6) / 10).toFixed(6))

    const x = curCityObj.center[0] - curCityObj.radius + +randomNum;
    const y = curCityObj.center[1] - curCityObj.radius + +randomNum;

    const fixedX = (+x).toFixed(6)
    const fixedY = (+y).toFixed(6)



    return [[fixedX, fixedY], curCityName]
}


const Cities = {
    SPb,
    Moscow
}

const CoordsGenerator = {
    Cities,
    getCoords
}

module.exports = CoordsGenerator