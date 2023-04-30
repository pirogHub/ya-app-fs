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

const toRussianLanguage = {
    declination
}

module.exports = toRussianLanguage

