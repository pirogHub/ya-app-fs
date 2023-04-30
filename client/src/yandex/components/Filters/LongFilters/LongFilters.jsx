import { useCallback, useEffect, useRef, useState } from "react"
// import { useFilters } from "../../../hooks/useFilters/useFilters"
import ActionsAndStatus from "../../../page/TablePage/components/ActionsAndStatus"
import TableFilters from "../../../page/TablePage/components/TableFilters"
import dataStructService from "../../../services/dataStruct.service"
import { useFilters } from "../../../hooks/useFilters/useFilters"
import { useDispatch } from "react-redux"
import { ERROR_TYPES, setError } from "../../../store/errors"
import { useLocation } from "react-router-dom"
import randomTools from "../../../templateData/random/randomTools"
import Seeker from "../../../templateData/dataSeeker"
import { createRef } from "react"



const LongFilters = ({ onShowOffersClick }) => {
    const dispatch = useDispatch()

    const location = useLocation()
    const redirectedFromHome_uploadOffersBlockerRef = useRef()
    const redirectedFromHome_scrollToFiltersBlockerRef = useRef()
    const isUploadAdditionalFiltersStructEnded = useRef(true)

    const isRandomDataAlsoAtAdditionalFilters = useRef(false)

    const isSaveFirstInitingStateRef = useRef(false)

    const is_firstInit_ref = useRef(true)
    const is_firstInit_toScroll_ref = useRef(true)

    const onFiltersChangeStopper = () => { return true }
    const [isShowAdditionalFilters, setIsShowAdditionalFilters] = useState(false)
    const isShowAdditionalFiltersRef = useRef(isShowAdditionalFilters)
    const refForScrollToFilters = createRef()
    // window.addEventListener('load', function () {

    //     
    //     window.scrollTo(500, 0)
    // });

    useEffect(() => {

        if (location.state?.isScrollToOffers) {
            redirectedFromHome_uploadOffersBlockerRef.current = true
            isSaveFirstInitingStateRef.current = true
            redirectedFromHome_scrollToFiltersBlockerRef.current = true
            dispatch(setError({ message: "Сверху, на этой странице, больше фильтров!", errorType: ERROR_TYPES.VALID }))
            onShowOffersClick()
        }
        else if (is_firstInit_toScroll_ref.current && !redirectedFromHome_scrollToFiltersBlockerRef.current) {

            refForScrollToFilters.current.scrollIntoView({ block: "center" })
            is_firstInit_toScroll_ref.current = false
        }
        // else if (refForScrollToFilters.current && !redirectedFromHome_uploadOffersBlockerRef.current) {

        //     
        //     refForScrollToFilters.current.scrollIntoView({ block: "center", behavior: "smooth" })
        // }
    }, [])

    useEffect(() => {
        if (refForScrollToFilters.current) {
            if (!redirectedFromHome_scrollToFiltersBlockerRef.current) {

                if (!isShowAdditionalFilters)

                    refForScrollToFilters.current.scrollIntoView({ block: "center", behavior: "smooth" })
            } else {
                redirectedFromHome_scrollToFiltersBlockerRef.current = false
            }
        }
    }, [refForScrollToFilters])



    const beforeStateChangedMiddlewareBlock = (newState, isSaveFirstInitingState, isFirstInit, stateFromUrl, isCalledBySyntheticStateChange) => {

        const isCategoryChanged = (sekeerNewCategory_ref.current !== newState?.category?.[0])
        sekeerNewCategory_ref.current = newState?.category?.[0]
        setSekeerNewCategory(prev => newState?.category?.[0])



        if (isCalledBySyntheticStateChange) {

        }

        let isNotBlock = !(isSaveFirstInitingState && isFirstInit)
        let toSave = newState


        if (redirectedFromHome_uploadOffersBlockerRef.current) {
            let isNotBlock = false
            return [{ ...toSave }, isNotBlock]
        }

        if (!stateFromUrl) {
            if (isCategoryChanged && !isFirstInit) {
                toSave = {
                    type: newState?.type,
                    category: newState?.category,
                    marketType: newState?.marketType,
                    priceDetails: {
                        price: {
                            $gte: newState?.priceDetails?.price?.$gte,
                            $lte: newState?.priceDetails?.price?.$lte,
                        }

                    }
                }

                clearFilters({
                    toSave,
                    is_call_onStateChangedAfter: true
                })
            }
        } else {
            isNotBlock = false
            toSave = stateFromUrl
        }

        if (is_firstInit_ref.current && isFirstInit) {
            isNotBlock = false
        }

        return [{ ...toSave }, isNotBlock]
    }

    const onBeforeSyntheticStateInit = (syntheticStateConfig) => {
        const [fullPromises, synthetic_normalData, syntheticState] = syntheticStateConfig
        const isCategoryChanged = (sekeerNewCategory_ref.current !== synthetic_normalData?.category?.[0])
        sekeerNewCategory_ref.current = synthetic_normalData?.category?.[0]
        setSekeerNewCategory(prev => synthetic_normalData?.category?.[0])
        console.log("onSyntheticStateChanged Synthetic State To Resolve", fullPromises);


        let changedSyntheticState = { ...syntheticState }
        let changedSynthetic_normalData = { ...synthetic_normalData }
        if (!syntheticState?.marketType) {


            const randomMarketType = randomTools.getRandomValueFrom(Seeker.Options.marketType)
            const randomMarhetType_synthetic = { value: randomMarketType, promise: { resolve: () => Promise.resolve(true) } }
            changedSyntheticState = { ...syntheticState, marketType: randomMarhetType_synthetic }
            changedSynthetic_normalData = { ...synthetic_normalData, marketType: randomMarketType }
        }
        return [fullPromises, changedSynthetic_normalData, changedSyntheticState]
    }

    const clearFiltersBefore = () => {
        clearFilters({
            toSave: {
                type: refFiltersState.current?.type,
                category: refFiltersState.current?.category,
                marketType: refFiltersState.current?.marketType
            },
            is_call_onStateChangedAfter: true
        })
    }


    const { refFiltersState,
        loadValToFiltersState,
        syntheticState,
        downloadAndSetSyntheticStateForFilters,
        clearFiltersToggler,
        clearFilters,
        isBlock_untilQueryParsed_and_Init,
        is_atFirst_DoQueryParse_and_Init
    }
        =
        useFilters({
            onBeforeSyntheticStateInit,
            is_call_onStateChange_whenSintheticStateInited: true,
            is_block_OnStateChanged_WhileSyntheticStateInit: true,
            syntheticRandomStateGetter: (type, category) => dataStructService.getRandom({ type, structName: category, toWhoom: "seeker" }),
            onFiltersChangeStopper,
            beforeStateChangedMiddlewareBlock: beforeStateChangedMiddlewareBlock,
            isSaveFirstInitingStateRef: isSaveFirstInitingStateRef,
            isParsingQueryBeforeFirstFetch: true,
            redirectedFromHome_uploadOffersBlockerRef: redirectedFromHome_uploadOffersBlockerRef,
            simpleDefaultStateIfNotStateAtQuery: { category: ["flat"], type: ["sell"], marketType: ["new"] },
            is_atFirst_DoQueryParse_and_Init: true,
            is_not_call_if_not_Changed_type_or_category: true
        })

    const [sekeerNewCategory, setSekeerNewCategory] = useState(refFiltersState.current?.category?.[0])

    const sekeerNewCategory_ref = useRef(refFiltersState.current?.category?.[0])



    useEffect(() => {
        const tmp = sekeerNewCategory

    }, [sekeerNewCategory])








    useEffect(() => {
        is_firstInit_ref.current = false

    }, [])




    useEffect(() => {
        const tmp = isShowAdditionalFilters


    }, [isShowAdditionalFilters])



    if (isBlock_untilQueryParsed_and_Init && is_atFirst_DoQueryParse_and_Init) {

        return <div ref={refForScrollToFilters}></div>
    }

    return (<>
        <div ref={refForScrollToFilters}></div>

        <TableFilters
            onDownloadStructStart={() => {

                isUploadAdditionalFiltersStructEnded.current = null
            }}
            onDownloadStructEnd={() => {

                isUploadAdditionalFiltersStructEnded.current = true

                // onStateChangedMiddlewareBlock(refFiltersState.current)
            }}
            seekerCategory={sekeerNewCategory}
            clearFiltersToggler={clearFiltersToggler}
            isShowAdditionalFilters={isShowAdditionalFilters}
            // loadValToForm={useCallback((val, isFirstInit) => loadValToFiltersState(val, isFirstInit), [])}
            loadValToForm={(val, isFirstInit) => loadValToFiltersState(val, isFirstInit)}
            syntheticState={syntheticState}
        />
        <ActionsAndStatus
            onShowOffersClick={onShowOffersClick}
            getRandomSeekerAndLoad={
                () => {
                    // return handlerRandomClick(isShowAdditionalFilters)
                    isRandomDataAlsoAtAdditionalFilters.current = true
                    const returned = downloadAndSetSyntheticStateForFilters(isShowAdditionalFilters)

                    return returned
                }
            }
            onClear={() => {
                isRandomDataAlsoAtAdditionalFilters.current = false

                clearFiltersBefore()
            }
            }
            isShowAdditionalFilters={isShowAdditionalFilters}
            toggleAdditionalFilters={() => {

                if (refForScrollToFilters.current) refForScrollToFilters.current.scrollIntoView({ block: "start", behavior: "smooth" })
                isShowAdditionalFiltersRef.current = !isShowAdditionalFilters
                setIsShowAdditionalFilters(prev => !prev)
            }}

        />
    </>
    )
}
export default LongFilters