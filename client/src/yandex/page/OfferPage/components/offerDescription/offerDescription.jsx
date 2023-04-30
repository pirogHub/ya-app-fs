import React, { useState } from "react";

import "./offerDescription.scss"

const OfferDescription = ({ description }) => {


    const [isMore, setIsMore] = useState(false)

    if (!description) return <></>
    const modifDescription = isMore ? description : (description.substr(0, 200) + "...")
    return (
        <>
            <p className="textDecription"> {modifDescription}</p>

            {!isMore && <span className="textDecriptionMore button fill-blue" role="button" onClick={() => setIsMore(true)}>Подробнее&nbsp; <i className="bi bi-chevron-down"></i></span>}
            {isMore && <span className="textDecriptionMore button fill-blue" role="button" onClick={() => setIsMore(false)}>Скрыть&nbsp; <i className="bi bi-chevron-up"></i></span>}
        </>
    )
}

export default OfferDescription