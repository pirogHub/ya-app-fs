import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, getIsSigned, reSignInWithLocalStorageData, signOut } from "../../store/auth";
import { useHistory } from "react-router-dom";
import localStorageService from "../../services/localStorage.service";


const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}


const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()


    // const [isSigned, setIsSigned] = useState(false)

    const isSigned = useSelector(getAuthState("isSigned"))
    const loadingStatus = useSelector(getAuthState("loadingStatus"))

    const userName = useSelector(getAuthState("user.userName"))
    const userId = useSelector(getAuthState("user.userId"))
    const userOfferList = useSelector(getAuthState("user.offerList"))
    const currentUser = useSelector(getAuthState("user"))

    const reduxTokens = useSelector(getAuthState("tokens"))


    const logOut = () => {
        localStorageService.removeAllTokens()

        dispatch(signOut())
    }

    const checkIsSigned = () => {
        return isSigned
    }



    return (
        <AuthContext.Provider value={{
            checkIsSigned,
            isSigned,
            logOut,
            userName,
            userId,
            loadingStatus,
            currentUser,
            userOfferList
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider