import React from "react";
import { Link } from "react-router-dom";
import { Options } from "../../../../../../templateData/availableDataOptions";
import dataTools from "../../../../../../templateData/dataTools";

import "./ItemGeneralInfo.scss"
const ItemGeneralInfo = ({
    linkToOffer,
    category,
    area,
    totalRooms,
    builtYear,
    floorsCurrent,
    foorsTotal,
    addressTitle,
    mainTitle,
    additionalTitle
}) => {


    return (
        <div className="general-info">
            <h3
                className="general-info-container"
            >
                <Link
                    to={linkToOffer}
                    className="general-info__title-link"
                    target="_blank"
                >
                    <div className="Link__click-area"></div>
                    <span className="title">
                        {/* {area} м², {totalRooms}-комнатная {`${dataTools.getLabelByValue(category, Options.allCategories)}`} */}
                        {mainTitle}
                    </span>
                </Link>
                <div className="row building">

                    {additionalTitle}
                    {/* <div>
                        Новостройка, ЖК <Link to="/">«Дмитровское небо»</Link> 4 кв. {builtYear} г., {floorsCurrent} этаж из {foorsTotal}
                    </div> */}
                </div>
                <span className="row adress">
                    {/* САО, район {order.location.district}, жилой комплекс Дмитровское Небо */}
                    <div>
                        {addressTitle}
                    </div>
                </span>
                <div className="row location">
                    <div>
                        <a>Победное</a> <span>4 мин</span>
                    </div>
                </div>
            </h3>
        </div>
    )
}

export default ItemGeneralInfo