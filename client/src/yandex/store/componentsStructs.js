import { createSlice } from "@reduxjs/toolkit"
import dataStructService from "../services/dataStruct.service"

const initialState = {
    structObj: {},
    error: null
}



const componentsStructsSlice = createSlice({
    name: "componentsStructs",
    initialState,
    reducers: {
        requested(state, action) {
        },
        receivedAlreadyHad(state, action) {
        },
        requestFailed(state, action) {
            state.error = action.payload.error
        },
        received(state, { payload: { toWhoom, structName, data, expired } }) {
            if (!state.structObj?.[toWhoom])
                state.structObj[toWhoom] = {}

            if (!state.structObj[toWhoom]?.[structName])
                state.structObj[toWhoom][structName] = {}

            state.structObj[toWhoom][structName].data = data
            state.structObj[toWhoom][structName].expired = expired
        }
    }
})

const { actions, reducer: componentsStructsReducer } = componentsStructsSlice


const { requested, receivedAlreadyHad, requestFailed, received } = actions


export const getComponentStruct = ({ structType, structName, toWhoom }) =>
    async (dispatch, getState) => {

        try {
            if (!structName || !toWhoom) throw new Error(`Некорректное имя запрашиваемой структуры ${structName} ${toWhoom}`)
            console.log("getComponentStruct ", getState);
            const state = getState()
            const { structObj } = state.componentsStructs
            dispatch(requested({ structType, structName, toWhoom }))
            const isStruct = structObj?.[toWhoom]?.[structName]
            if (
                isStruct
                && isStruct?.data
                && isStruct?.expired >= Date.now()
            ) {
                dispatch(receivedAlreadyHad({ structType, structName, toWhoom }))
                return isStruct.data
            } else {

                const struct = await dataStructService.getComponentsStruct({ structType, structName, toWhoom })
                dispatch(received({ structType, structName, toWhoom, data: struct, expired: Date.now() + 1000 * 60 * 60 }))
                return struct

            }
        } catch (error) {

            dispatch(requestFailed({ error: error.message }))
            return undefined
        }
    }



export default componentsStructsReducer