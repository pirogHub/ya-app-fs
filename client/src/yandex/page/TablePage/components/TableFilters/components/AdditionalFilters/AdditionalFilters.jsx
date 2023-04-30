import React, { useEffect, useMemo, useState } from "react";
import dataStructService from "../../../../../../services/dataStruct.service";
import inputsGenerator from "../../../../../../components/ui/Inputs/InputsGenerator";

import "./AdditionalFilters.scss"
import Loader from "../../../../../../components/ui/Loader";
import { getComponentStruct } from "../../../../../../store/componentsStructs";
import { useDispatch } from "react-redux";



const getLabel = (sctuctName) => {
    switch (sctuctName) {
        case "flat": return "Квартирах"
        case "room": return "Комнатах"
        case "house": return "Домах"
        case "commercial": return "Коммерч. недвижимости"
        case "garage": return "Гаражах"
        case "land": return "Земле"

        default:
            break;
    }

}



const AdditionalFilters = ({
    // clearFiltersToggler,
    structName,
    clearFiltersToggler,
    onChange,
    syntheticState,
    onDownloadStructEnd,
    onDownloadStructStart
    // randomState,
    // prarentFormState,
    // toggleRandom,
}
    // props
) => {

    const [isDownloadingStruct, setIsDownloadingStruct] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {

        setIsDownloadingStruct(prev => true)
        async function fetchComponentsStruct() {
            const struct = await dispatch(getComponentStruct({ structName, toWhoom: "seeker" }))
            console.log("struct", struct);
            setServerComponentsStruct(struct)
            setIsDownloadingStruct(prev => false)
        }
        fetchComponentsStruct()
    }, [structName])



    useEffect(() => {
        console.log("AdditionalFilters syntheticStatesyntheticStatesyntheticState", syntheticState);
    }, [syntheticState])
    // const [syntheticState, setSyntheticState] = useState({})

    // const [clearFiltersToggler, toggleclearFiltersToggler] = useState(true)

    useEffect(() => {
        // toggleclearFiltersToggler(prev => !prev)

    }, [syntheticState])

    const [serverComponentsStruct, setServerComponentsStruct] = useState(null)
    const inputList = useMemo(() => inputsGenerator({
        serverComponentsStruct,
        loadValToForm: onChange,
        syntheticStateOfAll: syntheticState,
        clearTogglerFlag: clearFiltersToggler,
        onGeneratingStart: onDownloadStructStart,
        onGeneratingEnd: onDownloadStructEnd,
    }), [serverComponentsStruct, syntheticState, clearFiltersToggler])



    useEffect(() => {

    }, [structName])

    return (
        <div className="TableFilters__additionalFilters">
            {
                isDownloadingStruct
                && <div className="TableFilters__loaderWrapper"><Loader /></div>
            }


            {
                serverComponentsStruct
                && <>
                    <div className="TableFilters__additionalFilters__title">
                        <div className="TableFilters__additionalFilters__title__Category"> Расширенный Поиск по Предложениям о&nbsp;</div>
                        <div className="TableFilters__additionalFilters__title__Category_NAME">{getLabel(structName)}:</div>
                    </div>
                    {inputList}

                // {/*       <SeekAdress
                //     // clearFiltersToggler={clearFiltersToggler}
                //     // onChange={onChange}
                //     // randomState={randomState}
                //     // prarentFormState={prarentFormState}
                //     // toggleRandom={toggleRandom}
                //     {...props}
                // />  */}
                </>
            }
        </div>

    )
}

export default AdditionalFilters