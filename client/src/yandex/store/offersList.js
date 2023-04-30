import { createAction, createSlice } from "@reduxjs/toolkit";
import offerService from "../services/offer.service";
import _ from "lodash";


const initialState = {
    entities: [],
    loadingStatus: "loaded", // prepare | loading | loaded
    from: 0,
    to: 0,
    currentDataFrom: 0,
    currentDataTo: 0,
    defaultSliceCount: 10,
    allCount: 0,
    error: null,
    current: {
        type: undefined,
        category: undefined
    }
}


const offersListSlice = createSlice({
    name: "offersList",
    initialState,
    reducers: {

        requestPrepared(state, action) {
            state.loadingStatus = "prepare"
            state.error = null
            state.current.type = action.payload.type
            state.current.category = action.payload.category
        },
        requested(state, action) {

            state.loadingStatus = "loading"
            state.entities = []

        },
        requestFailed(state, action) {

            state.loadingStatus = "loaded"
            state.error = action.payload.error
            state.from = 0
            state.to = 0
            state.currentDataFrom = 0
            state.currentDataTo = 0
            state.allCount = 0
            state.entities = []
        },
        received(state, action) {

            state.loadingStatus = "loaded"

            state.entities = action.payload.offersSlice
            state.from = action.payload.from
            state.to = action.payload.to
            state.currentDataFrom = action.payload.currentDataFrom
            state.currentDataTo = action.payload.currentDataTo
            state.allCount = action.payload.allCount
            state.error = null
        },
        triedRequestWithSameFilters(state, action) {

            state.loadingStatus = "loaded"
            // state.entities = action.payload
        },
        receivedOnlyDemonstateCount(state, action) {

            state.loadingStatus = "loaded"
            state.error = null
        },
        requestedAdd_WithSameFilters(state, action) {
            state.loadingStatus = "loading"
        },
        requestedAddFailed_WithSameFilters(state, action) {
            state.loadingStatus = "loaded"
            state.error = action.payload.error
        },
        receivedAdd_WithSameFilters(state, action) {
            state.loadingStatus = "loaded"
            state.error = null

            state.allCount = action.payload.allCount
            state.entities = action.payload.offersSlice
            state.from = action.payload.from
            state.to = action.payload.to
            state.currentDataFrom = action.payload.currentDataFrom
            state.currentDataTo = action.payload.currentDataTo
        },
    }
})

const { actions, reducer: offersListReducer } = offersListSlice

const {
    receivedOnlyDemonstateCount,
    requestPrepared,
    requested,
    requestFailed,
    received,
    addReceived,
    triedRequestWithSameFilters,
    requestedAdd_WithSameFilters,
    requestedAddFailed_WithSameFilters,
    receivedAdd_WithSameFilters
} = actions

// const offersRequested = createAction("offersList/requested")
// const offersRequestFailed = createAction("offersList/requestFailed")
const getReal_From_and_To = ({ offersListState, from, to, sliceCount, isPrev, isNext }) => {

    const existedSliceCount = sliceCount ? sliceCount : offersListState.defaultSliceCount
    const curFrom = offersListState.from
    const curTo = offersListState.to
    const currentDataFrom = offersListState.currentDataFrom
    const currentDataTo = offersListState.currentDataTo

    let needFrom
    let needTo
    let need_isPrev
    let isNeedClear = true
    if (from !== undefined && to !== undefined) {
        needFrom = from
        needTo = to
    } else if (from !== undefined & isNext) {
        needFrom = from
        needTo = from + existedSliceCount
    } else if (from !== undefined & isPrev) {
        needFrom = from - existedSliceCount
        needTo = from
    } else if (to !== undefined & isNext) {
        needFrom = to
        needTo = to + existedSliceCount
    } else if (to !== undefined & isPrev) {
        needFrom = to - existedSliceCount
        needTo = to
    } else if (isNext) {
        needFrom = currentDataTo
        needTo = currentDataTo + existedSliceCount
        need_isPrev = false
        isNeedClear = false
    } else if (isPrev) {
        needFrom = currentDataFrom - existedSliceCount
        needTo = currentDataFrom
        need_isPrev = true
        isNeedClear = false
    } else if (to !== undefined) {
        needFrom = to - existedSliceCount
        needTo = to
    } else if (from !== undefined) {
        needFrom = from
        needTo = from + existedSliceCount
    } else {
        needFrom = currentDataTo
        needTo = currentDataTo + existedSliceCount
    }

    return [needFrom, needTo, isNeedClear, need_isPrev, curFrom, curTo]
}


