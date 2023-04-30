import { useEffect, useRef, useState } from "react"

import _ from "lodash"
import RandomAuthor from "../../templateData/random/randomAuthor"
import { SuperPromiseTimeout } from "../../utils/superPromise"
import { useDispatch } from "react-redux"
import { clearLoadingStatus, getOffersList, prepareRequest } from "../../store/offersList"
import { queryStringCreator } from "../../utils/queryStringCreator"
import { updateFilters } from "../../store/filters"
import { useHistory, useLocation } from "react-router-dom"
export const useFilters = ({
    syntheticRandomStateGetter,
    handleIsUploadOfferBlock
}) => {
    const debug = true
    let location = useLocation()
    const history = useHistory()


    const dispatch = useDispatch()

    const refFiltersState = useRef({})
    const refTimer_statusStart = useRef()
    const refPrevPromise = useRef()
    const refPrevQueryString = useRef()

    const [syntheticState, setSyntheticState] = useState({})

    // получает query params в виде объекта из адресной строки и устанавливает из через setSyntheticState
    useEffect(() => {
        if (debug) console.log("first Render");
        if (debug) console.log("location", location);
        const queryString = location.search//.slice(1)
        if (debug) console.log("queryString", queryString);
        if (!queryString) return
        const queryParameters = new URLSearchParams(queryString)
        let stateFromUrl
        for (const [key, value] of (queryParameters.entries())) {
            stateFromUrl = { ...stateFromUrl, [key]: JSON.parse(value) }
        }
        if (debug) console.log("stateFromUrl", stateFromUrl);

        console.log("new URLSearchParams(queryString)", queryParameters);
        if (stateFromUrl.scrollAuto) { }
        // const stateFromUrl = JSON.parse(queryString.replaceAll("%22", "\"").replaceAll("%20", " "))
        // let stateFromUrl = {}

        // http://localhost:3000/?{"category":["flat"],"aboutFlat":{"rooms":{"rooms_total":["studio",1,2,3,4]}},"priceDetails":{"price":{"$gte":"123123"}}}
        // if (debug) console.log("stateFromUrl", stateFromUrl);
        let debugOfRandomPromises = {}
        const [promises, , syntheticState] = RandomAuthor.getSyntheticStateFromDataState(debugOfRandomPromises, stateFromUrl.filters)
        // if (debug) console.log("randomSeeker from URL randomSeeker", randomSeeker);
        if (debug) console.log("stateFromUrl from URL promises", promises);
        if (debug) console.log("stateFromUrl from URL randomSeekerWithPromises", syntheticState);
        // getOffers(randomSeeker)
        refFiltersState.current = _.cloneDeep(stateFromUrl.filters)
        logger({ functionName: "stateFromUrl from URL", action: "", prop: "refFiltersState.current", data: refFiltersState.current })
        setSyntheticState(syntheticState)
        Promise.all([promises]).then(() => onFiltersChange(refFiltersState.current))

    }, [])

    // получает с сервера рандомные значения фильтров и устанавливает их
    // todo: получение с сервера значений для дополнительных фильтров только по флагу isShort
    const downloadAndSetSyntheticState = async (isShort, afterInitGenerated) => {
        logger({ functionName: "downloadAndSetSyntheticState", action: "", prop: "", data: "" })

        let struct = await syntheticRandomStateGetter()
        if (!struct?.error) {


            let debugOfRandomPromises = {}
            const [promises, , syntheticState] = RandomAuthor.getSyntheticStateFromDataState(debugOfRandomPromises, struct)

            if (debug) console.log("RESOLVE SYNTHETIC STATE", promises);
            refFiltersState.current = _.cloneDeep(struct)
            logger({ functionName: "downloadAndSetSyntheticState", action: "", prop: "refFiltersState.current", data: refFiltersState.current })
            setSyntheticState(syntheticState)
            Promise.all([promises]).then(() => onFiltersChange(refFiltersState.current))
            return [promises]
        } else {
            return 4
        }
    }

    // получает с сервера офферы по фильтрам
    const getOffers = (filters, onLoadFinithed) => {
        logger({ functionName: "getOffers", action: "", prop: "filters", data: filters })
        dispatch(prepareRequest({ type: filters?.type, category: filters?.category }))
        logger({ functionName: "dispatch(prepareRequest())", action: "", prop: "", data: "" })

        if (refTimer_statusStart.current) clearTimeout(refTimer_statusStart.current)
        if (refPrevPromise.current?.reject) refPrevPromise.current.reject()

        refPrevPromise.current = SuperPromiseTimeout(1000, "11", "-11")

        refPrevPromise.current
            .then(() => {

                const filtersQueryString = queryStringCreator(filters)
                // const filtersQueryString = JSON.stringify(filters)

                logger({ functionName: "getOffers", action: "", prop: "filtersQueryString", data: filtersQueryString })

                if (filtersQueryString !== refPrevQueryString.current) {
                    refPrevQueryString.current = filtersQueryString
                    // history.push(`${history.location.pathname + "?" + filtersQueryString}`)
                    history.push(`${history.location.pathname + "?" + filtersQueryString}`)
                    console.log("history.location.pathname", history.location.pathname);
                    console.log("history..", history);
                    // if (debug) console.log("history.location.pathname + filtersQueryString", `${history.location.pathname + filtersQueryString}`)
                    //               
                    // history.push(`${history.location.pathname + filtersQueryString}`)
                    dispatch(updateFilters(filters, filtersQueryString))
                    logger({ functionName: "getOffers", action: "dispatch(getOffersList)", prop: "", data: "" })

                    dispatch(getOffersList({ filtersQueryString, filters }))
                } else {
                    if (onLoadFinithed) onLoadFinithed()
                    dispatch(clearLoadingStatus())
                }
            })
            .catch(err => { if (debug) console.log() })
    }

    // при изменении фильтра делает задержку перед getOffers
    const onFiltersChange = (filtersState) => {
        logger({ functionName: "onFiltersChange", action: "", prop: "", data: "" })

        if (refTimer_statusStart.current) clearTimeout(refTimer_statusStart.current)

        if (refPrevPromise.current?.reject) refPrevPromise.current.reject()
        refPrevPromise.current = SuperPromiseTimeout(1000, "11", "-11")

        // statusBarControls.current?.start()
        refPrevPromise.current
            .then(() => {

                // statusBarControls.current?.working()

                return new Promise((res, rej) => {
                    res(getOffers(filtersState))
                })
            })
            .catch((data) => { })
    }


    const [clearFiltersToggler, setClearFiltersToggler] = useState(false)

    const ClearFilters = () => {
        refFiltersState.current = {}
        setSyntheticState(prev => { })
        setClearFiltersToggler(prev => !prev)
    }

    // получает объект с именем фильтрика и значением и устанавливает в объект всех фильтров
    const loadValToFiltersState = (value) => {
        logger({ functionName: "-------------loadValToForm", action: "", prop: "", data: value })

        // let isChanged = true
        const newState = _.cloneDeep(refFiltersState.current)
        _.mergeWith(newState, value, customizer);
        function customizer(objValue, srcValue) {
            if (_.isArray(objValue) || typeof objValue !== "object") {

                // if (JSON.stringify(objValue) === JSON.stringify(srcValue)) isChanged = false
                return srcValue
            }
        }
        if (debug) console.log("newState", newState);
        refFiltersState.current = _.cloneDeep(newState)
        if (debug) console.log(" refFiltersState.current ", refFiltersState.current);
        logger({ functionName: "=============loadValToForm", action: "", prop: "refFiltersState.current", data: refFiltersState.current })

        // if (debug) console.log("isChanged", isChanged);
        onFiltersChange(refFiltersState.current)
    }


    return {
        refFiltersState,
        loadValToFiltersState,
        syntheticState,
        downloadAndSetSyntheticState,
        setSyntheticState,
        clearFiltersToggler,
        // setClearFiltersToggler 
        ClearFilters
    }
}