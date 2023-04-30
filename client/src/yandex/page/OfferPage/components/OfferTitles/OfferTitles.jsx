import React from "react";


import "./OfferTitles.scss"

const OfferTitles = ({ titles, address }) => {



    return (
        <div
            key={"titlesWrapper"}
            className="OfferTitles__Wrapper">

            <h1 key={"titleMain"} className="OfferTitles__Title titleMain">{titles.mainTitle}</h1>
            <React.Fragment key={1} >
                {
                    titles?.additionalTitle
                    && <h4 key={"additionalTitle"} className="OfferTitles__Title additionalTitle">{titles.additionalTitle}</h4>
                }
            </React.Fragment >
            <React.Fragment key={2} >
                {
                    titles?.additionalTitleWithLink
                    && <h4 key={"additionalTitleWithLink"} className="OfferTitles__Title additionalTitleWithLink">{titles?.additionalTitleWithLink}</h4>
                }
            </React.Fragment >
            <React.Fragment key={3} >
                {
                    titles?.addressTitle
                    && <h4 key={"addressTitle"} className="OfferTitles__Title addressTitle">
                        <span key={"address"}> Адрес: {titles.addressTitle}</span>
                        <React.Fragment key={4} >
                            {address?.map?.title === "random" &&
                                <React.Fragment key={5} >
                                    <span key={"hint1"} className="hint">{`Если видите random - это значит, закончился api на карту.`}</span>
                                    <span key={"hint2"} className="hint">{`и оно не распарсило координаты:(`}</span>
                                </React.Fragment>}
                        </React.Fragment>
                    </h4>
                }
            </React.Fragment >
        </div >
    )
}

export default OfferTitles