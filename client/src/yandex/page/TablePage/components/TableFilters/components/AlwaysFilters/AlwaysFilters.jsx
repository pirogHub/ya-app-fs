import React, { useCallback, useEffect, useRef, useState } from "react";
import OptionButton from "../../../../../../components/Cards/OptionButton";
import DividerVertical from "../../../../../../components/ui/Inputs/dividers/DividerVertical";
import MyDropDownRadioCheckbox from "../../../../../../components/ui/Inputs/myDropDownRadioCheckbox/myDropDownRadioCheckbox";
// import TwoInputs from "../../../../../components/Inputs/TwoInputs";
import TwoInputs from "../../../../../../components/ui/Inputs/TwoInputs";
import FilterItem from "../../../../../../components/searchComponents/filtersForm/filterItem";
import FilterItemsRow from "../../../../../../components/searchComponents/filtersForm/filterRow";
import FiltersContainer from "../../../../../../components/searchComponents/filtersForm/filtersContainer";
import Seeker from "../../../../../../templateData/dataSeeker";
import dataTools from "../../../../../../templateData/dataTools";
import GenRadioCheckboxWrapperWithState from "../../../../../../components/ui/Inputs/GenRadioCheckboxWrapperWithState";

import LabelCheckbox from "../../../../../../components/ui/Inputs/LabelCheckbox";
import toRussianLanguage from "../../../../../../utils/toRussianLanguage";


const getCurrentKey = (category) => {

    switch (category) {
        case "flat": return "aboutFlat"
        case "room": return "aboutRoom"
        case "house": return "aboutHouse"
        case "garage": return "aboutGarage"
        case "commercial": return "aboutCommercial"
        case "land": return "aboutLand"

        default:
            break;
    }
}


const AlwaysFilters = ({
    currentCategory,
    name,
    onChange,
    syntheticState,
    clearFiltersToggler
}) => {
    const handler = useCallback((val, isFirstInit) => {
        onChange(val, isFirstInit)
    })

    const refFirstInit = useRef(true)
    const [formState, setFormState] = useState({ type: syntheticState?.type, category: syntheticState?.category })



    const isRoomOrFlat = currentCategory === "room" || currentCategory === "flat"



    return (
        <FiltersContainer>
            <FilterItemsRow

            >

                <FilterItem gridCol="figc-3">
                    <MyDropDownRadioCheckbox
                        type="radio"
                        name="type"
                        optionsList={dataTools.getArrWithDisabledItemsBy_From_WithRooles(formState?.category, Seeker.Options.types, Seeker.Options.categories)}
                        showDisableOptionsAsDisable={true}
                        randomState={syntheticState}
                        onChange={(val, isFirstInit) => {

                            handler(val, isFirstInit)

                            setFormState(prev => ({ ...prev, ...val }))
                        }}
                        onRandomStateChanged={(val) => {

                            setFormState(prev => ({ ...prev, ...val }))
                        }
                        }
                    // isDebug={true}
                    />
                    <DividerVertical />
                    <MyDropDownRadioCheckbox
                        type="radio"
                        name="category"
                        optionsList={dataTools.getArrWithDisabledItemsBy_From_WithRooles(formState?.type, Seeker.Options.categories, Seeker.Options.types)}
                        randomState={syntheticState}
                        showDisableOptionsAsDisable={true}
                        onChange={(val, isFirstInit) => {

                            handler(val, isFirstInit)

                            setFormState(prev => ({ ...prev, ...val }))
                        }}
                        atShowLabelFormatting={toRussianLanguage.getTypeOrCategory_at_Vinitelniy}
                        onRandomStateChanged={(val) => {

                            setFormState(prev => ({ ...prev, ...val }))

                        }}
                    // isDebug={true}
                    />
                </FilterItem>
                <FilterItem
                    isDisableByOpacity={true}
                    disabledMessage={isRoomOrFlat ? "Этот параметр есть в дополнительных фильтрах" : ""}
                    gridCol="figc-4"
                >
                    {isRoomOrFlat &&

                        <GenRadioCheckboxWrapperWithState
                            key={"rooms_total" + clearFiltersToggler}
                            name="rooms_total"
                            type="checkbox"

                            componentConfig={{}}
                            optionsList={Seeker.Options.roomsCount}
                            lastChildLabelPostfix="+"
                            onChange={(val, isFirstInit) => {

                                // handler({ aboutFlat: { rooms: val } }, isFirstInit)
                            }
                            }
                            // randomState={syntheticState?.aboutFlat?.rooms}

                            Component={OptionButton}
                            noOptionsWrapper={true}
                            DividerComponent={DividerVertical}
                            ownState={true}

                        />
                    }
                </FilterItem>

                <FilterItem
                    isDisableByOpacity={!isRoomOrFlat}
                    gridCol="figc-2">
                    <LabelCheckbox
                        key={"Квартиры от" + clearFiltersToggler}
                        label="Квартиры от"
                    />
                </FilterItem>

                <FilterItem gridCol="figc-5" isDisableByOpacity={true}>
                    <input
                        type="text"
                        className="form-control disableByOpacity"
                        id="exampleInputAmount"
                        placeholder="Город, район, адрес..."
                    />
                    <OptionButton
                        isDisableByOpacity={true}
                        btnClass="btn-link"
                        {...{ ...{ value: "subway", label: "Метро" } }}
                    />
                    <OptionButton
                        isDisableByOpacity={true}
                        btnClass="btn-link"
                        {...{ ...{ value: "district", label: "Район" } }}
                    />
                </FilterItem>

            </FilterItemsRow>


            <FilterItemsRow

            >

                <FilterItem gridCol="figc-3">
                    <MyDropDownRadioCheckbox
                        // key={"marketType" + clearFiltersToggler}
                        name="marketType"
                        type="radio"

                        optionsList={Seeker.Options.marketType}
                        onChange={handler}
                        randomState={syntheticState}
                        isDebug={true}

                    />
                </FilterItem>



                <FilterItem
                    gridCol="figc-4"
                    isDisableByOpacity={!isRoomOrFlat}
                >
                    {isRoomOrFlat &&
                        <TwoInputs
                            key={"area_total" + clearFiltersToggler}
                            name="area_total"
                            inputsConfig={[
                                { name: "$gte", placeholder: "Площадь от", width100: false, isPlaceholderWidth: true, maxLength: 10 },
                                { name: "$lte", placeholder: "До", width100: false, maxLength: 10 }
                            ]}
                            onChange={(val, isFirstInit) => handler({ aboutFlat: { area: val } }, isFirstInit)}
                            randomState={syntheticState?.aboutFlat?.area}
                            Postfix={"м²"}

                        />
                    }
                </FilterItem>

                <FilterItem gridCol="figc-7">
                    <TwoInputs
                        key={"price" + clearFiltersToggler}
                        name="price"
                        inputsConfig={[
                            { name: "$gte", placeholder: "Цена от", maxLength: 20, size: 20, isThousandDelimeter: true, width100: true },
                            { name: "$lte", placeholder: "До", maxLength: 20, size: 20, isThousandDelimeter: true, width100: true }
                        ]}
                        onChange={(val, isFirstInit) => handler({ priceDetails: val }, isFirstInit)}
                        randomState={syntheticState?.priceDetails}
                        Postfix={"₽"}
                        isDebug={true}
                    />
                </FilterItem>
            </FilterItemsRow>
        </FiltersContainer>
    )
}

export default AlwaysFilters