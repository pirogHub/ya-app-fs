import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "./TwoInputs.scss"
import GenTextInput from "../GenTextInput";
const TwoInputs = ({
    name,
    inputsConfig,
    onChange,
    randomState,
    divider,
    collectiveBorder,
    Postfix,
    isDebug,
    isInputBorder,
    isWithoutPostfixDivider
}) => {

    const refAnti_FirstRerender = useRef(0)

    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "name",); }, [name])
    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "inputsConfig",); }, [inputsConfig])
    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "onChange",); }, [onChange])
    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "randomState",); }, [randomState])
    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "divider",); }, [divider])
    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "collectiveBorder",); }, [collectiveBorder])
    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "Postfix",); }, [Postfix])
    // useEffect(() => { if (isDebug) console.log(`<${name} "TwoInputs">`, "CHANGE", "isDebug",); }, [isDebug])

    const [state, setState] = useState()


    const handler = useCallback((val) => {
        setState(prev => ({ ...state, ...val }))
        if (isDebug) console.log(`<${name} "TwoInputs">`, "UPload State useEffect", "val", val,);
        if (name) onChange({ ...{ [name]: { ...val } } })
        else onChange({ ...val })
    }, [])


    const CollectiveBorder = ({ collectiveBorder, children }) => {
        if (collectiveBorder) {
            return (
                <div className={collectiveBorder ? "filterItem" : ""}>
                    {children}
                </div>
            )
        } else {
            return <>
                {children}
            </>
        }
    }
    useEffect(() => {
        console.log(`<${name}>`, "TWOINPUTS FIRST RENDER useEffect");
        refAnti_FirstRerender.current++
    }, [])


    const inputs = useMemo(() => inputsConfig.map(
        (input, idx) => {
            // console.log("inputsConfig[idx]?.placeholder?.length", inputsConfig[idx]?.placeholder?.length);
            // return <div key={inputsConfig[idx]?.name} >
            return <GenTextInput
                // refAnti_FirstRerender={refAnti_FirstRerender.current}
                parentName={name}
                // key={inputsConfig[idx]?.name}
                // {...(inputsConfig[idx])}
                // isDebug={isDebug}
                name={inputsConfig[idx].name}
            // randomState={randomState?.[name]}
            // classNameInput={isInputBorder ? "" : "simpleInput"}
            // loadValToForm={handler}
            // isWidth100={inputsConfig[idx]?.width100 ? inputsConfig[idx]?.width100 : false}
            // size={inputsConfig[idx]?.size ? inputsConfig[idx]?.size : 4}
            // maxLength={inputsConfig[idx]?.maxLength ? inputsConfig[idx]?.maxLength : 3}
            // placeholder={inputsConfig[idx]?.placeholder}
            // isPlaceholderWidth={inputsConfig[idx]?.isPlaceholderWidth}
            />
            // {idx + 1 !== inputsConfig.length ? <span>{divider ? divider : "-"}</span> : <></>}
            // </div>
        }
    ), [inputsConfig])

    return (<CollectiveBorder collectiveBorder={collectiveBorder} key={name} >
        {

            inputsConfig.map(
                (input, idx) => {
                    // console.log("inputsConfig[idx]?.placeholder?.length", inputsConfig[idx]?.placeholder?.length);
                    return <React.Fragment key={inputsConfig[idx]?.name} >
                        <GenTextInput
                            formState={state?.[inputsConfig[idx]?.name]}
                            refAnti_FirstRerender={refAnti_FirstRerender.current}
                            parentName={name}
                            key={inputsConfig[idx]?.name}
                            {...(inputsConfig[idx])}
                            isDebug={isDebug}
                            name={inputsConfig[idx].name}
                            randomState={randomState?.[name]}
                            classNameInput={isInputBorder ? "" : "simpleInput"}
                            loadValToForm={handler}
                            isWidth100={inputsConfig[idx]?.width100 ? inputsConfig[idx]?.width100 : false}
                            size={inputsConfig[idx]?.size ? inputsConfig[idx]?.size : 4}
                            maxLength={inputsConfig[idx]?.maxLength ? inputsConfig[idx]?.maxLength : 3}
                            placeholder={inputsConfig[idx]?.placeholder}
                            isPlaceholderWidth={inputsConfig[idx]?.isPlaceholderWidth}
                        />
                        {idx + 1 !== inputsConfig.length ? <span>{divider ? divider : "-"}</span> : <></>}
                    </React.Fragment>
                }
            )
        }

        {Postfix ? <span className={"postfix" + (isWithoutPostfixDivider ? "" : " border-left")}>{Postfix}</span> : ""}

    </CollectiveBorder>

    )
}

export default TwoInputs