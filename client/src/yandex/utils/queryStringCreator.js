import _ from "lodash"
import mySuperValidator from "./mySuperValidator"

const reduceObj = (obj, k) => {
    return Object.keys(obj).reduce((acc, f) => {
        if (!(obj[f])) {
            // console.log("return"); 
            return acc
        }
        let str
        if (Array.isArray(obj[f])) {

            str = obj[f].length ? (obj[f].map(i => `${k ? `&${k}.` : ""}${f}=${i}`).join("&") + "&") : ""
            // console.log("array ", f, str);
        }
        else if (typeof obj[f] === "object") {
            // console.log("object ", f);
            const tmp = reduceObj(obj[f], f)
            str = tmp ? `${tmp}&` : ""
        } else {
            // console.log("simple ", f);
            str = `${k ? `&${k}.` : ""}${f}=${obj[f]}`
        }
        acc = acc + str
        return acc
    }, "")


}

export const queryStringDeepCreator = (formState) => {

    let queryString

    queryString = Object.keys(formState).reduce((acc, f) => {
        let str
        str = formState[f] ? (reduceObj(formState[f])) : ""
        acc = acc + str
        return acc
    }, "").replaceAll("&&", "&")
    return queryString
}

export const queryStringCreator = (formState) => {
    console.log("queryStringCreator formState", formState);

    const queryObj = {}
    const path = { i: [] }
    const customDeepClone = (src, key) => {
        if (key) path.i.push(key)
        if (!Array.isArray(src) && typeof src === "object") {

            Object.keys(src).forEach(f => {
                customDeepClone(src[f], f)

            })

        } else if (!mySuperValidator.isEmptyDetecter(src)) {
            let curPath = path.i.concat()

            _.set(queryObj, curPath.join("."), src)
        }
        // else if (Array.isArray(src)) {
        //     // console.log("-array");
        //     if (src.length) {
        //         let curPath = path.i.concat()

        //         _.set(queryObj, curPath.join("."), src)
        //     } else {

        //     }
        // } else if (src) {
        //     let curPath = path.i.concat()
        //     _.set(queryObj, curPath.join("."), src)
        // }
        if (key) path.i.pop(key)
    }

    customDeepClone(formState)
    // console.log("queryObj", queryObj);

    const queryString = `category="${formState.category}"` + "&" + "filters=" + JSON.stringify(queryObj)
    // console.log("queryStringCreator1 queryString", queryString);
    return queryString
}



