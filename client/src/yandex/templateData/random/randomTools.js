import ArrayList from "arraylist"

const indexesArr = []
const addIndexes = (count) => {
    for (let i = indexesArr.length; i < count; i++) {
        indexesArr.push(i)
    }
}
addIndexes(20)


const getRandomNumber = (max, min = 0, fixed = 0) => {
    return +((Math.random() * (max - min)) + min).toFixed(fixed)

}

const getRandomNumberObj = ({ max, defMax = 0, min = 0, toFixed = 0, isString = false, canBeEmpty = false }) => {
    // console.log(max, min, toFixed, canBeEmpty);
    if (canBeEmpty && Math.random() > 0.65) return isString ? "" : undefined
    // if (max === 0 ) 
    const curMax = max ? max : defMax
    return +((Math.random() * (curMax - min)) + min).toFixed(toFixed)

}

const getRandomValuesFromObj = (obj, canBeEmpty, type = "radio") => {
    let valsCount = 1
    let valsContainer = []
    let keys = Object.keys(obj)
    if (type !== "radio") {
        valsCount = getRandomNumber(keys.length - 1, 1)
    }
    for (let i = 0; i < valsCount; i++) {
        const randomField = keys[getRandomNumber(keys.length - 1)]
        const randomVal = obj[randomField]

        if (randomVal?.aloneVal === true) {
            const randomChance = Math.random()
            // console.log("randomChance", randomChance);
            if (randomChance < 0.4) { }
            else return [...[randomVal.value]]
        } else {
            valsContainer.push(randomVal.value)
        }
    }
    if (canBeEmpty && Math.random() > 0.6) {
        return []
    }
    return valsContainer
}

const getRandomValuesFromArr = (arr, canBeEmpty, type = "radio") => {
    let valsCount = 1
    let valsContainer = []
    if (type !== "radio") {
        valsCount = getRandomNumber(arr.length - 1, 1)
    }
    for (let i = 0; i < valsCount; i++) {
        const randomIdx = getRandomNumber(arr.length - 1)
        const randomVal = arr[randomIdx]

        if (randomVal?.aloneVal === true) {
            // console.log("AloneVAL");
            if (valsContainer.length === 0) return [...[randomVal.value]]

            const randomChance = Math.random()
            if (randomChance < 0.4) { }
            else return [...[randomVal.value]]

        } else {
            valsContainer.push(randomVal.value)
        }

    }
    if (canBeEmpty && Math.random() > 0.6) {
        return []
    }
    return valsContainer
}

const getRandomValueFrom = (data, canBeEmpty = false, type = "radio") => {
    // return (Array.isArray(data)) ? getRandomValuesFromArr(data, canBeEmpty, type) : getRandomValuesFromObj(data, canBeEmpty, type)
    return getRandomValueFromUniversal(data, canBeEmpty, type)
}


const randomTools = {
    getRandomValueFrom,
    getRandomNumber,
    getRandomNumberObj
}

export default randomTools


const getRandomValueFromUniversal = (container, canBeEmpty, type = "radio") => {
    // console.log("-------------------------------", container);
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
        // console.log("before list", list, "randomIdxOfPosition", randomIdxOfPosition, "randomPosition", randomPosition);
        list.remove(randomIdxOfPosition)
        // console.log("after  list", list, "randomIdxOfPosition", randomIdxOfPosition, "randomPosition", randomPosition);
        return randomPosition
    }

    if (type !== "radio") {
        valsCount = getRandomNumber(keysORarr.length - 1, 1)
    }
    for (let i = 0; i < valsCount; i++) {
        const randomPosition = curGetPosition()
        const randomVal = container[randomPosition]

        if (randomVal?.aloneVal === true) {
            // console.log("AloneVAL");
            if (valsContainer.length === 0) return [...[randomVal.value]]

            const randomChance = Math.random()
            if (randomChance < 0.4) { }
            else return [...[randomVal.value]]

        } else {
            valsContainer.push(randomVal.value)
        }

    }
    if (canBeEmpty && Math.random() > 0.6) {
        return []
    }
    return valsContainer
}