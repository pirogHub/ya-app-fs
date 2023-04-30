import React, { useEffect, useRef, useState } from "react";
import { thousandDelimeter } from "../../../../utils/thousandDelimeter";

import "./GenTextInput.scss"
import { useRandomStateHandler } from "../../../../hooks/useRandomStateHandler/useRandomHandler";

const GenTextInput = ({
    refAnti_FirstRerender,
    parentName,
    formState,
    name,
    type,
    classNameInput, isWidth100,
    loadValToForm,
    size, maxLength, placeholder, // мы задать по умолчанию значения
    refForInput,
    onChange_flag, onClear,
    className, // переименовать, чтоб было понятнее
    customDelimeterFunc,
    isThousandDelimeter,
    isDebug,
    randomState,
    notRemoveSpaces, // добавить из TextInput
    isPlaceholderWidth,// постарается ли input растянуться так, чтобы был виден placeholder
    onBlur,
}) => {

    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "">`, "CHANGE", "parentName",); }, [parentName])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "formState",); }, [formState])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "name",); }, [name])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "classNameInput",); }, [classNameInput])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "isWidth100",); }, [isWidth100])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "loadValToForm",); }, [loadValToForm])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "size",); }, [size])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "maxLength",); }, [maxLength])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "placeholder",); }, [placeholder])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "refForInput",); }, [refForInput])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "onChange_flag",); }, [onChange_flag])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "onClear",); }, [onClear])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "className",); }, [className])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "customDelimeterFunc",); }, [customDelimeterFunc])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "isThousandDelimeter",); }, [isThousandDelimeter])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "randomState",); }, [randomState])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "notRemoveSpaces",); }, [notRemoveSpaces])
    // useEffect(() => { if (isDebug) console.log(`<${parentName + " " + name} "GENTEXTINPUT">`, "CHANGE", "isPlaceholderWidth",); }, [isPlaceholderWidth])




    const fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue = useRef({ wasFirstRenderUseEffect: false, wasFirstStateInit: false })









    const positionRef = useRef()
    const spacesCount = useRef(0)


    const refClear = useRef()
    const refInput = useRef()

    const currentRefInput = refForInput ? refForInput : refInput

    const delimeterFunc = useRef(customDelimeterFunc
        ? customDelimeterFunc
        : isThousandDelimeter
            ? thousandDelimeter
            : undefined)



    const [state, setState] = useState("")



    // const refThatRandomStateInited = useRef(false)
    // const refRandomPromise = useRef()
    const { checkIsRandomStateResolved_AND_resolveIfNot, checkIsRandomStateResolvedOnly } = useRandomStateHandler({
        reactComponentName: GenTextInput,
        componentName: name,
        randomState: randomState,
        onNewRandomStateDetected: (data) => {

            onChangeHandler({ target: { value: data } });
            loadToUp(data)
        },
        isDebug
    })
    // useEffect(() => {
    //     if (isDebug) console.log(`<${parentName + " " + name}>`, "randomState useEffect ", "-state", state, "randomState", randomState);

    //     console.log(`<${parentName + " " + name}>`, "randomState", randomState, "efThatRandomStateInited.current", refThatRandomStateInited.current);
    //     if (randomState && refThatRandomStateInited.current !== name ? randomState[name] : randomState) {
    //         if (isDebug) console.log(`<${parentName + " " + name}>`, "randomState ", "-state", state);

    //         // console.log("GenTextInput random", randomState);

    //         let tmpRandomState = name ? randomState[name] : randomState
    //         // refThatRandomStateInited.current = true
    //         refThatRandomStateInited.current = tmpRandomState
    //         let data
    //         data = tmpRandomState?.value ? tmpRandomState?.value : ""
    //         refRandomPromise.current = tmpRandomState?.promise


    //         if (data === undefined) {
    //             data = ""
    //         } else if (typeof data !== "string") {
    //             data = `${data}`
    //         }

    //         if (isDebug) console.log(`<${parentName + " " + name}>`, "randomState after", state, refRandomPromise.current);
    //         onChangeHandler({ target: { value: data } })
    //     }
    // }, [randomState])

    useEffect(() => {
        const val = name ? formState?.[name] : formState
        if (val !== undefined) onChangeHandler({ target: val })
    }, [formState])

    useEffect(() => {

        // if (refAnti_FirstRerender && refAnti_FirstRerender > 0) return
        fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstRenderUseEffect = true
        if (isDebug) console.log(`<${parentName + " " + name}>`, "GENTEXTINPUT FIRST RENDER useEffect state", state);
        if (!checkIsRandomStateResolvedOnly()) return
        if (!randomState) loadToUp(state, true)
    }, [])

    useEffect(() => {
        if (isDebug) console.log(`<${parentName + " " + name}>`, "useEffect state", state);
        if (onChange_flag) {

            if (isDebug) console.log(`<${parentName + " " + name}>`, "useEffect state onChange_flag", state);

            // потому что мы и так отправляем в useEffect по []. в useEffect по [state] нам не надо, чтоб условного initstate дублировалась
            if (fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current
                .wasFirstRenderUseEffect === true) {
                if (isDebug) console.log(`<${parentName + " " + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstRenderUseEffect);

                if (fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current
                    .wasFirstStateInit === false) {
                    if (isDebug) console.log(`<${parentName + " " + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstStateInit);

                    fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.
                        wasFirstStateInit = true
                } else {
                    if (!checkIsRandomStateResolvedOnly()) return
                    if (isDebug) console.log(`<${parentName + "> <" + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstStateInit);
                    if (isDebug) console.log(`<${parentName + "> <" + name}>`, "useEffect state onChange_flag wasFirstRenderUseEffect", fuckingAnti_LoadToUp_WhenFirstRender_And_OnChangeFlagIsTrue.current.wasFirstStateInit);
                    loadToUp()
                }
            }
        }
    }, [state])

    const loadToUp = (issue, isFirstInit) => {

        // if (randomState && refRandomPromise.current && refThatRandomStateInited.current) {
        //     if (isDebug) console.log(`<${name ? name : "Input"}>`, "resolve RandomState", "- state", (issue !== undefined ? `issue: ${issue}` : state));

        //     refRandomPromise.current.resolve(name)
        //     refRandomPromise.current = undefined
        //     refThatRandomStateInited.current = false
        //     return
        // } 
        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return
        if (isDebug) console.log(`<${parentName + " " + name}>`, "UPload State useEffect", "-data", state);
        const issueState = issue !== undefined ? issue : state
        let val = !notRemoveSpaces ? issueState.replaceAll(" ", "") : issueState
        val = name ? { [name]: val } : val
        // if (name) loadValToForm({ [name]: state?.replaceAll(" ", "") })
        // if (!name) loadValToForm(state?.replaceAll(" ", ""))
        if (loadValToForm) loadValToForm(val, isFirstInit)
    }




    const handleClear = () => {
        // console.log(`<${parentName + " " + name}>`, "GENTEXTInput handleClear");
        setState(prev => "")
        currentRefInput.current.value = ""
        if (onClear) onClear()

        toggleRemover()

        loadToUp("")
    }

    const onBlurHandler = () => {
        // console.log("GENTEXTInput onBlurHandler");

        if (onBlur) onBlur()
        toggleRemover()
        loadToUp()
    }

    const toggleRemover = () => {
        // console.log(`<${parentName + " " + name}>`, "GENTEXTInput toggleRemover");
        refClear.current.classList[(currentRefInput.current.value) ? "add" : "remove"]("TextInput__visible")

    }

    const onChangeHandler = (e) => {

        // console.log(`<${parentName + " " + name}>`, "GENTEXTInput onChangeHandler value", e.target.value, "state", state);
        if (e.target.value === state) return
        //   console.log(`<${parentName+ " " + name}>`, "GENTEXTInput onChangeHandler value", e.target.value);
        if (e.target.value === "" || e.target.value) {
            if (!delimeterFunc.current) {
                currentRefInput.current.value = e.target.value
                // console.log(`<${parentName + " " + name}>`, "GENTEXTInput onChangeHandler setState(prev => e.target.value)", e.target.value, "state", state);

                setState(prev => e.target.value)

            } else {


                const obj = { ...delimeterFunc.current(e.target.value, spacesCount.current) }


                currentRefInput.current.value = obj.formattedString
                spacesCount.current = obj.newSpacesCount
                positionRef.current += obj.positionDiff
                setState(prev => obj.formattedString)

            }
        } else {
            setState(prev => "")

        }
        // if (onChange_flag) loadToUp()
        toggleRemover()
    }





    // })






    return (
        <span className={"InputControl_box"
            + (className ? ` ${className}` : "")
            + (isWidth100 ? " w100" : "")}>

            <input
                size={isPlaceholderWidth && placeholder?.length ? placeholder?.length : size}
                ref={currentRefInput}
                onChange={onChangeHandler}
                className={!classNameInput ? ("AddOffer__input") : ` ${classNameInput}` + (isWidth100 ? " w100" : "")}
                onBlur={onBlurHandler}
                onFocus={toggleRemover}
                type={type ? type : "text"}
                maxLength={maxLength}
                placeholder={placeholder}

            />
            <span onClick={handleClear} ref={refClear} className="TextInput__clear">
                <i className="TextInput__clear-icon"></i>
            </span>
        </span>
    )
}

export default GenTextInput