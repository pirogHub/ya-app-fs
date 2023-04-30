

import { useDispatch, useSelector } from "react-redux"
import ErrorBoundary from "../../../../../components/ErrorBoundary/ErrorBoundary"
import "./OffersWindow.scss"
import { useInfScrollObserver } from "../../../../../hooks/useInfScrollObserver/useInfScrollObserver"
import { getOffersListState, get_AddOffers } from "../../../../../store/offersList"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import OffersWindow_infMechanic from "./OffersWindow_infMechanic/OffersWindow_infMechanic"
import TableItem from "../../TableItem/TableItem"
import Button from "../../../../../components/ui/Button"
import ToTopButton from "../../../../../ToTopButton/ToTopButton"

const ANTI_INF_FETCH_BYSCROLL_TO_PREV_OBSERVED_BLOCK_KEYS = {
    toBlock: "toBlock",
    isScrolling: "isScrolling",
    unblocked: "unblocked"
}

const aif__KEYS = ANTI_INF_FETCH_BYSCROLL_TO_PREV_OBSERVED_BLOCK_KEYS



const OffersWindow = ({
    setLoading_prev,
    setLoading_next,
    endWarningLabel,
    actionOnEndLabel,
    actionOnEnd,
    toScrollToTop,
    isCanScrollToEnd
}) => {
    const loadingStatus = useSelector(state => state.offersList.loadingStatus)

    const offersList = useSelector(getOffersListState("entities"))
    const currentDataFrom = useSelector(getOffersListState("currentDataFrom"))
    const currentDataTo = useSelector(getOffersListState("currentDataTo"))
    const allCount = useSelector(getOffersListState("allCount"))
    // const sliceCount = useSelector(getOffersListState("sliceCount"))

    const is_allAnotherScrollsBlocked_ref = useRef()

    const dispatch = useDispatch()
    const is_alreadyInFetching_ref = useRef()
    const [is_blockFetching, set_is_blockFetching] = useState(false)

    const deepest_ref = useRef()
    const is_needToScrollToEndWhenLoaded = useRef(false)

    const {
        last__observerLoader_current_itemObserver_ref,
        last__current_itemObserved_ref,
        last__IDX_of_current_itemObserved_ref,
        last__observerLoader_old_itemObserver_ref,
        last__IDX_of_old_itemObserved_ref,
        last__old_itemObserved_ref,
        last__to_clear_refs
    } = OffersWindow_infMechanic({
        is_blockFetching,
        is_blockFetching_setter: set_is_blockFetching,
        is_alreadyInFetching_ref,
        fetchingFunc: () => {
            prev__to_clear_refs()
            setLoading_next()
            dispatch(get_AddOffers({ isNext: true }))
        },
        loadingStatus,
        loadingStatus_finishedKey: "loaded",
        conditionFunc: () => currentDataTo < allCount

    })

    const {
        last__observerLoader_current_itemObserver_ref: prev__observerLoader_current_itemObserver_ref,
        last__current_itemObserved_ref: prev__current_itemObserved_ref,
        last__IDX_of_current_itemObserved_ref: prev__IDX_of_current_itemObserved_ref,
        last_observerLoader_old_itemObserver_ref: prev_observerLoader_old_itemObserver_ref,
        last__IDX_of_old_itemObserved_ref: prev__IDX_of_old_itemObserved_ref,
        last__old_itemObserved_ref: prev__old_itemObserved_ref,
        last__to_clear_refs: prev__to_clear_refs
    } = OffersWindow_infMechanic({
        is_blockFetching,
        is_blockFetching_setter: set_is_blockFetching,
        is_alreadyInFetching_ref,
        fetchingFunc: () => {
            last__to_clear_refs()
            setLoading_prev()
            dispatch(get_AddOffers({ isPrev: true }))
        },
        loadingStatus,
        loadingStatus_finishedKey: "loaded",
        conditionFunc: () => currentDataFrom > 0

    })


    useEffect(() => {
        if (loadingStatus === "loaded" && is_needToScrollToEndWhenLoaded.current) {

            is_needToScrollToEndWhenLoaded.current = false
        }
    }, [loadingStatus])


    const len = offersList.length
    return (
        <div>
            <div className="navButtons_wrapper">
                <div className="navButtons">
                    {
                        !!toScrollToTop
                        && < ToTopButton
                            isTurnOffStickyAndAbsolute={true}
                            onClick={() => {
                                prev__to_clear_refs()
                                last__to_clear_refs()
                                // setLoading_next()
                                is_alreadyInFetching_ref.current = true
                                dispatch(get_AddOffers({ from: 0 }))
                                toScrollToTop()
                            }}
                        />
                    }
                    {
                        isCanScrollToEnd
                        && < ToTopButton
                            isTurnOffStickyAndAbsolute={true}
                            anotherButtonClassName={"btn btn-yellow-outline"}
                            label={"Вниз"}
                            onClick={() => {
                                prev__to_clear_refs()
                                last__to_clear_refs()
                                setLoading_next()
                                is_alreadyInFetching_ref.current = true
                                dispatch(get_AddOffers({ to: allCount }))
                                deepest_ref.current.scrollIntoView({ block: "center", behavior: "smooth" })
                                // deepest_ref.current.scrollIntoView()
                            }}
                        />
                    }
                </div>
            </div>
            {
                offersList.map((o, idx) => {
                    let currentRef
                    let current_bg = ""

                    if (idx === 1) {
                        current_bg = "prev_current"
                        currentRef = prev__current_itemObserved_ref
                        prev__IDX_of_current_itemObserved_ref.current = o
                    }
                    else if (idx + 1 === len) {
                        current_bg = "last_current"
                        currentRef = last__current_itemObserved_ref
                        last__IDX_of_current_itemObserved_ref.current = o
                    }
                    if (o === prev__IDX_of_old_itemObserved_ref.current) {
                        if (currentRef?.current) {
                            prev__old_itemObserved_ref.current = currentRef?.current
                            // current_bg = true
                        } else {
                            currentRef = prev__old_itemObserved_ref
                        }
                        current_bg = "prev_old"
                    }
                    if (o === last__IDX_of_old_itemObserved_ref.current) {
                        if (currentRef?.current) {
                            last__old_itemObserved_ref.current = currentRef?.current
                            // is_bg_both = true
                        } else {
                            currentRef = last__old_itemObserved_ref
                        }
                        current_bg = "last_old"
                    }

                    return <ErrorBoundary key={o._id} name={"TableItem"} >

                        {/* <div
                            className={
                                "Debug_TableItem"
                                + (current_bg ? ` ${current_bg}` : "")

                            }
                            ref={currentRef}>{o}</div> */}
                        <TableItem
                            ref={currentRef}
                            className={current_bg}
                            offer={o}
                            currentIdx={currentDataFrom + idx + 1}
                        />
                    </ErrorBoundary>
                })
            }
            {
                endWarningLabel
                && currentDataTo >= allCount
                && < div className="endWarning">
                    <div className="endWarning__label">
                        {endWarningLabel}

                    </div>
                    {
                        !!actionOnEnd
                        &&
                        <div className="endWarning__action">
                            <Button
                                onClick={() => {

                                    prev__to_clear_refs()
                                    last__to_clear_refs()
                                    is_alreadyInFetching_ref.current = true
                                    dispatch(get_AddOffers({ from: 0 }))
                                    actionOnEnd()
                                }}
                                className={"btn btn-yellow"}
                                label={actionOnEndLabel}
                            />

                        </div>
                    }
                </div>
            }
            <div ref={deepest_ref}></div>
        </div>
    )
}


export default OffersWindow