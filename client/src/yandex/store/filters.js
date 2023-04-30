import { createAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";


const initialState = {
    obj: {},
    query: ""
}



const filtersState = createSlice({
    name: "filters",
    initialState,
    reducers: {
        // updated(state, action) {
        //     const newState = (Array.isArray(action.payload) || typeof action.payload !== "object")
        //         ? action.payload
        //         : { ...(state), ...action.payload }
        //     return { ...newState }
        // },
        updated(state, action) {
            state.obj = action.payload.obj
            state.query = action.payload.query
        },
        deleted(state, action) {
            return (Array.isArray(action.payload) || typeof action.payload !== "object")
                ? action.payload
                : { ...(state), ...action.payload }
        },
        setSyntethed(state, action) {
            return action.payload
        }
        // toQuery(state, action) {

        // }

    }
})

const { actions, reducer: filtersReducer } = filtersState

const { updated, deleted, setSyntethed } = actions


export const updateFilters = (filters, query) => (dispatch) => {
    dispatch(updated({ obj: filters, query }))
}

export function setSyntethedFilters(val) {
    return setSyntethed(val)
}

export const getFiltersState =
    (field) =>
        (state) => {
            if (field) {

                const tmp = _.at(state.filters, field)
                console.log("got from AuthState by", field, ":", tmp);
                return tmp?.[0]
            }
            return state.offersList
        }

export default filtersReducer