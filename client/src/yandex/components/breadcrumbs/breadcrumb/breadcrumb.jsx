import React from "react";

import "./breadcrumb.scss"
import MyLink from "../../ui/MyLink";
import { useSelector } from "react-redux";
import { getOffersListState } from "../../../store/offersList";
import { getFiltersState } from "../../../store/filters";
import toRussianLanguage from "../../../utils/toRussianLanguage";



const Breadcrumb = () => {

    const type = toRussianLanguage.getTypeOrCategory_at_Vinitelniy(useSelector(getOffersListState("current.type"))?.[0])
    const category = toRussianLanguage.getTypeOrCategory_at_Vinitelniy(useSelector(getOffersListState("current.category"))?.[0])

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item disabled" aria-current="page">
                    <MyLink isCursorNotAllowed={true} label="Недвижимость в Москве" />
                </li>
                {
                    type
                    && <li className="breadcrumb-item disabled" aria-current="page">
                        <MyLink isCursorNotAllowed={true} label={type} />
                    </li>
                }
                {category &&
                    <>
                        <li className="breadcrumb-item active disabled" aria-current="page">
                            <MyLink isCursorNotAllowed={true} label={category} />
                        </li>
                        <li className="breadcrumb-item disabled" aria-current="page">
                            <MyLink isCursorNotAllowed={true} label="Жк Такой-то" />
                        </li>
                    </>
                }
            </ol>
        </nav>
    )
}

export default Breadcrumb