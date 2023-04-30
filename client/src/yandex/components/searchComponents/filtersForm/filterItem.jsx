import React from "react";

import "./filterItem.scss"
import { useState } from "react";

const FilterItem = ({ children, disabledMessage, gridCol, isTransparent, isDisableByOpacity }) => {
    const [isShowDeepDevelopment, setIsShowDeepDevelopment] = useState(false)

    return (
        <div

            onMouseEnter={isDisableByOpacity ? () => setIsShowDeepDevelopment(true) : undefined}
            onMouseLeave={isDisableByOpacity ? () => setIsShowDeepDevelopment(false) : undefined}

            className={"filterItem"
                + (gridCol ? ` ${gridCol}` : "")
                + (isTransparent ? " transparent" : "")
                + (isDisableByOpacity ? " disableByOpacity" : "")

            }>
            {isDisableByOpacity && isShowDeepDevelopment && <div className="filterItem-disable">{disabledMessage ? disabledMessage : "Функция находится в глубокой разработке"}</div>}
            {children}

        </div>
    )
}

export default FilterItem