import React, { createRef, useEffect, useRef, useState } from "react";


import Loader from "../../../../components/ui/Loader";
import { useSelector } from "react-redux";

import { getOffersListState, get_AddOffers } from "../../../../store/offersList";



import "./TableList.scss"
import Button from "../../../../components/ui/Button/Button";
import OffersWindow from "./OffersWindow/OffersWindow";
import ToTopButton from "../../../../ToTopButton/ToTopButton";

const errorStringify = (error) => {
    const str = JSON.stringify(error)
    console.log("errorStringify", error);
    return str
}


const ErrorComponent = ({ error }) => {

    return <div className="w100 my-d-flex my-justify-content-center mt-10" style={{ height: "100px" }}>
        {errorStringify(error)}
    </div>
}

const LoaderComponent = () => {
    return <div className="w100 my-d-flex my-justify-content-center mt-10" style={{ height: "100px" }}>
        <Loader className="lds-roller_green" />
    </div>
}


const LOADER_POSITION_KEYS = {
    prev: "prev",
    next: "next",
    none: "none"
}

const TableList = ({ toScrollToFilters }) => {
    const loadingStatus = useSelector(state => state.offersList.loadingStatus)

    const error = useSelector(state => state.offersList.error)

    const offersList = useSelector(getOffersListState("entities"))

    const [loaderPosition, setLoaderPosition] = useState(LOADER_POSITION_KEYS.none)

    const currentDataFrom = useSelector(getOffersListState("currentDataFrom"))
    const currentDataTo = useSelector(getOffersListState("currentDataTo"))
    const from = useSelector(getOffersListState("from"))
    const to = useSelector(getOffersListState("to"))

    const setLoading_prev = () => {
        setLoaderPosition(LOADER_POSITION_KEYS.prev)
    }

    const setLoading_next = () => {
        setLoaderPosition(LOADER_POSITION_KEYS.next)
    }


    useEffect(() => {

        if (loadingStatus === "loaded") {
            setLoaderPosition(LOADER_POSITION_KEYS.none)
        }
    }, [loadingStatus])



    if (error) {

        return <ErrorComponent error={error} />
    }

    if (!offersList?.length && loadingStatus !== "loaded") {

        return <LoaderComponent />

    }

    if (!offersList?.length) {

        return <div className="w100 my-d-flex my-justify-content-center mt-10">
            Объявлений с такими параметрами нет{`:(`} Попробуйте поменять какие-то фильтры
        </div>

    }


    return (
        <div className="table_list">

            {/* <div className="debugWindow_wrapper">
                <div className="debugWindow">
                    <div>currentDataFrom: {currentDataFrom}</div>
                    <div>from: {from}</div>
                    <hr></hr>
                    <div>to: {to}</div>
                    <div>currentDataTo: {currentDataTo}</div>
                </div>
            </div> */}
            <React.Fragment key={"prev_loader"}>
                {
                    loaderPosition === LOADER_POSITION_KEYS.prev
                    && <LoaderComponent />
                }
            </React.Fragment>

            <OffersWindow
                setLoading_prev={setLoading_prev}
                setLoading_next={setLoading_next}
                endWarningLabel={"Объявления с такими параметрами закончились"}
                actionOnEndLabel={"Полететь на самый верх"}
                actionOnEnd={() => toScrollToFilters({ bySmooth: true })}
                toScrollToTop={() => toScrollToFilters({ bySmooth: true })}
                isCanScrollToEnd={true}

            />


            <React.Fragment key={"next_loader"}>
                {
                    loaderPosition === LOADER_POSITION_KEYS.next
                    && <LoaderComponent />
                }
            </React.Fragment>

        </div >)
}

export default TableList