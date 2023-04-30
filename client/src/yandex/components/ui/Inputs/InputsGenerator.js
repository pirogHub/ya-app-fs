import React from "react";

import { inputViews } from "../../Cards/AOoptionCard/AOoptionCard";
// import OfferFormGroup from "../../../page/offerAddPage/offerFormGroup";
// import OfferFormRowNew from "../../../page/offerAddPage/offerFormRowNew";
import CleanYaMap from "../Map/CleanYaMap";
import TextInputGroup from "./TextInputsGroup";
import TwoInputs from "./TwoInputs";
import GenAddPhotos from "./GenAddPhotos/GenAddPhotos";
import GenAddPlanPhoto from "./GenAddPlanPhoto/GenAddPlanPhoto";
import GenAddYoutube from "./GenAddYoutube";
import GenRadioCheckboxWrapperWithState from "./GenRadioCheckboxWrapperWithState";
import GenShowOnline from "./GenShowOnline";
import GenTextArea from "./GenTextArea";
import GenTextInput from "./GenTextInput";
import GenTextInputFakePlaceholder from "./GenTextInputFakePlaceholder/GenTextInputFakePlaceholder";
import AOroomsCountComponent from "./AOroomsCountComponent";
import FormGroup from "../../FormComponents/FormGroup";
import FormRow from "../../FormComponents/FormRow";



