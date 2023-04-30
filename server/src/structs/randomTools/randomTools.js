const ArrayList = require("arraylist")

const indexesArr = []
const addIndexes = (count) => {
    for (let i = indexesArr.length; i < count; i++) {
        indexesArr.push(i)
    }
}
addIndexes(20)


const getDefault = (all) => {
    const defArr = []
    Object.keys(all).forEach(k => {
        defArr.push({
            value: all[k].value,
            label: all[k].label
        })
    })
    return defArr
}

const getAvailableBy = (key, from, by) => {
    const cats = []
    by[key].availableOptions.forEach(k => {
        if (from[k]) {
            cats.push({
                value: from[k].value,
                label: from[k].label
            })
        }
    })
    return cats
}


const getRandomNumber = (max, min = 0, fixed = 0) => {
    return +((+((Math.random() * (max - min)) + min)).toFixed(fixed))

}

const getRandomNumberObj = ({ max,
    defMax = 0,
    min = 0,
    defMin = 0,
    toFixed = 0,
    isString = false,
    canBeEmpty = false,
    debugName = "" }) => {
    const debugCanBeEmpty = canBeEmpty && true
    if (debugCanBeEmpty && Math.random() > 0.65) return isString ? "" : undefined

    const curMax = +((max && typeof +max === "number") ? +max : +defMax)
    const curMin = +((min && typeof +min === "number") ? +min : +defMin)
    const result = (+((Math.random() * (curMax - curMin)) + curMin)).toFixed(toFixed)
    // console.log("getRandomNumberObj")
    // console.log("-debugName", debugName)
    // console.log("-curMax", curMax)
    // console.log("-curMin", curMin)
    // console.log("-max", max)
    // console.log("-min", min)
    // console.log("-defMax", defMax)
    // console.log("-defMin", defMin)
    // console.log("-result", result);

    return +result
}

const getRandomFromTo = ({ max,
    min = 0,
    defMin = 0,
    toFixed = 0,
    isString = false,
    canBeEmpty = false,
    debugName = "" }) => {
    const debugCanBeEmpty = canBeEmpty && true
    const from = getRandomNumberObj({ ...{ debugName: "from", max, min, canBeEmpty: debugCanBeEmpty, toFixed, isString } })
    const to = getRandomNumberObj({ ...{ debugName: "to", max, min: from, defMin: min, canBeEmpty: debugCanBeEmpty, toFixed, isString } })
    return [from, to]
}

const getRandomValueFrom = (container, canBeEmpty = false, type = "radio", debug) => {
    const debugCanBeEmpty = canBeEmpty && true
    if (debug) console.log("getRandomValueFrom container", container);

    let valsCount = 1
    let valsContainer = []
    const isObj = !Array.isArray(container)

    let keysORarr = isObj ? Object.keys(container) : container

    if (indexesArr.length < keysORarr.length) addIndexes(keysORarr.length)
    const list = new ArrayList
    list.add(indexesArr.slice(0, keysORarr.length))

    function curGetPosition() {
        const randomIdxOfPosition = getRandomNumber(list.size() - 1)
        const randomPosition = isObj ? keysORarr[list.get(randomIdxOfPosition)] : list.get(randomIdxOfPosition)

        list.remove(randomIdxOfPosition)

        return randomPosition
    }

    if (type !== "radio") {
        valsCount = getRandomNumber(keysORarr.length - 1, 1)
    }
    for (let i = 0; i < valsCount; i++) {
        const randomPosition = curGetPosition()
        const randomVal = container[randomPosition]

        if (randomVal?.aloneVal === true) {

            if (valsContainer.length === 0) return [...[randomVal.value]]

            const randomChance = Math.random()
            if (randomChance < 0.4) { }
            else return [...[randomVal.value]]

        } else {
            valsContainer.push(randomVal.value)
        }

    }
    if (debugCanBeEmpty && Math.random() > 0.6) {
        return []
    }
    return valsContainer
}


const getBy_From_Withrules = (byVal, defaultArr, rulesFrom) => {
    let types
    const curByVal = Array.isArray(byVal)
        ? byVal?.length && byVal?.[0]
        : byVal
    if (byVal && byVal?.length && byVal?.[0]) {

        types = getAvailableBy(byVal[0], defaultArr, rulesFrom)
    } else {
        types = getDefault(defaultArr)
    }
    return types
}

const changeValuesByLabelsAtArray = (array) => {
    const doubleLabelsArray = array.map(i => ({ ...i, value: i.label }))
    return doubleLabelsArray
}

const changeValuesByLabelsAtArraysOfObject = (obj) => {
    // const doubleLabelsArraysObject = array.map(i => ({ ...i, value: i.label }))

    const doubleLabelsArraysObject = Object.keys(obj).reduce((acc, k) => {
        return acc = { ...acc, [k]: changeValuesByLabelsAtArray(obj[k]) }
    }, {})
    return doubleLabelsArraysObject
}


const randomTools = {
    getDefault,
    getRandomValueFrom,
    getRandomNumberObj,
    getRandomNumber,
    getBy_From_Withrules,
    getRandomFromTo,
    changeValuesByLabelsAtArray,
    changeValuesByLabelsAtArraysOfObject
}

module.exports = randomTools