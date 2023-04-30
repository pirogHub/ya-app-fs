import React, { useEffect } from "react";
import { useAuth } from "../../../../providers/AuthProvider/AuthProvider";
import { useDispatch } from "react-redux";
import { reSignInWithLocalStorageData } from "../../../../store/auth";



const AuthController = () => {
    const { isSigned } = useAuth()
    const dispatch = useDispatch()
    // const isSigned = useSelector(getAuthState("auth.isSigned"))

    useEffect(() => {
        console.log("AuthProvider useEffect first Render");

        // const signStatus = checkIsSigned()

        // setIsSigned(signStatus)
        if (!isSigned) dispatch(reSignInWithLocalStorageData())

    }, [])


    useEffect(() => {
        // if (smth) {
        //     dispatch(setError())
        //     dispatch(logOut())
        //     history.push()
        // }
    }, [])



    return <></>
}

export default AuthController