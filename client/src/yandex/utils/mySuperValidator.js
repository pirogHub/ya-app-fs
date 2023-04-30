import _, { isEmpty } from "lodash"


export const validateCheckings = {
    isEmail: (string) => {
        return string.match(/^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/) ? "" : 'Должно быть типа Email: *****@*****.*****'
        // ^ ([a - zA - Z0 - 9]) +\@\.([a - zA - Z0 - 9]) +\.([a - zA - Z]){ 2, 4}
    },
    isPassword: (password) => {
        const minLen = 6
        const maxLen = 17
        if (password?.length < minLen) return `Длина пароля должна быть ${minLen} или более символов. Сейчас: ${password?.length ? password.length : 0}`
        if (password?.length > maxLen) return `Длина пароля должна быть ${maxLen} или менее символов. Сейчас: ${password?.length ? password.length : 0}`
        if (!password.match(/^.*([А-ЯA-Z])+.*$/)) return "Пароль должен содержать хотя бы одну большую букву"
        if (!password.match(/^.*([а-яa-z])+.*$/)) return "Пароль должен содержать хотя бы одну маленькую букву"
        if (!password.match(/^.*([0-9])+.*$/)) return "Пароль должен содержать хотя бы одну цифру"
    }
}


const isEmptyDetecter = (src) => {
    // --eсли src -- пустой массив или массив, содержащий хотя бы один undefined  или "" или null
    const is_src_is_Array_and_isNotFull = Array.isArray(src) && (!src.length || src.includes(undefined) || src.includes(null) || src.includes(""))
    const isEmpty = is_src_is_Array_and_isNotFull || !src
    return isEmpty
}

const isObject = (src) => {
    return !Array.isArray(src) && typeof src === "object"
}



// const notDoDeepAndWriteChildrenErrorsToThatKey_Array = ["map"]
const validator = ({
    state,
    notValidateKeysArray,
    validatingMethodsForKeys_MapObj,
    notDoDeepAndWriteChildrenErrorsToThatKey_Array,
    refStructForOnlyNotEmptyValues,
    flagForNotEmptyExisted
}) => {

    //Пример: validatingMethodsForKeys_MapObj = {
    //     "fieldName1": validateCheckings[Method],
    //     "fieldName2": customFunc
    // }

    const getSpecialValidateMethodForKey = (key) => {
        const method = validatingMethodsForKeys_MapObj?.[key]

        return method
    }

    // Для корректного применения методов 
    // из validatingMethodsForKeys_MapObj над 
    // ключами из validatingMethodsForKeys_MapObj:
    // Долгое обяснение:
    // 1. если key есть в validatingMethodsForKeys_MapObj, то
    // при применении метода валидации 
    // из validatingMethodsForKeys_MapObj над src[key]
    // флаг isPassThisStrcut станет true.
    // 2. таким образом,
    // даже если по ключу key дальше вглубь находится объект,
    // то при isPassThisStrcut=true его анализ будет пропущен.
    // Краткое обяснение: 
    // Это сохранит ошибку в errors именно по errors[key]
    let isPassThisStrcut = false


    const errors = {}
    const path = { i: [] }
    const pathForNotEmpty = { i: [] }

    let is_writeChildrenErrorsToThatKey_flag = false // флаг, что обнаружено совпадение с одним из значений в notDoDeepAndWriteChildrenErrorsToThatKey_Array

    const validatorDebug = false
    if (validatorDebug) console.log("=======validator");

    const deepAnalize = (src, key) => {


        if (key) pathForNotEmpty.i.push(key)
        const isObj = isObject(src)
        if (key && refStructForOnlyNotEmptyValues && !isObj && !isEmptyDetecter(src)) {

            flagForNotEmptyExisted.flag = true
            _.set(refStructForOnlyNotEmptyValues, pathForNotEmpty.i.join("."), src)
        }

        if (validatorDebug)
            console.log("validator", "key", `<${key}>`, "path.i", path.i);

        if (!is_writeChildrenErrorsToThatKey_flag && key) path.i.push(key)
        is_writeChildrenErrorsToThatKey_flag = key && notDoDeepAndWriteChildrenErrorsToThatKey_Array && !is_writeChildrenErrorsToThatKey_flag && notDoDeepAndWriteChildrenErrorsToThatKey_Array.includes(key)


        if (key) {
            const isEmpty = isEmptyDetecter(src)
            if (isEmpty) {
                if (validatorDebug) console.log("setError to", path.i);

                let curPath = path.i.concat()

                if (is_writeChildrenErrorsToThatKey_flag) {
                    is_writeChildrenErrorsToThatKey_flag = false
                }
                _.set(errors, curPath, "Поле не должно быть пустым")
                // isPassThisStrcut = true
            }

            const specialValidateMethodForKey = getSpecialValidateMethodForKey(key)
            if (!isEmpty && specialValidateMethodForKey) {

                if (is_writeChildrenErrorsToThatKey_flag) {
                    is_writeChildrenErrorsToThatKey_flag = false
                }
                let curPath = path.i.concat()
                const errorMessage = specialValidateMethodForKey(src)

                if (errorMessage) {
                    _.set(errors, curPath, { message: errorMessage })
                } else {
                    const lastWrittenKeyIdx = curPath.length - 1
                    delete errors[curPath[lastWrittenKeyIdx]]
                }
                isPassThisStrcut = true
            }
        }

        if (isObject(src) && !isPassThisStrcut) {
            Object.keys(src).forEach(k => {

                // const weCanValidateThisKey = !(notValidateKeysArray && notValidateKeysArray.includes(k))
                let weCanValidateThisKey = true
                if (notValidateKeysArray) {
                    weCanValidateThisKey = !notValidateKeysArray.includes(k)
                }
                if (weCanValidateThisKey) {
                    if (validatorDebug) console.log(`${"-".repeat(path.i.length)}`, "in ", `<${key}> with`, `'${k}'`, "src", src);
                    deepAnalize(src[k], k)

                    if (validatorDebug) console.log(`${"-".repeat(path.i.length)}`, "out", `<${key}> with`, `'${k}'`, "src", src);
                }
            })
        }
        isPassThisStrcut = false

        // is_writeChildrenErrorsToThatKey_flag = isWeWroteError
        if (
            is_writeChildrenErrorsToThatKey_flag
            && key
            && notDoDeepAndWriteChildrenErrorsToThatKey_Array.includes(key)
            && path.i[path.i.length - 1] === key) {
            is_writeChildrenErrorsToThatKey_flag = false
        }


        if (key && !is_writeChildrenErrorsToThatKey_flag) {
            if (validatorDebug) console.log("pop");
            path.i.pop()
        } else {
            if (validatorDebug) console.log("cant pop");
        }

        if (key) pathForNotEmpty.i.pop()

    }

    deepAnalize(state)

    if (validatorDebug) console.log("validator errors", errors);
    if (validatorDebug) console.log("=======validator");
    // setErrorsState(prev => errors)
    return errors
}



const mySuperValidator = {
    validator,
    createWithNotEmptyFrom: (src) => {
        const dst = {}
        const flag = { flag: false }
        validator({ state: src, refStructForOnlyNotEmptyValues: dst, flagForNotEmptyExisted: flag })
        return (flag.flag) ? dst : null
    },
    isEmptyDetecter,
}

export default mySuperValidator