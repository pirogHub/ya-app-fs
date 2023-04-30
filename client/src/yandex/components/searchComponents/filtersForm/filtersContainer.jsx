import React from "react";

import "./filters.scss"
const FiltersContainer = ({ children }) => {


    return (
        <div className="filtersContainer">
            {children}
        </div>
    )
}

export default FiltersContainer