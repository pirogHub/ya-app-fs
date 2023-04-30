import React, { useEffect, useRef, useState } from "react";
import GenRadioCheckboxWrapperWithState from "./GenRadioCheckboxWrapperWithState";
import FormRow from "../../FormComponents/FormRow";


const AOroomsCountComponent = ({
    isDebug,
    name,
    randomState,
    inputsConfig,
    onChange,
    errorsState,
    componentConfig,
    optionsList,
    tryInputsViewAutoWhenNeed
}) => {

    useEffect(() => {
        console.log("AOroomsCountComponent errorsState", errorsState);
    }, [errorsState])
    const [state, setState] = useState(
        inputsConfig?.length === 2
            ? {
                [inputsConfig[0].name]: [0],
                [inputsConfig[1].name]: [6],
            }
            : {}
    )

    const refThatRandomStateInited = useRef(false)


    if (randomState && refThatRandomStateInited.current !== (name ? randomState?.[name] : randomState)) {
        if (isDebug) console.log(`<${name}>`, "randomState  ", randomState, "-state", refThatRandomStateInited.current,);

        let data
        let tmpRandomState = name ? randomState[name] : randomState
        refThatRandomStateInited.current = tmpRandomState // было как выше строка


        data = Object.keys(tmpRandomState).reduce((acc, k) => acc = { ...acc, [k]: tmpRandomState[k].value }, {})

        if (isDebug) console.log(`<${name}>`, "!!!randomState  ", randomState, "-state", refThatRandomStateInited.current, "-value", data);
        setState(prev => data)
    } else {
        if (isDebug) console.log(`<${name}>`, "!!!randomState  ", randomState, "-state", refThatRandomStateInited.current, "-value", state);

    }
    const handler = (val) => {
        console.log("AOroomsCountComponent errorsState", errorsState);

        if (refThatRandomStateInited.current === (name ? randomState?.[name] : randomState)) {
            if (isDebug) console.log(`<${name}>`, "resolve randomState  ", "-state", refThatRandomStateInited.current, "-value", state);

            // refRandomPromise.current?.resolve(name)
            // refRandomPromise.current = undefined
            // refThatRandomStateInited.current = false
            return
        }
        console.log("state", state, val);
        const newState = { ...state, ...val }
        // Object.keys(val).map(k => newState[k] = val[k])

        console.log("state", state, val);
        setState(prev => ({ ...newState }))
        onChange({ [name]: val })
    }

    useEffect(() => {
        // if (refThatRandomStateInited.current === (name ? randomState?.[name] : randomState)) {
        //     if (isDebug) console.log(`<${name}>`, "resolve randomState  ", "-state", refThatRandomStateInited.current, "-value", state);

        //     // refRandomPromise.current?.resolve(name)
        //     // refRandomPromise.current = undefined
        //     // refThatRandomStateInited.current = false
        //     return
        // }
        console.log("useEffect state", state)
        // onChange({ [name]: { ...state } })
    }, [state])

    useEffect(() => {
        console.log("useEffect [] state", state)
        setState(
            inputsConfig?.length === 2
                ? {
                    [inputsConfig[0].name]: [0],
                    [inputsConfig[1].name]: [0],
                }
                : {})
    }, [])

    return (<>
        <FormRow errorsState={errorsState?.rooms_total} label="Комнат">
            <GenRadioCheckboxWrapperWithState
                type="radio"
                name="rooms_total"
                componentConfig={componentConfig}
                onChange={handler}
                // disableAfter={state?.rooms_total[0]}
                disableBefore={
                    inputsConfig?.length === 2 ? state?.rooms_forSale?.[0] : undefined
                }
                optionsList={optionsList}
                // formState={state}
                randomState={randomState?.[name]}
                isDebug={isDebug}
                tryInputsViewAutoWhenNeed={tryInputsViewAutoWhenNeed}
            />

        </FormRow>

        {
            inputsConfig?.length === 2
            && <FormRow errorsState={errorsState?.rooms_forSale} label="Комнат в сделке">
                <GenRadioCheckboxWrapperWithState
                    type="radio"
                    name="rooms_forSale"
                    componentConfig={componentConfig}
                    onChange={handler}
                    disableAfter={state?.rooms_total?.[0]}
                    optionsList={optionsList}
                    // formState={state}
                    randomState={randomState?.[name]}
                    isDebug={isDebug}
                    tryInputsViewAutoWhenNeed={tryInputsViewAutoWhenNeed}
                />

            </FormRow>

        }
    </>)
}

export default AOroomsCountComponent