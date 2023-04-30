import React, { createRef, useEffect, useRef, useState } from "react";
import { thousandDelimeter } from "../../../../utils/thousandDelimeter";
import "./GenTextInputFakePlaceholder.scss"

const GenTextInputFakePlaceholder = ({ formState, name, size, onChange, maxLength, className, placeholder, randomState }) => {
    const [data, setData] = useState(
        formState
            ? name
                ? formState?.[name]
                : formState
            : undefined
    )


    const positionRef = useRef(0)
    const spacesCount = useRef(0)

    const refClear = createRef()
    const refInput = createRef()
    const refFakeInput = createRef()
    const refFakeInputContainer = createRef()



    const refThatRandomStateInited = useRef(false)
    const refRandomPromise = useRef(undefined)

    useEffect(() => {
        console.log("GenTextInputFakePlaceholder", randomState);
        if (randomState && (refThatRandomStateInited.current !== (name ? randomState?.[name] : randomState))) {
            let obj = name ? randomState[name] : randomState
            if (!obj || Object.keys(obj).length === 0) {
                obj = {}
                obj.value = ""
                obj.promise = undefined
            }
            refThatRandomStateInited.current = name ? randomState[name] : randomState

            let tmpRandomState = obj?.value ? obj?.value : ""
            refRandomPromise.current = obj?.promise

            if (tmpRandomState === undefined) {
                tmpRandomState = ""
            }
            if (typeof tmpRandomState !== "string") {
                tmpRandomState = `${tmpRandomState}`
            }
            onChangeHandler({ target: { value: tmpRandomState ? tmpRandomState : "" } })

        }
    })

    const onChangeHandler = (e) => {
        positionRef.current = e.target.selectionStart

        if (e.target.value) {
            const obj = { ...thousandDelimeter(e.target.value, spacesCount.current) }

            refFakeInput.current.textContent = obj.formattedString
            refInput.current.value = obj.formattedString
            spacesCount.current = obj.newSpacesCount
            positionRef.current += obj.positionDiff
            setData(prev => obj.formattedString)

        } else {
            setData(prev => "")
        }
    }

    const handleClear = () => {
        setData("")
        refInput.current.value = ""
        refFakeInput.current.textContent = ""
    }

    const handleInputFocus = (flag) => {
        if (!data) refFakeInputContainer.current.classList.toggle("TextInput_fakeInput_containerFocused")
        // console.log("onFocus");
    }

    useEffect(() => {
        if (data) {
            refClear.current.classList.add("TextInput__visible")
            refFakeInputContainer.current.classList.add("TextInput_fakeInput_containerFocused")
        }
        else {
            refClear.current.classList.remove("TextInput__visible")
            if (refFakeInputContainer.current) refFakeInputContainer.current.classList.remove("TextInput_fakeInput_containerFocused")

        }

        if (randomState && refRandomPromise.current && refThatRandomStateInited.current) {

            refRandomPromise.current.resolve(name)
            refRandomPromise.current = undefined
            console.log("resolve");
            return
        }
        onChange({ [name]: data })
    }, [data])




    return (
        <>


            <span className={"InputControl_box InputControl_box_fakeInput" + (className ? ` ${className}` : "")}>


                <span ref={refFakeInputContainer} className="TextInput_fakeInput_container ">
                    <span ref={refFakeInput} className="AddOffer__input AddOffer__input_withFakeInput TextInput_fakeInput" value={formState?.[name]} ></span>
                    <span className="TextInput_fakeInput__label_placeholder">
                        &nbsp;{placeholder}
                    </span>
                </span>

                <input
                    size={size}
                    ref={refInput}
                    onFocus={() => handleInputFocus(true)}
                    onBlur={(e) => handleInputFocus(false)}
                    onChange={onChangeHandler}
                    className={"AddOffer__input AddOffer__input_withFakeInput"}
                    type="text"
                    maxLength={maxLength}

                />
                <span onClick={handleClear} ref={refClear} className="TextInput__clear">
                    <i className="TextInput__clear-icon"></i>
                </span>
            </span>
        </>
    )
}

export default GenTextInputFakePlaceholder