export const getOffersList = ({ filters, filtersQueryString, from = 0, to }) => async (dispatch, getState) => {
    const state = getState()
    const offersListState = state.offersList
    const [needFrom, needTo] = getReal_From_and_To({ offersListState, from, to, sliceCount: undefined, isNext: undefined, isPrev: undefined })

    dispatch(requested({ filtersQueryString, filters }))
    try {
        console.log("===================================================getOffersList");
        const data = await offerService.getByFilters({ filters: filtersQueryString, from: needFrom, to: needTo })


        dispatch(received({
            currentDataFrom: data.from,
            currentDataTo: data.to,
            from: data.from, to: data.to, allCount: data.allCount, offersSlice: data.offersSlice
        }))

    } catch (error) {
        dispatch(requestFailed({ error: error.message, filtersQueryString, filters, }))
    }
}


export const prepareRequest = ({ type, category }) => (dispatch) => {

    dispatch(requestPrepared({ type, category }))
}

export const tryRequestWithSameFilters = () => (dispatch) => {
    dispatch(triedRequestWithSameFilters())
}

export const get_AddOffers = ({ from, to, sliceCount, isPrev, isNext }) => async (dispatch, getState) => {

    const state = getState()
    const offersListState = state.offersList

    let currentDataFrom = offersListState.currentDataFrom
    let currentDataTo = offersListState.currentDataTo

    const filtersState = state.filters

    const [needFrom, needTo, isNeedClear, need_isPrev, curFrom, curTo] = getReal_From_and_To({ offersListState, from, to, sliceCount, isNext, isPrev })
    const filtersQueryString = filtersState.query
    const filters = filtersState.obj


    try {
        dispatch((requestedAdd_WithSameFilters({ from, to, filtersQueryString, filters })))

        const data = await offerService.getByFilters({ filters: filtersQueryString, from: needFrom, to: needTo })
        let newEntities = offersListState.entities


        if (isNeedClear) {
            newEntities = [...data.offersSlice]
            currentDataFrom = needFrom
            currentDataTo = needTo
            debugger
        }
        else {

            if (newEntities.length + data.offersSlice.length >= 30) {
                currentDataFrom = !need_isPrev ? currentDataFrom + data.offersSlice.length : needFrom
                // currentDataFrom = !need_isPrev ? currentDataFrom : needFrom
                currentDataTo = !need_isPrev ? needTo : currentDataTo - data.offersSlice.length

                newEntities = !need_isPrev
                    ?// вырезаем НАЧАЛО newEntities, выкидываем его и берем оставшийся конец
                    [...newEntities.slice(Math.abs(newEntities.length - data.offersSlice.length)),
                    ...data.offersSlice]
                    : [...data.offersSlice, ...newEntities.slice(0, data.offersSlice.length)]
            }
            else {
                currentDataFrom = !need_isPrev ? currentDataFrom : needFrom
                currentDataTo = !need_isPrev ? needTo : currentDataTo

                newEntities = !need_isPrev
                    ? [...newEntities, ...data.offersSlice]
                    : newEntities = [...data.offersSlice, ...newEntities]
            }
            debugger

        }
        currentDataTo = currentDataFrom + newEntities.length
        dispatch(receivedAdd_WithSameFilters({
            currentDataFrom,
            currentDataTo,
            from: data.from,
            to: data.to,
            allCount: data.allCount,
            offersSlice: newEntities
        }))

    } catch (error) {

        dispatch(requestedAddFailed_WithSameFilters({ error: error.message, filtersQueryString, filters, }))
    }
}


export const getOffersListState =
    (field) =>
        (state) => {
            if (field) {

                const tmp = _.at(state.offersList, field)
                console.log("got from AuthState by", field, ":", tmp);
                return tmp?.[0]
            }
            return state.offersList
        }

// (field) ? state.offersList?.[field] : state.offersList


export default offersListReducer