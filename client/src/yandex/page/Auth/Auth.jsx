import React, { useEffect, useRef, useState } from "react";
import FormGroup from "../../components/FormComponents/FormGroup";
import FormRow from "../../components/FormComponents/FormRow";
import GenTextInput from "../../components/ui/Inputs/GenTextInput";
import { useFormHandlers } from "../../hooks/useFormHandlers/useFormHandlers";
import mySuperValidator, { validateCheckings } from "../../utils/mySuperValidator";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Content from "../../layouts/MainLayout/components/Content";


import "./Auth.scss"
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, sign } from "../../store/auth";
import { useAuth } from "../../providers/AuthProvider/AuthProvider";
import Loader from "../../components/ui/Loader/Loader";
import ToTopScroller from "../../components/ToTopScroller/ToTopScroller";

const SIGN_KEYS = {
    signIn: "signIn",
    signUp: "signUp",
}

const SwitchSign = {
    mainTitle: {
        [SIGN_KEYS.signUp]: "Регистрация",
        [SIGN_KEYS.signIn]: "Войти"
    },
    SignLinkText: {
        [SIGN_KEYS.signUp]: "Уже есть аккаунт? Войти",
        [SIGN_KEYS.signIn]: "Еще нет аккаунта? Зарегистрироваться"
    },
    SignLinkConfig: {
        [SIGN_KEYS.signUp]: {
            to: {
                pathname: "/auth",
                search: `?type=signIn`,
            }
        },
        [SIGN_KEYS.signIn]: {
            to: {
                pathname: "/auth",
                search: `?type=signUp`,
            }
        }
    },
    submitButtonText: {
        [SIGN_KEYS.signUp]: "Зарегистрироваться",
        [SIGN_KEYS.signIn]: "Войти"
    }

}

