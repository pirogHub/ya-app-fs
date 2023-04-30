export const nounEndings = (num, noun) => {


    if (typeof (+num) !== "number") {
        return "give me a number"
    }


    let lastNum = (num).toString()
    lastNum = +(lastNum.slice(lastNum.length - 1))


    switch (lastNum) {
        case 1:
            return noun
        case 2:
        case 3:
        case 4:
            return noun + 'a'

        default:
            return noun + 'ов'
    }

}