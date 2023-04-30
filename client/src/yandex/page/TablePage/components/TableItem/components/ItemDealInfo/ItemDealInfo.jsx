import React from "react";
import { thousandDelimeter } from "../../../../../../utils/thousandDelimeter";

import "./ItemDealInfo.scss"
const ItemDealInfo = ({
    priceLabel,
    pricePerMeterLabel,
    area
}) => {


    return (
        <div className="deal-info">
            <div className="price">{priceLabel}</div>
            {/* <div className="price">{thousandDelimeter(totalPrice).formattedString} ₽</div> */}
            <div className="price-detail">{pricePerMeterLabel}</div>
            {/* <div className="price-detail">{thousandDelimeter((+totalPrice / parseFloat(area)).toFixed(0)).formattedString} за м²</div> */}
            <div className="pill text-bg-secondary Tag_theme_realty Tag-text">Ипотека</div>
        </div>
    )
}

export default ItemDealInfo