const inputsGenerator = ({
    serverComponentsStruct,
    loadValToForm,
    syntheticStateOfAll,
    errorsStateOfALL,
    clearTogglerFlag,
    refElementsCounter,
    externalElementsCount,
    notNessesaryParamsKeyMap,
    onGeneratingStart,
    onGeneratingEnd,
    refIsNotRequiredArray
}) => {
    if (refElementsCounter) refElementsCounter.current = externalElementsCount ? externalElementsCount : 0
    if (refIsNotRequiredArray) refIsNotRequiredArray.current = []
    const path = { i: [] }
    if (onGeneratingStart) onGeneratingStart()

    const generateComponent = (c, type, fieldName, handler, syntheticState, errorsState) => {
        if (fieldName === "userId") return

        let Component = undefined
        const key = fieldName + (clearTogglerFlag ? "true" : "false")
        let curType = type
        if (fieldName === "area" && !type) {
            curType = "issue"
            // console.log("ISSUE generateComponent c", fieldName, c);
            const handlerIssue = (val, isFirstInit) => {
                console.log("handlerIssue", fieldName, val);
                handler({ [fieldName]: val }, isFirstInit)
            }
            Component = <React.Fragment key={key}>
                {getComponents({ components: c, handler: handlerIssue, syntheticState: syntheticState?.[fieldName] })}
            </React.Fragment>
        }
        const isNotRequired = (
            notNessesaryParamsKeyMap && notNessesaryParamsKeyMap.includes(fieldName)
            || c?.isNotRequired === true
        )
        // [isNotRequired ? "isNotRequired" : "isRequired"][path.i.join("-")]
        if (isNotRequired && refIsNotRequiredArray) refIsNotRequiredArray.current.push(fieldName)
        const config = {
            key: key,
            name: fieldName,
            loadValToForm: handler,
            randomState: syntheticState,
            onChange: handler,
            isDebug: true,
            type: type,
            errorsState: errorsState?.[fieldName],
            // ...c?.config,
            // isInputBorder: isInputBorder,
            clearTogglerFlag,
            componentConfig: { view: inputViews[c?.config?.optionsView] },
            optionsList: c?.config?.options,
            ...c?.config,
            isNotRequired
        }
        // console.log("notNessesaryParamsKeyMap", notNessesaryParamsKeyMap);
        // console.log("fieldName", fieldName);
        // console.log("Array.isArray(notNessesaryParamsKeyMap) && notNessesaryParamsKeyMap.includes(fieldName)", Array.isArray(notNessesaryParamsKeyMap) && notNessesaryParamsKeyMap.includes(fieldName));
        // console.log("generateComponent fieldName", fieldName);
        if (refElementsCounter) refElementsCounter.current++


        // console.log("generateComponent config", config);
        switch (curType) {

            case "input": Component = <GenTextInput {...config} />; break;
            case "radio":
            case "checkbox": Component = <GenRadioCheckboxWrapperWithState {...config} />; break;
            case "imgPlan": return <GenAddPlanPhoto  {...config} />
            case "imgPhotos": return <GenAddPhotos {...config} />;
            case "videoYoutube": return <GenAddYoutube {...config} />
            case "textArea": return <GenTextArea {...config} />
            case "showOnline": return <GenShowOnline {...config} />
            case "inputWithFakePlaceholder": Component = <GenTextInputFakePlaceholder {...config} />; break;
            case "map": return <CleanYaMap {...config} />
            case "textInputGroup": if (refElementsCounter) refElementsCounter.current += c?.config?.inputsConfig?.length ? c.config.inputsConfig.length - 1 : 0; Component = <TextInputGroup {...config} />; break;
            case "TwoInputs": { if (refElementsCounter) refElementsCounter.current += c?.config?.inputsConfig?.length ? c.config.inputsConfig.length - 1 : 0; Component = <TwoInputs {...config} />; break; }
            case "roomsCount": { if (refElementsCounter) refElementsCounter.current++; return <AOroomsCountComponent {...config} /> }
            case "components":
                const handlerComponents = (val, isFirstInit) => {
                    loadValToForm({ [fieldName]: val }, isFirstInit)
                }
                if (refElementsCounter) refElementsCounter.current -= 1
                Component = <React.Fragment key={key}>
                    {getComponents({ components: c.components, handler: handlerComponents, syntheticState: syntheticState?.[fieldName] })}
                </React.Fragment>
                break;
            case "issue": return Component
            case "userId": return undefined

            default:

                console.log(c, type, fieldName, handler, syntheticState);
                return undefined;

        }

        return <FormRow
            withoutErrors={errorsStateOfALL ? false : true}
            errorsState={errorsState?.[fieldName]}
            key={fieldName}
            label={c.label}
            isNotRequired={isNotRequired}
        >
            {Component}
        </FormRow>
    }

    const getComponents = ({ components, handler, syntheticState, errorsState }) => {

        return Object.keys(components).map(componentName => {
            const c = components[componentName]
            path.i.push(componentName)
            if (!c) return undefined
            if (c?.components && c?.type !== "components") {

                const deepHandler = (val, isFirstInit) => handler({ [componentName]: val }, isFirstInit)
                const Component = getComponents({ components: c.components, handler: deepHandler, syntheticState: syntheticState?.[componentName], errorsState: errorsState?.[componentName], })
                return Component
            }
            const Component = generateComponent(c, c.type, componentName, handler, syntheticState, errorsState)
            path.i.pop(componentName)
            return Component
        })
    }



    if (serverComponentsStruct) {
        console.log("MEMO", serverComponentsStruct);
        const compsArr = Object.keys(serverComponentsStruct)
            .map(nameOfPart => {
                path.i.push(nameOfPart)
                const part = serverComponentsStruct[nameOfPart] // aboutBuilding
                const handler = (val, isFirstInit) => {
                    // console.log("nameOfPart", nameOfPart, val);;
                    loadValToForm({ [nameOfPart]: val }, isFirstInit)
                }
                if (nameOfPart === "alwaysFilters") {
                    console.log("alwaysFilters nameOfPart", nameOfPart);
                    path.i.pop()
                    return <></>
                }
                if (nameOfPart === "userId") { path.i.pop(); return <></> }
                let Component

                if (part?.components) {
                    Component = <FormGroup key={nameOfPart} label={part.label}>
                        {getComponents({ components: part?.components ? part?.components : part, handler, syntheticState: syntheticStateOfAll?.[nameOfPart], errorsState: errorsStateOfALL?.[nameOfPart] })}
                    </FormGroup>
                } else {
                    Component = <FormGroup key={nameOfPart} label={part.label}>
                        {generateComponent(part, part.type, nameOfPart, loadValToForm, syntheticStateOfAll, errorsStateOfALL)}
                    </FormGroup>
                }
                path.i.pop()
                return Component


            })
        if (onGeneratingEnd) onGeneratingEnd()
        return compsArr
    }
    else {

        if (onGeneratingEnd) onGeneratingEnd()
        return null
    }
}

export default inputsGenerator
