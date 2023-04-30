import React from "react";

import GenTextInput from "../GenTextInput";
import "./TextInputsGroup.scss"

const TextInputGroup = ({
    name,
    inputsConfig,
    onChange,
    randomState,
    formState,
}) => {

    let data = formState
        ? formState?.[name]
            ? formState?.[name] : formState
        : {}

    const handler = (val, isFirstInit) => {
        data = { ...data, ...val }
        onChange({ [name]: { ...data } }, isFirstInit)
    }

    return (
        <div className="TextInputGroup">
            {inputsConfig && inputsConfig.map((i, idx) => (
                <div
                    // style={{ marginLeft: `${-1 * idx}px` }} 
                    key={i.name}
                    className="TextInputGroup_description"
                >
                    <GenTextInput
                        formState={formState?.[name]}
                        name={i.name}
                        loadValToForm={handler}
                        randomState={randomState?.[name]} />
                    <span> {i.label}</span>
                </div>
            ))}
        </div>
    )
}

export default TextInputGroup