import { createSlice } from "@reduxjs/toolkit"
import authService from "../services/auth.services"
import localStorageService from "../services/localStorage.service"
import _ from "lodash"
import userService from "../services/user.service"
import { useSelector } from "react-redux"
import { ERROR_TYPES, setError } from "./errors"

const initialState = {

    tokens: {
        accessToken: undefined, // чем отличается accessToken
        refreshToken: undefined, // для перевыпуска accessToken
        expiresIn: undefined,
        userId: undefined,

    },
    user: {
        userName: undefined,
        avatarLink: undefined,
        email: undefined,
        userId: undefined,
        offerList: []
    },
    loadingStatus: "loading", //  "loading" | "error" | "signed"
    error: {},
    isSigned: false
}
const repeatActions = {
    requested(state, action) {
        state.tokens.accessToken = undefined
        state.tokens.refreshToken = undefined
        state.tokens.expiresIn = undefined
        state.tokens.userId = undefined

        state.user.userName = undefined
        state.user.avatarLink = undefined
        state.user.email = undefined
        state.user.userId = undefined
        state.user.offerList = []
        state.loadingStatus = "loading"
        state.isSigned = null
    },
    successed(state, action) {

        state.tokens.accessToken = action.payload.accessToken
        state.tokens.refreshToken = action.payload.refreshToken
        state.tokens.expiresIn = action.payload.expiresIn
        state.tokens.userId = action.payload.userId

        state.user.userName = action.payload.userName
        state.user.avatarLink = action.payload.avatarLink
        state.user.email = action.payload.email
        state.user.userId = action.payload.userId
        state.user.offerList = action.payload.offerList
        state.loadingStatus = "signed"
        state.error = {}
        state.isSigned = true
    },
    failed(state, action) {
        state.tokens.accessToken = undefined
        state.tokens.refreshToken = undefined
        state.tokens.expiresIn = undefined
        state.tokens.userId = undefined

        state.user.userName = undefined
        state.user.avatarLink = undefined
        state.user.email = undefined
        state.user.userId = undefined
        state.user.offerList = []

        state.loadingStatus = "error"
        state.error = action.payload.error
        state.isSigned = false
    },
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signUpRequested(state, action) {
            repeatActions.requested(state, action)
        },
        signUpSuccessed(state, action) {
            repeatActions.successed(state, action)
        },
        signUpFailed(state, action) {
            repeatActions.failed(state, action)
        },
        signInRequested(state, action) {
            repeatActions.requested(state, action)
        },
        signInSuccessed(state, action) {
            repeatActions.successed(state, action)
        },
        signInFailed(state, action) {
            repeatActions.failed(state, action)
        },
        reSignInRequested(state, action) {
            repeatActions.requested(state, action)
        },
        reSignInSuccessed(state, action) {
            repeatActions.successed(state, action)
        },
        reSignInFailed(state, action) {
            repeatActions.failed(state, action)
        },
        signedOut(state, action) {

            state.tokens.accessToken = undefined
            state.tokens.refreshToken = undefined
            state.tokens.expiresIn = undefined
            state.tokens.userId = undefined

            state.user.userName = undefined
            state.user.avatarLink = undefined
            state.user.email = undefined
            state.user.userId = undefined

            state.loadingStatus = "error"
            state.isSigned = null
            state.error = {}
        },
        offerListUpdated(state, action) {
            state.offerList = action.payload.offerList
        }
    }
})

const { actions, reducer: authReducer } = authSlice

const {
    signUpRequested,
    signUpSuccessed,
    signUpFailed,
    signInRequested,
    signInSuccessed,
    signInFailed,
    reSignInRequested,
    reSignInSuccessed,
    reSignInFailed,
    signedOut,
    offerListUpdated,
} = actions

const signMethods = {
    signIn: {
        requested: signInRequested,
        successed: signInSuccessed,
        failed: signInFailed,
        authService: authService.signIn
    },
    signUp: {
        requested: signUpRequested,
        successed: signUpSuccessed,
        failed: signUpFailed,
        authService: authService.signUp
    }
}

export const signOut = () => (dispatch) => {
    dispatch(signedOut())

}

