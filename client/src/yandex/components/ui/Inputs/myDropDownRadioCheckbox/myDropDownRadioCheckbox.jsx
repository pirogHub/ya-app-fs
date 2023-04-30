import React, { useEffect, useRef, useState } from "react";
import OptionButton from "../../../Cards/OptionButton";

import "./myDropDownRadioCheckbox.scss"

import { useRandomStateHandler } from "../../../../hooks/useRandomStateHandler/useRandomHandler";
import mySuperValidator from "../../../../utils/mySuperValidator";


const getLabel = (state, optionsList) => {
    let str = ""
    if (state?.length) {
        str = optionsList
            .filter(o => {
                const flag = (state.includes(o.value))
                return flag
            })
            .map(o => o.label).join(', ')

    }
    let strForCheck = str ? str.replaceAll(" ", "") : ""
    if (strForCheck) {
        return str
    } else {
        return <span className="dropdownRadioCheckbox_fakePlaceholder">Выберите...</span>
    }

}

const MyDropDownRadioCheckbox = ({
    type,
    name,
    formState,
    optionsList,
    randomState,
    onChange,
    showDisableOptionsAsDisable,
    isDebug,
    atShowLabelFormatting,
    onRandomStateChanged
}) => {

    const [state, setState] = useState(
        type === "radio" ? [optionsList[0].value] : []
    )




    const refDropDownMenu = useRef()
    const refDropDownCenter = useRef()
    const refTimer = useRef()
    const refIcon = useRef()

    const refWasOpen = useRef(false)

    const isFirstInitRef = useRef(true)

    const currentAtShowLabelFormatting = atShowLabelFormatting ? atShowLabelFormatting : (l) => l


    const {
        checkIsRandomStateResolved_AND_resolveIfNot,
        checkIsRandomStateResolvedOnly
    } = useRandomStateHandler({
        reactComponentName: "MyDropDownRadioCheckbox",
        componentName: name,
        isDebug: true,
        randomState,

        onNewRandomStateDetected: (data, promise) => {

            const newState = data?.length ? data : type === "radio" ? [optionsList[0].value] : []
            if (onRandomStateChanged) onRandomStateChanged(newState)
            // loadValToState(newState)
            setState(prev => newState)
        },
    })


    useEffect(() => {
        const isStateEmpty = checkIsRandomStateResolvedOnly() && optionsList.length && mySuperValidator.isEmptyDetecter(state)
        const tmp2 = state
        if (checkIsRandomStateResolvedOnly() && optionsList.length && isStateEmpty) {

            const newState = type === "radio" ? [optionsList[0].value] : []
            loadValToState(newState)

        }
    }, [state])
    // if (randomState && refThatRandomStateInited.current !== (name ? randomState?.[name] : randomState)) {
    //     // if (isDebug) console.log(`<${name}>`, "randomState  ", randomState, "state", state, "-refThatRandomStateInited.current", refThatRandomStateInited.current,);
    //     if (isDebug) logger({ functionName: "", action: "CHANGE", prop: "randomState", data: randomState })

    //     let data
    //     let tmpRandomState = name ? randomState[name] : randomState
    //     // refThatRandomStateInited.current = tmpRandomState
    //     refThatRandomStateInited.current = tmpRandomState // было как выше строка

    //     // console.log("optionsList", optionsList);
    //     data = tmpRandomState?.value ? tmpRandomState?.value : type === "radio" ? [optionsList[0].value] : []
    //     refRandomPromise.current = tmpRandomState?.promise

    //     // if (isDebug) console.log(`<${name}>`, "!!!randomState  ", randomState,
    //     //     "-state", data,
    //     //     "-refRandomPromise.current", refRandomPromise.current);
    //     setState(prev => data)
    // } else {
    //     // if (isDebug)  console.log(`<${name}>`, "already randomStated  ");
    //     if (isDebug) logger({ functionName: "", action: "ALREADY", prop: "randomState", data: randomState })


    // }


    useEffect(() => {
        //--отключение возможности клика (выбора) у некоторых опций.--
        // Изначально было задумано ( и сейчас как раз здесь реализовано),
        // что type и category ВЗАИМОзависимы и, например, при
        // type=Купить доступны для выбора все категории,
        // а при type=Посуточно доступны для выбора только 3 категории (!и наоборот!).
        // и, поскольку список компонентов category(-/type) 
        // формируется <извне, в зависимости, и при каждом изменении type(-/category)>
        // этот useEffect срабатывает при каждом изменении type(-/category)
        if (showDisableOptionsAsDisable && state.length) {
            const el = optionsList.find(o => o.val === state[0])
            if (el && !el.isEnabled) {
                const firstEnabled = optionsList.find(o => o.isEnabled)
                loadValToState(firstEnabled)
            }
        }
    }, [optionsList])




    const hideMenu = () => {
        refWasOpen.current = false
        refDropDownMenu.current.classList.remove("show")
        refIcon.current.classList.remove("to-rotate")
    }

    const handlerToggleShow = (e) => {
        refDropDownMenu.current.classList.toggle("show")
        refIcon.current.classList.toggle("to-rotate")
    }


    const handleSetOrClearTimeout = (isShowMenu) => {
        if (isShowMenu) {
            if (isDebug) console.log("mouseLeave setTimeout");
            refTimer.current = window.setTimeout(() => {
                hideMenu()
            }, 300)
        } else {
            if (refTimer.current) clearTimeout(refTimer.current)
            refTimer.current = undefined
        }
    }

    const loadValToState = (option) => {
        refWasOpen.current = true
        if (type === "radio") setState([option.value])
        else {
            let curIdx = undefined
            const newState = state.filter((v, idx) => {
                if (v !== option.value) return true
                else {
                    curIdx = idx
                    return false
                }
            })
            if (!curIdx && curIdx !== 0) newState.push(option.value)
            setState(newState)
        }
    }

    useEffect(() => {


        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return

        // if (isDebug) logger({ functionName: "", action: "UPload", prop: "state", data: state })
        console.log(name, "UPload state", state);
        let valsArr = state
        if (name) onChange({ ...{ [name]: [...valsArr] } }, isFirstInitRef.current)
        else onChange([...valsArr], isFirstInitRef.current)
        if (type === "radio") hideMenu()

        isFirstInitRef.current = false
    }, [state])

    return (
        <div

            onMouseLeave={() => handleSetOrClearTimeout(true)}
            onMouseEnter={() => handleSetOrClearTimeout(false)}
            onClick={handlerToggleShow}
            className="dropdownRadioCheckbox-wrapper"
        >
            <div
                className="dropdownRadioCheckbox-center"

            >
                <div ref={refDropDownCenter} className="dropdownRadioCheckbox-choosen">

                    {
                        getLabel(state, optionsList)
                    }

                </div>

                <div
                    className="dropdownRadioCheckbox-icon-wrapper"
                >
                    <div
                        ref={refIcon}
                        className={"dropdownRadioCheckbox-icon-rotate"}
                    >
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
            </div>
            {type === "radio"
                ? <ul
                    ref={refDropDownMenu}
                    className="dropdownRadioCheckbox-menu"
                >
                    {optionsList?.length
                        && optionsList.map((o) => {
                            if (o.value !== state[0]) {
                                let curHandler = () => loadValToState(o)
                                let status
                                if (showDisableOptionsAsDisable) {
                                    if (!o?.isEnabled) status = "disable"
                                    // console.log("dropdownRadioCheckbox o", o);
                                }
                                return (
                                    <li key={o.value}
                                        className="dropdownRadioCheckbox-item"
                                        style={(status === "disable" ? { cursor: "default" } : { cursor: "pointer" })}
                                    >
                                        <OptionButton {...{ ...o, handler: curHandler }} status={status} />
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                : <ul
                    ref={refDropDownMenu}
                    className={(refWasOpen?.current ? "dropdownRadioCheckbox-menu show" : "dropdownRadioCheckbox-menu")
                    }
                >
                    {optionsList?.length
                        && optionsList.map((o) => {

                            return (
                                <li key={o.value} className="dropdownRadioCheckbox-item"
                                    onClick={(e) => {

                                        loadValToState(o)
                                    }}
                                >
                                    <>
                                        <input id={o.value}
                                            type="checkbox"
                                            checked={state.find(v => v === o.value)}
                                        />
                                        {o.label}

                                    </>


                                </li>
                            )
                        })
                    }
                </ul>
            }


        </div>
    )

}

export default MyDropDownRadioCheckbox