import React from "react";



const FilterItemsRow = ({ children, isItemsBorderRectangle, addClassName }) => {


    return (
        <div className={"filterItemsRow"
            + (isItemsBorderRectangle ? " bordersRectangle" : "")
            + (addClassName ? ` ${addClassName}` : "")}>

            {children}
        </div>
    )
}

export default FilterItemsRow