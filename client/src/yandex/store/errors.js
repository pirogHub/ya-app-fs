import { createAction, createSlice } from "@reduxjs/toolkit";

export const ERROR_TYPES = {
    ERROR: "ERROR",
    WARNING: "WARNING",
    VALID: "VALID"
}

const initialState = {
    entities: [],
}

const errorsSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        set(state, action) {

            state.entities.push({ message: action.payload.message, errorType: action.payload.errorType, key: action.payload.key })
        },
        removed(state, action) {
            // const idx = find
            // const newEntities = state.entities.filter(e => e.message !== action.payload.message && e.errorType !== action.payload.errorType)
            const newEntities = state.entities.filter(e => e.key !== action.payload.key)
            state.entities = newEntities
        }
    }
})

const { actions, reducer: errorReducer } = errorsSlice


const { set, removed } = actions

export const setError = ({ message, errorType = ERROR_TYPES.ERROR }) => (dispatch) => {
    const key = Date.now() + "_" + Math.random().toFixed(6)

    dispatch(set({ message, errorType, key }))
}

export const removeError = (e) => (dispatch) => {
    const { message, errorType, key } = e
    dispatch(removed({ message, errorType, key }))
}

export const getErrors = () => (state) => state.errors.entities

export default errorReducer