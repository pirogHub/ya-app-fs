import React from "react";

import "./OfferDetalSvg.scss"


const OfferDetalSvg = ({ label }) => {


    return (
        <>{
            label
                ? <div className="offerDetalSvg">
                    < i className="bi bi-8-square" ></i >
                    {label}
                </div >
                : <></>
        }

        </>)
}

export default OfferDetalSvg