export const updateOfferList = (newOfferList) => (dispatch) => {
    dispatch(offerListUpdated({ newOfferList }))
}

export const removeOneOffer = (oneLink) => (dispatch, getState) => {
    const state = getState()
    const offerList = state.auth.offerList
    const newOfferList = offerList.filter(l => l !== oneLink)
    dispatch(offerListUpdated({ newOfferList }))
}

export const addOneOffer = (oneLink) => (dispatch, getState) => {
    const state = getState()
    const offerList = state.auth.offerList
    const newOfferList = offerList.unshift(oneLink)
    dispatch(offerListUpdated({ newOfferList }))
}

export const sign = ({ type, email, password, userName }) => async (dispatch) => {

    const methods = (type === "signIn" || type === "signUp") ? signMethods?.[type] : undefined

    console.log("sign: ", type, email, password, userName, "methods", methods);
    if (
        !methods
            || !email
            || !password
            || type === "signUp" ? !userName : false
    ) throw new Error({ message: "invalid type of sign: " + type })
    dispatch(methods.requested())

    try {
        console.log("sign_Universal try");
        const body = { email, password }
        if (userName) body.userName = userName
        console.log("sign_Universal body", body);

        const { tokens, user } = await methods.authService(body)

        if (
            !tokens.accessToken ||
            !tokens.refreshToken ||
            !tokens.expiresIn ||
            !tokens.userId ||
            (type === "signIn" ? false : !user.userName)
        ) {

            console.log("sign_Universal Server Error: some tokens are invalid:",
                tokens.accessToken,
                tokens.refreshToken,
                tokens.expiresIn,
                tokens.userId,
                user.userName
            );
            throw new Error({ message: "Server Error: some tokens are invalid" })
        }
        localStorageService.setTokens({ ...tokens })

        dispatch(methods.successed({ ...tokens, ...user }))
        dispatch(setError({ message: `Вы успешно ${type === "signUp" ? "Зарегистрировались!" : "Вошли!"}`, errorType: ERROR_TYPES.VALID }))
    } catch (error) {
        localStorageService.removeAllTokens()
        console.log("error:", error);
        dispatch(methods.failed({ message: error.message, errorType: ERROR_TYPES.ERROR }))
        dispatch(setError({ message: "Пользователя с таким email не существует", errorType: ERROR_TYPES.ERROR }))
        return null
    }

    // dispatch(
    //     sign_Universal({ methods, email, password, userName })
    // )

}

export const reSignInWithLocalStorageData = () => async (dispatch) => {

    const tokens = localStorageService.getTokens()

    try {
        dispatch(reSignInRequested())
        if (!tokens?.accessToken || !tokens?.refreshToken || !tokens?.userId) {
            throw new Error("no tokens")
        }
        const user = await userService.getUserById(tokens.userId)
        if (!user) throw new Error("no tokens")

        dispatch(reSignInSuccessed({ ...tokens, ...user }))
        return true
    } catch (error) {
        console.log("Not resign");
        localStorageService.removeAllTokens()
        // dispatch(logOut)
        dispatch(reSignInFailed(error?.message))
        return false
    }

}


export const getAuthState =
    (field) =>
        (state) => {
            if (field) {

                const tmp = _.at(state.auth, field)
                console.log("got from AuthState by", field, ":", tmp);
                return tmp?.[0]
            }
            return state.auth
        }

export const getIsSigned = () => (state) => {
    const { tokens } = state.auth
    const { user } = state.auth

    if (
        !tokens?.accessToken ||
        !tokens?.refreshToken ||
        !tokens?.expiresIn ||
        !tokens?.userId ||
        !user?.userId ||
        !user?.userName
    ) return false
    return true
}

export const useAuthBlean = () => {
    const auth = useSelector((state) => state.auth)

    const isSigned =
        !auth?.tokens?.accessToken ||
        !auth?.tokens?.refreshToken ||
        !auth?.tokens?.expiresIn ||
        !auth?.tokens?.userId ||
        !auth?.user?.userId ||
        !auth?.user?.userName
    const loadingStatus = auth.loadingStatus

    return { ...auth?.tokens, currentUser: auth?.user, isSigned, error: auth.error, loadingStatus: auth.loadingStatus }
}

export default authReducer
