import React, { cloneElement, createRef, useEffect, useRef, useState } from "react";
import { inputViews } from "../../../Cards/AOoptionCard/AOoptionCard";
import AOoptionCard from "../../../Cards/AOoptionCard/AOoptionCard";


import "./GenRadioCheckboxWrapperWithState.scss"

import { useRandomStateHandler } from "../../../../hooks/useRandomStateHandler/useRandomHandler";

const NoWrapper = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

const StandartWrapper = ({ children, curGap }) => {
    return (
        <div className="offer-form-group__inner" style={{ gap: curGap }}>
            {children}
        </div>
    )
}


const GenRadioCheckboxWrapperWithState = ({
    formState,
    type,
    name,
    onChange,
    notEmpty, aloneVal, // notEmpty не даёт отменить выбор, если после отмены data будет пустой. aloneVal при клике на option с полем aloneVal=true (или уходе с него), компонен ведет себя как radio
    Component, componentConfig,
    optionsList, lastChildLabelPostfix,
    disableAfter, disableBefore,
    gap,
    DividerComponent,
    noOptionsWrapper,
    randomState,
    // toggleRandom,
    isDebug,
    tryInputsViewAutoWhenNeed,
    blockByIsEnabledField,
    onRandomStateChanged
}) => {
    const CurComponent = Component ? Component : AOoptionCard
    const curComponentConfig = componentConfig
        ? componentConfig
        : { view: inputViews.square }
    const curGap = gap ? gap : "15px"
    const CurOptionsWrapper = noOptionsWrapper ? NoWrapper : StandartWrapper

    const isFirstInitRef = useRef(true)




    const [state, setState] = useState(
        formState
            ? name
                ? formState?.[name]
                : formState
            : undefined)

    const { checkIsRandomStateResolved_AND_resolveIfNot } = useRandomStateHandler({
        reactComponentName: "GenRadioCheckboxWrapperWithState",
        componentName: name,
        randomState,
        onNewRandomStateDetected: (data, resolveRandomState) => {
            const curData = data ? data : notEmpty ? [optionsList[0].value] : []

            if (onRandomStateChanged) onRandomStateChanged(curData)

            setState(prev => curData)
        },
        isDebug: true
    })


    useEffect(() => {
        // if (isDebug) logger({ functionName: "", action: "rerender", prop: "", data: "" })
        console.log(name, "rerender");

    })



    useEffect(() => {

        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return

        if (isDebug) console.log(`<${name}>`, "UPload State useEffect", "-state", state, "-formState", formState);
        if (name) { onChange({ [name]: [...state] }, isFirstInitRef.current) }
        else { onChange([...state], isFirstInitRef.current) }
        isFirstInitRef.current = false
    }, [state])



    const refPrevWasAloneVal = useRef(false)




    if (state === undefined) {
        const defOpt = optionsList.find(o => o?.default === true)
        if (defOpt) setState([defOpt.value])
        else setState([])
    }



    const handler = ({ value, ref }, o) => {
        let newState = [...state]
        let idx = newState.indexOf(value)
        let tmpType = type

        if (notEmpty && newState.length === 1 && newState[0] === value) return

        if (aloneVal) {
            if (o?.aloneVal) {
                refPrevWasAloneVal.current = true
                tmpType = "radio"
            } else if (refPrevWasAloneVal.current) {
                tmpType = "radio"
                refPrevWasAloneVal.current = false
            } else {
                refPrevWasAloneVal.current = false
            }

        }

        if (idx === -1) {
            if (tmpType === "radio") { newState = [value] }
            else { newState.push(value) }
        } else {
            if (tmpType === "radio") { newState = [] }
            else {

                newState.splice(idx, 1)
            }
        }
        tmpType = type

        setState(prev => [...newState])
    }

    if (notEmpty && (state === undefined || state.length === 0)) {
        setState([optionsList[0].value])

    }


    const getOptionStatus = (o) => {
        if (blockByIsEnabledField) {
            if (!o?.isEnabled) return "disable"
        }
        if (disableAfter && +o.value > disableAfter) return "disable"
        if (disableBefore && +o.value < disableBefore) return "disable"

        if (Array.isArray(state) && state?.includes(o.value)) return "active"
        if (type === "radio" && state?.length) return "inactive"
        if (!state?.length) return
        return
    }



    return (<>

        <CurOptionsWrapper curGap={curGap}>

            {optionsList.map((o, idx) => {
                // const status = getOptionStatus(o.value)
                const status = getOptionStatus(o)

                const label = o.label + (lastChildLabelPostfix ? lastChildLabelPostfix : "")


                // if (DividerComponent) {
                return (
                    <React.Fragment key={typeof o.value === "string" ? o.value : o.label}>

                        <CurComponent  {
                            ...{
                                ...curComponentConfig,
                                ...((tryInputsViewAutoWhenNeed || componentConfig?.tryInputsViewAutoWhenNeed) && o.label?.length > 3 ? { view: inputViews.button } : {}),
                                ...o,
                                ...(lastChildLabelPostfix && o.label && (idx + 1 === optionsList.length) ? { label: label } : {}),
                                handler: (data) => { handler(data, o) },
                                status: status,
                            }}
                        />
                        {idx + 1 < optionsList.length ? DividerComponent ? <DividerComponent /> : <></> : <></>}

                    </React.Fragment>
                )
                // } else {
                //     return (
                //         <CurComponent key={o.value}
                //             {...{
                //                 ...curComponentConfig,
                //                 ...((tryInputsViewAutoWhenNeed || componentConfig?.tryInputsViewAutoWhenNeed) && o.label?.length > 3 ? { view: inputViews.button } : {}),
                //                 ...o,
                //                 ...(lastChildLabelPostfix && o.label && (idx + 1 === optionsList.length) ? { label: label } : {}),
                //                 handler: (data) => { handler(data, o) },
                //                 status: status
                //             }} />
                //     )
                // }


            }
            )}

        </CurOptionsWrapper>
    </>
    )
}

export default GenRadioCheckboxWrapperWithState