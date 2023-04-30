function radioCheckbox({ options, optionsView, aloneVal, noOptionsWrapper, tryInputsViewAutoWhenNeed }) {

    return { options, optionsView, aloneVal, noOptionsWrapper, tryInputsViewAutoWhenNeed }
}
//----------------------------

function textInputGroup({
    divider = "",
    collectiveBorder = false,
    isInputBorder = false,
    inputsConfig = [], //[{ name: "from", placeholder: "с", maxLength: 4, size: 4 }]
    Postfix = "",

}) {

    return {
        divider,
        collectiveBorder,
        isInputBorder,
        inputsConfig,
        Postfix,
    }
}
//----------------------------
function roomsCount({
    optionsList,
    optionsView = "circle",
    inputsConfig = [], //[{ name: "from", placeholder: "с", maxLength: 4, size: 4 }]
    tryInputsViewAutoWhenNeed,

}) {

    return {
        optionsList,
        optionsView,
        inputsConfig,
        tryInputsViewAutoWhenNeed,
    }
}
//============================
const configGenerator = {
    radioCheckbox,
    textInputGroup,
    roomsCount
}


module.exports = configGenerator