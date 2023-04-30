import React, { useEffect, useRef, useState } from "react";

import "./GenTextArea.scss"
import FormRow from "../../../FormComponents/FormRow";
import { useRandomStateHandler } from "../../../../hooks/useRandomStateHandler/useRandomHandler";

const GenTextArea = ({ formState, name, loadValToForm, randomState, errorsState }) => {

    const refTextArea = useRef()

    // let data = ""
    const [state, setState] = useState()

    const { checkIsRandomStateResolved_AND_resolveIfNot } = useRandomStateHandler({
        reactComponentName: "GenTextArea",
        componentName: name,
        randomState,
        onNewRandomStateDetected: (data, resolveRandomState) => {
            refTextArea.current.value = data
            autoGrow(refTextArea.current)
            setState(prev => data)
        },
        isDebug: true
    })

    // const refThatRandomStateInited = useRef(false)
    // const refRandomPromise = useRef()
    // useEffect(() => {
    //     if (randomState && (refThatRandomStateInited.current !== (name ? randomState?.[name] : randomState))) {

    //         refThatRandomStateInited.current = (name ? randomState?.[name] : randomState)

    //         let data = refThatRandomStateInited.current?.value
    //         refThatRandomStateInited.current?.promise?.resolve()

    //         refTextArea.current.value = data
    //         autoGrow(refTextArea.current)
    //         setState(prev => data)
    //     }
    // }, [randomState])



    useEffect(() => {
        // data =
        //     formState
        //         ? name
        //             ? formState?.[name]
        //             : formState
        //         : undefined

        // if (randomState && (refThatRandomStateInited.current !== (name ? randomState?.[name] : randomState))) {

        //     refThatRandomStateInited.current = (name ? randomState?.[name] : randomState)

        //     data = refThatRandomStateInited.current?.value
        //     refThatRandomStateInited.current?.promise?.resolve()
        // }
        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return
        let data = ""
        if (state === undefined) {

            setState(prev => data)
            console.log("onBlurHandler data === undefined");
            loadValToForm({ [name]: data })
            return
        }
        // refTextArea.current.value = data
        // autoGrow(refTextArea.current)
        // onBlur({ [name]: refTextArea.current.value })
    })


    const onBlurHandler = ({ target }) => {
        if (!checkIsRandomStateResolved_AND_resolveIfNot()) return
        console.log("onBlurHandler", { [name]: target.value });
        if (loadValToForm) loadValToForm({ [name]: target.value })
    }


    function autoGrow(target) {
        target.style.height = 'auto';
        const height = target.scrollHeight > target.style.minHeight ? target.scrollHeight : target.style.minHeight
        target.style.height = height + 'px';
    }

    return (

        <FormRow errorsState={errorsState}>
            <textarea
                // id="story"
                ref={refTextArea}
                name={name}
                className="Gentextarea"
                autoComplete="off"
                rows="5"
                onBlur={onBlurHandler}
                onChange={({ target }) => {
                    // data = target.value
                    autoGrow(target)
                }}
                placeholder="Опишите недвижимость"
            // value={data}
            >

            </textarea>
        </FormRow>
    )
}

export default GenTextArea