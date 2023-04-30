const declination = ({ number, root, isWoman }) => {
    let lastDigit = `${number}`
    lastDigit = +lastDigit[lastDigit.length - 1]
    let newWord = root
    switch (lastDigit) {
        case 1:
            newWord += isWoman ? 'a' : ''
            break;
        case 2:
        case 3:
        case 4:
            newWord += isWoman ? 'ы' : 'a'
            break;

        default:
            newWord += isWoman ? '' : 'ов'
            break;
    }
    return `${number} ${newWord}`
}

const declinationPro = ({ number, root, for1, for234, for5 }) => {
    // const curnumber = typeof number === "numberber" ? `${number}` : number
    // let lastDigit = `${numberber}`
    let lastDigit = typeof number === "numberber" ? `${number}` : number
    lastDigit = +lastDigit[lastDigit.length - 1]
    let newWord = root
    switch (lastDigit) {
        case 1:
            newWord += for1
            break;
        case 2:
        case 3:
        case 4:
            newWord += for234
            break;

        default:
            newWord += for5
            break;
    }
    return `${number} ${newWord}`
}


const getTypeOrCategory_at_Vinitelniy = (value) => {
    switch (value) {
        case "sell": return "Купить"
        case "rent_short": return "Посуточно"
        case "rent_long": return "Снять надолго"
        case "flat": return "Квартиру"
        case "room": return "Комнату"
        case "house": return "Дом"
        case "garage": return "Гараж"
        case "commercial": return "Коммерч. недвижимость"
        case "land": return "Землю"

        default: return undefined

    }
}

const toRussianLanguage = {
    declination,
    declinationPro,
    getTypeOrCategory_at_Vinitelniy
}

export default toRussianLanguage