const Auth = (a) => {
    const dispatch = useDispatch()
    const location = useLocation()

    // const loadingStatus = useSelector(getAuthState("loadingStatus"))
    // const userId = useSelector(getAuthState("user.userId"))
    const { isSigned, userId, loadingStatus } = useAuth()
    const history = useHistory()
    const [isSignIn, setIsSignIn] = useState(SIGN_KEYS.signIn)
    const [errors, setErrors] = useState({})
    const [isShowPassword, setIsShowPassword] = useState(false)
    const refNotTouched = useRef([])
    const [isFormValid, setIsFormValid] = useState(false)

    const redirectedUrl = useRef()

    useEffect(() => {

    }, [])


    const isSaveFirstInitingStateRef = useRef(true)

    useEffect(() => {
        // 
        const queryParameters = new URLSearchParams(location.search)
        let query = {}
        try {
            for (const [key, value] of (queryParameters.entries())) {
                query = { ...query, [key]: value }
            }

        } catch (error) {

        }



        setErrors({})
        refNotTouched.current = []
        clearFilters()
        let method

        redirectedUrl.current = query?.redirected
        switch (query?.type) {
            case SIGN_KEYS.signUp:
                console.log("case signUp");
                setIsSignIn(prev => SIGN_KEYS.signUp)
                break;
            default:
                console.log("case default");
                setIsSignIn(prev => SIGN_KEYS.signIn)
                break;
        }

        console.log("Change after Switch to", query?.type);
    }, [location])


    useEffect(() => {
        console.log("UseEffect [loadingStatus, userId]", loadingStatus, userId);


        if (isSigned) {
            const redirected = redirectedUrl.current
            redirectedUrl.current = undefined
            // 
            history.push(redirected ? `/${redirected}` : "/user/" + userId)
            // history.push('/add')
        }
    }, [loadingStatus, userId])



    const onStateChanged = (newState, isSaveFirstInitingState, isFirstInit) => {
        console.log("onStateChanged refState.current", refState.current);
        console.log("onStateChanged  refNotTouched.current", refNotTouched.current);
        if (isFirstInit) return
        // if (isFirstInit) updateNotTochedArr({ isFirstInit })
        console.log("onStateChanged to validate", refState.current);
        const e = mySuperValidator.validator({
            state: refState.current,
            notValidateKeysArray: refNotTouched.current,
            validatingMethodsForKeys_MapObj: {
                email: validateCheckings.isEmail,
                password: validateCheckings.isPassword
            }
        })

        setErrors(prev => e)

        if (!Object.keys(e).length && !refNotTouched.current.length) {
            setIsFormValid(prev => true)
        } else {
            setIsFormValid(false)
        }
        console.log("onStateChanged  e", e);
    }

    const onLoadingValToState = (objValue, srcValue, value, mainKey, paramsForFuncWhenCopy) => {
        const isFirstInit = paramsForFuncWhenCopy?.isFirstInit
        if (isFirstInit) {

            console.log("onLoadingValToState mainKey", mainKey);
            console.log("onLoadingValToState refState.current", refState.current);
            console.log("onLoadingValToState objValue", objValue);
            updateNotTochedArr({ isFirstInit, name: mainKey?.[0], firstRender: objValue ? false : true })
        }
    }


    const updateNotTochedArr = ({ isFirstInit, name, firstRender = false, touched = false }) => {
        console.log("updateNotTochedArr",
            "name", name,
            "refNotTouched.current", refNotTouched.current,
            "refState.current", refState.current
        );
        if (!name) return

        if (isFirstInit) {
            if (!refNotTouched.current.includes(name))
                refNotTouched.current.push(name)
            return
        } else if (touched) {
            refNotTouched.current = refNotTouched.current.filter(n => n !== name)
        }

        console.log("updateNotTochedArr",
            "name", name,
            "refNotTouched.current", refNotTouched.current,
            "refState.current", refState.current
        );
        // if (isFirstInit) {
        //     console.log("updateNotTochedArr because isSyntheticStateIniting => clear refNotTouched");
        //     refNotTouched.current = [] // типа если сделали и загрузили искуственные значения, то, значит, всё типа потрогано
        //     return
        // } else {
        //     console.log("updateNotTochedArr because NOT isSyntheticStateIniting => NOT clear refNotTouched");
        // }
        // // 
        // if (refState.current?.[name]) {// то есть контрол уже был потроган и там есть значение
        //     console.log("updateNotTochedArr filter before", refNotTouched.current);
        //     refNotTouched.current = refNotTouched.current.filter(n => n !== name)
        //     console.log("updateNotTochedArr filter after", refNotTouched.current);
        // }
        // else {
        //     const idx = refNotTouched.current.findIndex(n => n === name)
        //     if (idx !== -1) { // то есть контрол уже был потроган, и значение сейчас пустое
        //         console.log("updateNotTochedArr slice before", refNotTouched.current);
        //         if (touched) refNotTouched.current.splice(idx, 1)
        //         console.log("updateNotTochedArr slice after", refNotTouched.current);
        //     } else { // то есть контрол ЕЩЕ НЕ был потроган
        //         if (isFirstInit) { }
        //         else if (firstRender) refNotTouched.current.push(name)
        //     }
        // }


        // if (!firstRender) onStateChanged()
        // if (touched) onStateChanged()

        console.log("updateNotTochedArr refNotTouched.current", refNotTouched.current);
    }

    useEffect(() => {

        console.log("refNotTouched.current", refNotTouched.current);
    }, [refNotTouched.current])

    const {
        refState,
        loadValToState,
        syntheticState,
        downloadAndSetSyntheticState,
        createAndSetSyntheticState,
        togglerClearState,
        clearFilters,
        refIsFirstInit_flag
    } = useFormHandlers({
        initialState: {},
        // syntheticRandomStateGetter: (type, category) => dataStructService.getRandom({ type, structName: category, toWhoom: "author" }),
        syntheticRandomStateGetter: () => ({ userName: "Mr. Tester", email: "test@test.test", password: "tEsTpAsSwOrD_2007" }),
        onLoadingValToState: onLoadingValToState,
        // onLoadingValToState: undefined,
        onStateChanged: onStateChanged,
        isSaveFirstInitingStateRef: isSaveFirstInitingStateRef,
        onTryingSetSyntheticState: () => updateNotTochedArr({ isSyntheticStateIniting: true }),
        debug: true
    })





    const handleSubmit = async (e) => {
        e?.preventDefault()
        console.log("handleSubmit to validate", refState.current);
        const err = mySuperValidator.validator({
            state: refState.current,
            notValidateKeysArray: undefined,
            validatingMethodsForKeys_MapObj: {
                email: validateCheckings.isEmail,
                password: validateCheckings.isPassword
            }
        })
        console.log("handleSubmit err", err);
        if (err && Object.keys(err).length) {
            setErrors(prev => err)
        } else {
            console.log("handleSubmit TRYTOSIGN with", refState.current);
            dispatch(sign({ type: isSignIn, ...refState.current }))
            // console.log("dispatch a", a);
            setIsStartTesting(false)
        }
    }
    const refAuthWrapper = useRef()
    const refShadower = useRef()
    const [isStartTesting, setIsStartTesting] = useState(false)


    const startInitTestUser = async () => {
        console.log("startInitTestUser",);

        const smth = await downloadAndSetSyntheticState()

        const [promises, ,] = smth
        console.log("startInitTestUser downloadAndSetSyntheticState",);

        Promise.all([promises]).then(() => {

            console.log("startInitTestUser promises all resolved", [promises]);
            console.log("refState", refState);
            const timeout = setTimeout(() => {
                handleSubmit({ preventDefault: () => { } })
                console.log("SUCCESSS");
                clearTimeout(timeout)

            }, 1000)
        })
    }

    useEffect(() => {
        console.log("useEffect isSignIn");
        if (isStartTesting && isSignIn === SIGN_KEYS.signIn) {
            console.log("useEffect isSignIn isStartTesting", isStartTesting);
            startInitTestUser()
        }
        console.log("useEffect isSignIn", isSignIn);
    }, [isSignIn])

    useEffect(() => {
        console.log("useEffect isStartTesting", isStartTesting);
        if (isStartTesting) {
            if (isSignIn === SIGN_KEYS.signIn) {
                startInitTestUser()
            }
            else {
                setIsSignIn(prev => SIGN_KEYS.signIn)
            }
        }
    }, [isStartTesting])
    useEffect(() => {
        if (
            isStartTesting
            || loadingStatus === "loading"
        ) {
            refFormContainer.current.classList.add("blured")
        } else {
            refFormContainer.current.classList.remove("blured")
        }

        if (isStartTesting && loadingStatus === "error") {
            setTimeout(() => setIsStartTesting(false), 1000)
        }
    }, [isStartTesting, loadingStatus])

    const refFormContainer = useRef()

    return <Content>
        <div ref={refShadower} className="Auth__shadower"></div>
        <ToTopScroller />
        <div
            ref={refAuthWrapper}
            className={"Auth__wrapper card"}>
            {(isStartTesting || loadingStatus === "loading")
                && <div className="Auth__loader">
                    <div className="Auth__loader-shadower"></div>
                    <Loader />
                </div>
            }

            <div
                ref={refFormContainer}
                className="Auth__blurer"
            >


                <form
                    className="Auth__form"

                    key={"form" + togglerClearState}
                    // key={"form"}
                    onSubmit={handleSubmit}>

                    <div className="Auth__form__main">



                        {/* <h2></h2> */}


                        <FormGroup label={SwitchSign.mainTitle[isSignIn]}>
                            {isSignIn === SIGN_KEYS.signUp && <FormRow
                                label={"Ваше Имя:"}
                                errorsState={errors?.userName}
                            >
                                <GenTextInput
                                    key={"userName"}
                                    // isDebug={true}
                                    name={"userName"}
                                    placeholder={"Введите имя..."}
                                    onChange_flag={true}
                                    onBlur={() => {

                                        updateNotTochedArr({ name: "userName", touched: true })
                                    }}
                                    loadValToForm={loadValToState}
                                    isWidth100={true}
                                    randomState={syntheticState}
                                />
                            </FormRow>
                            }
                            <FormRow
                                label={"Email"}
                                errorsState={errors?.email}
                            >
                                <GenTextInput
                                    // isDebug={true}
                                    name={"email"}
                                    placeholder={"Ваш email..."}
                                    onChange_flag={true}
                                    onBlur={() => updateNotTochedArr({ name: "email", touched: true })}
                                    loadValToForm={loadValToState}
                                    isWidth100={true}
                                    randomState={syntheticState}
                                />
                            </FormRow>
                            <FormRow
                                label={"Пароль"}
                                errorsState={errors?.password}
                                isErrorWrapperWidthMax={true}
                            >
                                <GenTextInput
                                    name={"password"}
                                    placeholder={"Ваш пароль..."}
                                    type={isShowPassword ? "text" : "password"}
                                    onBlur={() => updateNotTochedArr({ name: "password", touched: true })}
                                    loadValToForm={loadValToState}
                                    isWidth100={true}
                                    randomState={syntheticState}
                                    onChange_flag={true}
                                // isDebug={true}
                                />
                                <button
                                    type="button"
                                    className="btn btn-gray-outline bi-before-pi0"
                                    style={{ height: "100%" }}
                                    onClick={() => setIsShowPassword(prev => !prev)}
                                >
                                    <i className={"bi bi-eye" + (isShowPassword ? "" : "-slash")}></i>
                                </button>
                            </FormRow>

                        </FormGroup>

                        <div

                            className="Auth__LoginByTestAcc__wrapper"
                        >
                            <div

                                onMouseEnter={() => {
                                    refAuthWrapper.current.classList.add("beautiful")
                                    refShadower.current.classList.add("beautiful")
                                }}
                                onMouseLeave={() => {
                                    if (!isStartTesting) refAuthWrapper.current.classList.remove("beautiful")
                                    if (!isStartTesting) refShadower.current.classList.remove("beautiful")
                                }}
                                className="Auth__LoginByTestAcc btn btn-gray">
                                Зайти под тестовым аккаунтом
                                <button
                                    type="button"
                                    onClick={() => {
                                        // setIsStartTesting(true)
                                        setIsStartTesting(prev => !prev)
                                    }}
                                    className="btn btn-yellow-outline">
                                    Зайти
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="Auth__actionsWrapper">
                        <button className={"btn btn-green" + (isFormValid ? "" : " disabled")}>
                            {SwitchSign.submitButtonText[isSignIn]}
                        </button>
                        <Link to={SwitchSign.SignLinkConfig[isSignIn].to}>
                            <button
                                className="btn btn-yellow-outline"
                                style={{ color: "#000", width: "100%" }}
                            >
                                {SwitchSign.SignLinkText[isSignIn]}
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </Content >
}

export default Auth