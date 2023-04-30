import React, { useState, useEffect, useRef } from "react"
import offerService from "../../../../services/offer.service";
import Button from "../../../../components/ui/Button/Button";
import { Link, useHistory } from "react-router-dom";
import offerTransform from "../../../../utils/offerTransform";

import "./OfferLittleRow.scss"
import Loader from "../../../../components/ui/Loader";
import MyLink from "../../../../components/ui/MyLink";
import { ERROR_TYPES, setError } from "../../../../store/errors";
const OfferLittleRow = ({ isAuthUserPage, index, offerLink, removeOffer }) => {

    // const [loadingStatus, setLoadingStatus] = useState(null)
    const [offer, setOffer] = useState(null)

    useEffect(() => {

        offerService.getByCategoryAndId({ link: offerLink })
            .then(data => {
                setOffer(data)
            })

    }, [offerLink])


    useEffect(() => {
        const tmp = offer


    }, [offer])

    if (offer === false) {
        return <div className="OfferLittleRow__container">
            <div className="offerIndex">{index}</div>
            <div className="OfferLittleRow__ErrorContainer">
                <div> Объявление не найдено:</div>
                <MyLink to={`/offer${offerLink}`} label={`/offer${offerLink}`} />
            </div>
        </div>
    } else if (offer === null) {
        return <div className="OfferLittleRow__container">
            <div className="offerIndex">{index}</div>
            <Loader />
        </div>
    }

    // const transformedOffer = offerTransform.toGeneralView(offer?.category?.[0], offer)



    return (
        <div className="OfferLittleRow__container">
            <div className="offerIndex">{index}</div>
            <div className="OfferLittleRow__content">
                <Link
                    to={{
                        pathname: `/offer${offerLink}`,
                        alreadyFetchedOffer: offer
                    }}

                    className="OfferLittleRow__wrapper-link"
                >
                    <div className="offerPublic">
                        <img
                            className="offer__img"
                            src={offer.firstImg} alt="" />
                        <div
                            className="offer__details"
                        >
                            <div className="offer-label">
                                {offer.titles.mainTitle}
                            </div>
                            <div className="offer-priceAndDate">
                                <div className="offer__price">
                                    Цена: {offer.priceDetails.priceLabel}
                                </div>
                                <div className="offer__date">
                                    {offer.createdAt}
                                    {/* дата */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                {
                    isAuthUserPage
                    &&
                    <div className="OfferLittleRow__actions-wrapper">
                        <div className=" OfferLittleRow__Action action-remove">
                            <Button
                                onClick={() => removeOffer(offerLink)}
                                className="btn btn-clean"
                            >
                                <i className="bi bi-trash3"></i>
                            </Button>
                        </div>
                        <Link
                            to={{
                                pathname: `/edit${offerLink}`,
                                offerToEdit: offer
                            }}
                            className="OfferLittleRow__Action action-edit"
                        >
                            <Button
                                className="btn btn-clean"
                            >
                                <i className="bi bi-gear"></i>
                            </Button>
                        </Link>
                    </div>
                }
            </div>
        </div>

    )
}

export default OfferLittleRow