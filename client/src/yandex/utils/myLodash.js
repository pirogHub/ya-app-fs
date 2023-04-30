import _ from "lodash"

const isEmptyDetecter = (src) => {
    // --eсли src -- пустой массив или массив, содержащий хотя бы один undefined  или ""
    const is_src_is_Array_and_isNotFull = Array.isArray(src) && (!src.length || src.includes(undefined) || src.includes(null) || src.includes(""))
    const isEmpty = is_src_is_Array_and_isNotFull || !src
    return isEmpty
}

const isObject = (src) => {
    return !Array.isArray(src) && typeof src === "object"
}


const deepMergeWith = ({ to, from, funcWhenCopy, refNoEmptyPathes, paramsForFuncWhenCopy }) => {
    const path = { i: [] }
    // const dstTmp = _.cloneDeep(to)



    const deepAnalize = (src, key) => {

        if (key) path.i.push(key)

        const isObj = isObject(src)
        if (key && !isObj) {
            const fullKeyPath = path.i.concat()
            if (refNoEmptyPathes && !isEmptyDetecter(src)) {
                const notToEmptyPath = path.i.concat()
                refNoEmptyPathes.here.push([...notToEmptyPath])
            }
            const oldVal = _.at(to, fullKeyPath.join("."))[0]
            const newVal = src

            if (to) _.set(to, fullKeyPath.join("."), newVal)
            const lastKey = key
            if (funcWhenCopy) funcWhenCopy(oldVal, newVal, lastKey, fullKeyPath, paramsForFuncWhenCopy)
        }

        if (isObject(src)) {
            Object.keys(src).forEach(k => {

                deepAnalize(src[k], k)

            })
        }

        if (key) path.i.pop()

    }

    deepAnalize(from)
    // to = _.cloneDeep(dstTmp)
}


const myLodash = {
    deepMergeWith,
    getNoEmptyPathes: (src) => {
        const notEmptyPathes = { here: [] }
        deepMergeWith({ from: src, refNoEmptyPathes: notEmptyPathes })
        return notEmptyPathes.here
    },
}

export default myLodash