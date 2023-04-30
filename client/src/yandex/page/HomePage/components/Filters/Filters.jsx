import React, { useEffect, useState } from "react";
// import OptionButton from "../../../../../../components/Cards/OptionButton";
import OptionButton from "../../../../components/Cards/OptionButton";
import DividerVertical from "../../../../components/ui/Inputs/dividers/DividerVertical";
import MyDropDownRadioCheckbox from "../../../../components/ui/Inputs/myDropDownRadioCheckbox/myDropDownRadioCheckbox";
// import TwoInputs from "../../../../../components/Inputs/TwoInputs";
import TwoInputs from "../../../../components/ui/Inputs/TwoInputs";
import FilterItem from "../../../../components/searchComponents/filtersForm/filterItem";
import FilterItemsRow from "../../../../components/searchComponents/filtersForm/filterRow";
import FiltersContainer from "../../../../components/searchComponents/filtersForm/filtersContainer";
import Seeker from "../../../../templateData/dataSeeker";
import dataTools from "../../../../templateData/dataTools";
import GenRadioCheckboxWrapperWithState from "../../../../components/ui/Inputs/GenRadioCheckboxWrapperWithState";

import LabelCheckbox from "../../../../components/ui/Inputs/LabelCheckbox";
import { inputViews } from "../../../../components/Cards/AOoptionCard/AOoptionCard";


const Filters = ({
    name,
    onChange,
    syntheticState
}) => {
    const handler = onChange
    const [formState, setFormState] = useState({})

    useEffect(() => {

    }, [])

    useEffect(() => {
        const tmp = formState

    }, [formState])
    const isRoomOrFlat = formState?.category?.[0] === "room" || formState?.category?.[0] === "flat"
    return (
        <FiltersContainer>
            <FilterItemsRow>
                <FilterItem
                    isTransparent={true}
                    gridCol="figc-5">
                    <GenRadioCheckboxWrapperWithState
                        name="type"
                        type="radio"

                        componentConfig={{ view: inputViews.pill.black }}
                        optionsList={dataTools.getArrWithDisabledItemsBy_From_WithRooles(formState?.category, Seeker.Options.types, Seeker.Options.categories)}
                        onChange={(val, isFirstInit) => {
                            handler(val, isFirstInit)
                            setFormState(prev => ({ ...prev, ...val }))
                        }}
                        randomState={syntheticState}
                        onRandomStateChanged={(val) => setFormState(prev => ({ ...prev, ...val }))}

                        // Component={OptionButton}
                        blockByIsEnabledField={true}
                        noOptionsWrapper={true}
                        ownState={true}
                        notEmpty={true}

                    />
                </FilterItem>



            </FilterItemsRow>
            <FilterItemsRow
                addClassName="card"
                isItemsBorderRectangle={true}
            >

                <FilterItem gridCol="figc-2">
                    <MyDropDownRadioCheckbox
                        type="radio"
                        name="category"
                        optionsList={dataTools.getArrWithDisabledItemsBy_From_WithRooles(formState?.type, Seeker.Options.categories, Seeker.Options.types)}
                        showDisableOptionsAsDisable={true}
                        randomState={syntheticState}
                        onChange={(val, isFirstInit) => {
                            handler(val, isFirstInit)
                            setFormState(prev => ({ ...prev, ...val }))
                        }}
                        isDebug={true}
                        onRandomStateChanged={(val) => setFormState(prev => ({ ...prev, ...val }))}

                    />

                </FilterItem>

                <FilterItem
                    isDisableByOpacity={!isRoomOrFlat}
                    gridCol="figc-3">
                    <GenRadioCheckboxWrapperWithState
                        name="rooms_total"
                        type="checkbox"

                        componentConfig={{}}
                        optionsList={Seeker.Options.roomsCount}
                        lastChildLabelPostfix="+"
                        onChange={(val) => handler({ aboutFlat: { rooms: val } })}
                        randomState={syntheticState?.aboutFlat?.rooms}

                        Component={OptionButton}
                        noOptionsWrapper={true}
                        DividerComponent={DividerVertical}
                        ownState={true}

                    />
                </FilterItem>


                <FilterItem gridCol="figc-4">
                    <TwoInputs
                        name="price"
                        inputsConfig={[
                            { name: "$gte", placeholder: "Цена от", maxLength: 20, size: 20, isThousandDelimeter: true, width100: true },
                            { name: "$lte", placeholder: "До", maxLength: 20, size: 20, isThousandDelimeter: true, width100: true }
                        ]}
                        onChange={(val, isFirstInit) => handler({ priceDetails: val }, isFirstInit)}
                        randomState={syntheticState?.priceDetails}
                        Postfix="₽"
                        isWithoutPostfixDivider={true}
                    />
                </FilterItem>

                <FilterItem
                    isDisableByOpacity={true}
                    gridCol="figc-5">
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
        </FiltersContainer >
    )
}

export default Filters