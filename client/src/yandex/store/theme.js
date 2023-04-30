import { createAction, createSlice } from "@reduxjs/toolkit";

export const THEME_KEYS = {
    DARK: "DARK",
    LIGHT: "LIGHT"
}



const initialState = {
    currentTheme: THEME_KEYS.LIGHT,
}




const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggled(state, action) {
            state.currentTheme = (state.currentTheme === THEME_KEYS.LIGHT) ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

        },
    }
})

const { actions, reducer: themeReducer } = themeSlice

const { toggled } = actions


export const toggleTheme = () => (dispatch) => {
    dispatch(toggled())
}

export const getCurrentTheme =
    () =>
        (state) => {
            return state.theme.currentTheme
        }


export default themeReducer

