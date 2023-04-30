const thousandDelimeter = (valStringOrNum, spacesCounter) => {
    // const str = "1234567890"
    let val = ""
    if (typeof valStringOrNum === "number") {
        val = `${valStringOrNum}`
    } else if (typeof valStringOrNum === "string") {
        val = valStringOrNum.replaceAll(" ", "")
    }
    if (val !== undefined && val.length && typeof val === "string") {

        // console.log("formatting     val", val, "to", typeof val);
        let newSpacesCount = val.match(/\s/g)
        newSpacesCount = newSpacesCount ? newSpacesCount.length : 0
        // console.log("newSpacesCount", newSpacesCount, `<${val}>`)
        const str = val.replaceAll(" ", "")
        let formattedStr = ""
        const len = str.length
        const residue = len % 3
        formattedStr = residue ? str.slice(0, residue) : ""
        const toFormat = str.slice(residue, len)
        const count = (toFormat.length) / 3
        // console.log("toFormat:", toFormat, "count", count);
        for (let i = 0; i < count; i++) {
            const tmp = toFormat.slice(i * 3, (i + 1) * 3)
            // const tmp2 = toFormat.slice(-6, len - 3)
            formattedStr += " " + tmp
            // console.log("tmp", tmp);
        }
        // console.log("formattedStr", formattedStr);
        const spacesDiff = newSpacesCount - spacesCounter
        // console.log("spacesDiff", spacesDiff,
        //     "spacesCount", spacesCounter,
        //     "newSpacesCount", newSpacesCount);
        // if (spacesDiff !== 0) positionRef.current += spacesDiff
        // return formattedStr.trimStart()
        let lastMagic = formattedStr.trimStart()
        lastMagic = lastMagic.replaceAll(" .", ".")
        lastMagic = lastMagic.replaceAll(". ", ".")
        return {
            formattedString: lastMagic,
            newSpacesCount: newSpacesCount,
            positionDiff: spacesDiff
        }

    }
    return {
        formattedString: "",
        newSpacesCount: spacesCounter,
        positionDiff: 0
    }
}

const postfixMlnCreator = (str) => {
    try {
        let curStr = typeof str === "number" ? `${str}` : str
        let minus = curStr.indexOf("-") === -1 ? "" : "-"
        curStr = curStr.replaceAll(" ", "")
        curStr = curStr.replaceAll("-", "")
        curStr = curStr.split(".")[0]
        curStr = thousandDelimeter(curStr).formattedString
        let arrStr = curStr.split(" ")
        arrStr.reverse()
        let newString = str
        const len = arrStr.length
        switch (len) {

            case 1:
                newString = str

                break;
            case 2:
                newString = arrStr[1] + " " + arrStr[0]
                break;
            case 3:
                newString = arrStr[2] + "," + arrStr[1].slice(0, 2) + " млн"
                break;
            case 4:
                newString = arrStr[3] + "," + arrStr[2].slice(0, 2) + " млрд"
                break;
            default:
                newString = curStr.slice(4).join(" ") + "," + arrStr[3].slice(0, 2) + " млрд"
                break;
        }

        return minus + newString

    } catch (error) {
        return str
    }

}

const thousandDelimeterFromStringOrNumber = (smth) => {
    let newSmth
    if (typeof smth === "number") {
        newSmth = `${smth}`
    } else if (typeof smth === "string") {
        newSmth = smth.replaceAll(" ", "")
    }
    newSmth = thousandDelimeter(newSmth).formattedString
    return newSmth
}

export { thousandDelimeter, postfixMlnCreator, thousandDelimeterFromStringOrNumber }