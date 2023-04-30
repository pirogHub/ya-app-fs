import React, { useEffect, useMemo, useRef, useState } from "react";
import _, { forEach } from "lodash"

import "./components/Warnings/WarningWrapper.scss"
import "./AddOfferPage.scss"


import { getCategoriesByType, getTypesByCategory, } from "../../templateData/availableDataOptions";
import offerService from "../../services/offer.service";


import dataStructService from "../../services/dataStruct.service";
import GenRadioCheckboxWrapperWithState from "../../components/ui/Inputs/GenRadioCheckboxWrapperWithState";

import inputsGenerator from "../../components/ui/Inputs/InputsGenerator";

import FormGroup from "../../components/FormComponents/FormGroup";
import FormRow from "../../components/FormComponents/FormRow";
import { useFormHandlers } from "../../hooks/useFormHandlers/useFormHandlers";
import { getComponentStruct } from "../../store/componentsStructs";
import { useDispatch } from "react-redux";
import localStorageService from "../../services/localStorage.service";
import { useAuth } from "../../providers/AuthProvider/AuthProvider";

import ActionsContainer from "./components/ActionsContainer";
import mySuperValidator from "../../utils/mySuperValidator";

import myLodash from "../../utils/myLodash";
import Loader from "../../components/ui/Loader/Loader";
import { useModalWindow } from "../../providers/modalWindow/modalWindowProvider";
import RightSideActions from "./components/RightSideActions";
import { useShowEditPageWarning } from "./components/Warnings/useShowEditPageWarning"
import { useShowUploadSuccessWarning } from "./components/Warnings/useShowUploadSuccessWarning";
import { useShowUploadError } from "./components/Warnings/useShowUploadError";
import { useShowUploadLoading } from "./components/Warnings/useShowLoading";
import { ERROR_TYPES, setError } from "../../store/errors";
import { useShowDataMayLostIfChange } from "./components/Warnings/useShowDataMayLostIfChange";
import { addOneOffer } from "../../store/auth";




const AddOfferPage = ({ offerToEdit }) => {

    const { isSigned, userName, userId } = useAuth()

    const dispatch = useDispatch()
    const refPageStart = useRef()

    const [showEditPageWarning, closeEditPageWarning] = useShowEditPageWarning()
    const [showUploadSuccessWarning, closeUploadSuccessWarning] = useShowUploadSuccessWarning()
    const [showUploadErrorWarning, closeUploadErrorWarning] = useShowUploadError()
    const [showUploadLoading, closeUploadLoading] = useShowUploadLoading()
    const [showDataMayLostIfChange, closeShowDataMayLostIfChange] = useShowDataMayLostIfChange()

    const [isShowOfferDataMayBeLostIsChange_type_and_category, setIsShowOfferDataMayBeLostIsChange_type_and_category] = useState(false)
    const refStateSavedPrevOnlyCategoryAndType = useRef({})
    const refStateSavedNewOnlyCategoryAndType = useRef({})
    const refUserChooseTypeAndCategory = useRef(false)

    const [progress, setProgress] = useState(0)
    const progressObj = useRef({})


    const refNotEmptyCharsCount = useRef(0)
    const refAllCharsCount = useRef(2)
    const refGeneratingEnd = useRef(false)
    const wasSubmitAttempt = useRef(false)

    const refNotValidateKeysNew = useRef([])

    const [uploadLoadingOfferResult, setUploadLoadingOfferResult] = useState(null)
    const [uploadStructStatus, setUploadStructStatus] = useState(null)





    useEffect(() => {
        let struct
        progressObj.current = {}
        if (offerToEdit) {
            struct = offerToEdit
        } else {
            // progressObj.current = {}
            struct = localStorageService.getOfferItem()
        }

        if (struct) {
            // progressObj.current = {}
            const arr = myLodash.getNoEmptyPathes(struct)
            arr.forEach(fullPath => {
                progressObj.current[fullPath.join("-")] = 1
            })
            refStateSavedPrevOnlyCategoryAndType.current.type = struct?.type
            refStateSavedPrevOnlyCategoryAndType.current.category = struct?.category
            createAndSetSyntheticState(struct)
        }
        setIsLoadingFromLocalStorage(prev => false)
    }, [])

    const [isLoadingFromLocalStorage, setIsLoadingFromLocalStorage] = useState(true)

    const onTryingSetSyntheticState = (isSuccess, struct) => {
        closeUploadLoading()
        refStateSavedPrevOnlyCategoryAndType.current.type = struct.type
        refStateSavedPrevOnlyCategoryAndType.current.category = struct.category
        // refUserChooseTypeAndCategory.current = true

        refState.current = struct
        progressObj.current = {}
        const arr = myLodash.getNoEmptyPathes(struct)
        arr.forEach(fullPath => {
            progressObj.current[fullPath.join("-")] = 1
        })
        persentCounter(progressObj.current)

        changeProgress()
    }

    const persentCounter = (progressObj) => {
        refNotEmptyCharsCount.current = 0
        if (!progressObj) return
        Object.keys(progressObj).forEach(i => {
            refNotEmptyCharsCount.current += progressObj[i]
        })

        console.log("refNotEmptyCharsCount", refNotEmptyCharsCount.current);
    }

    const changeProgress = () => {

        // let curAllCharsCount = (serverComponentsStruct) ? refAllCharsCount.current - refNotValidateKeys.current.length : 30
        let curAllCharsCount = (serverComponentsStruct) ? refAllCharsCount.current : 30
        console.log("changeProgress", curAllCharsCount);
        curAllCharsCount = curAllCharsCount > 0 ? curAllCharsCount : 0
        console.log("changeProgress", curAllCharsCount);
        let currentPersent = Math.ceil(refNotEmptyCharsCount.current / curAllCharsCount * 100)
        currentPersent = currentPersent < 0 ? 0 : currentPersent

        setProgress(prev => currentPersent)

    }


    const onLoadingValToState = (oldVal, newVal, lastKey, fullKeyPath) => {
        if (refGeneratingEnd.current) {
            // if (refNotValidateKeys.current.includes(valueMainKey)) { }
            if (fullKeyPath?.length === 1 && (lastKey === "type" || lastKey === "category")) {
                refStateSavedPrevOnlyCategoryAndType.current = { ...refStateSavedPrevOnlyCategoryAndType.current, [lastKey]: oldVal }
                refStateSavedNewOnlyCategoryAndType.current = { [lastKey]: newVal }
            }

            const tmpOld = !mySuperValidator.isEmptyDetecter(oldVal)
            const tmpNew = !mySuperValidator.isEmptyDetecter(newVal)
            const path = fullKeyPath.join("-")

            progressObj.current[path] = tmpNew ? 1 : 0

            persentCounter(progressObj.current)
        }
        if (fullKeyPath[0] === "type" || fullKeyPath[0] === "category") toggleToRerender(prev => !prev)

    }


    const onStateChanged = () => {
        if (wasSubmitAttempt.current) {
            const err = mySuperValidator.validator({
                state: refState.current,
                notValidateKeysArray: [...refNotValidateKeysNew.current, "FullServiceInfo"],

            })
            if (err && Object.keys(err).length || Object.keys(errorsState).length) {
                setErrorsState(prev => err)
            }
        }

        const withOnlyNotEmpty = mySuperValidator.createWithNotEmptyFrom(refState.current)

        if (withOnlyNotEmpty) localStorageService.setOfferItem(withOnlyNotEmpty)
        changeProgress()
    }

    const [errorsState, setErrorsState] = useState({})


    useEffect(() => {
        if (!refState.current?.type?.length && !refState.current?.category?.length) {

            refPageStart.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    })




    const [toRerender, toggleToRerender] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("handleSubmit", e);
        wasSubmitAttempt.current = true

        const err = mySuperValidator.validator({
            state: refState.current,
            notValidateKeysArray: [...refNotValidateKeysNew.current, "FullServiceInfo"],
        })

        console.log("handleSubmit err", err);
        if (err && Object.keys(err).length || Object.keys(errorsState).length) {
            setErrorsState(prev => err)
        } else {
            showUploadLoading()

            const link = await offerService.uploadOne({ ...refState.current, userId: userId }, refState.current.category)
            setUploadLoadingOfferResult(prev => link ? link : false)
            if (link) localStorageService.removeOfferItem()

            closeUploadLoading()
        }
    }

    useEffect(() => {
        if (offerToEdit) showEditPageWarning()
    }, [offerToEdit])

    useEffect(() => {
        if (Object.keys(errorsState).length && refState.current?.type?.[0] && refState.current?.category?.[0]) {
            const tmp1 = errorsState
            const tmp2 = refState.current?.type?.[0]
            const tmp3 = refState.current?.category?.[0]

            dispatch(setError({ message: "В объявлении есть некоторые ошибки", errorType: ERROR_TYPES.WARNING }))
        }
    }, [errorsState])



    const {
        refState,
        loadValToState,
        syntheticState,
        downloadAndSetSyntheticState,
        createAndSetSyntheticState,
        togglerClearState,
        clearFilters,
        refIsSyntheticStateIniting
    } = useFormHandlers({
        initialState: { type: undefined, category: undefined },
        syntheticRandomStateGetter: (type, category) => dataStructService.getRandom({ type, structName: category, toWhoom: "author" }),
        onLoadingValToState: onLoadingValToState,
        onStateChanged: onStateChanged,
        onTryingSetSyntheticState,
        debug: true
    })

    useEffect(() => {
        const tmp = refState.current

    }, [refState.current])


    const [serverComponentsStruct, setServerComponentsStruct] = useState(null)
    const inputList = useMemo(() => inputsGenerator(
        {
            serverComponentsStruct,
            loadValToForm: loadValToState,
            syntheticStateOfAll: syntheticState,
            errorsStateOfALL: errorsState,
            clearTogglerFlag: togglerClearState,
            refElementsCounter: refAllCharsCount,
            externalElementsCount: 2,
            onGeneratingEnd: () => {
                refGeneratingEnd.current = true
            },
            refIsNotRequiredArray: refNotValidateKeysNew
        }
    ), [serverComponentsStruct, syntheticState, togglerClearState, errorsState])

    useEffect(() => {
        console.log("useEffect refNotValidateKeysNew", refNotValidateKeysNew);
    }, [refNotValidateKeysNew])

    // useEffect(() => {


    // }, [syntheticState])


    useEffect(() => {

        if (!isShowOfferDataMayBeLostIsChange_type_and_category) return
        const isTypeChanged = refState.current?.type?.[0] !== refStateSavedPrevOnlyCategoryAndType.current?.type?.[0]
        const isCategoryChanged = refState.current?.category?.[0] !== refStateSavedPrevOnlyCategoryAndType.current?.category?.[0]

        showDataMayLostIfChange({
            isTypeChanged,
            isCategoryChanged,
            funcIfYes: () => {
                clearFilters(refStateSavedNewOnlyCategoryAndType.current)


                localClearForm({ withDirectRefStateClear: true, toSave: refStateSavedNewOnlyCategoryAndType.current })
                createAndSetSyntheticState(refStateSavedNewOnlyCategoryAndType.current)
                setIsShowOfferDataMayBeLostIsChange_type_and_category(false)
            },
            funcIfNot: () => {
                refState.current = { ...refState.current, ...refStateSavedPrevOnlyCategoryAndType.current }
                createAndSetSyntheticState(refState.current)
                setIsShowOfferDataMayBeLostIsChange_type_and_category(false)

            }
        })

    }, [isShowOfferDataMayBeLostIsChange_type_and_category])

    useEffect(() => {

        if (isShowOfferDataMayBeLostIsChange_type_and_category) return

        const isTypeChanged = refState.current?.type?.[0] !== refStateSavedPrevOnlyCategoryAndType.current?.type?.[0]
        const isCategoryChanged = refState.current?.category?.[0] !== refStateSavedPrevOnlyCategoryAndType.current?.category?.[0]
        const isthisChange_is_ReChange = refUserChooseTypeAndCategory.current && (isTypeChanged || isCategoryChanged)
        if (isthisChange_is_ReChange) {
            refUserChooseTypeAndCategory.current = false
            setIsShowOfferDataMayBeLostIsChange_type_and_category(true)
            return
        }
        if (
            !refUserChooseTypeAndCategory.current
            && refState.current?.type?.[0]
            && refState.current?.category?.[0]

        ) {
            refUserChooseTypeAndCategory.current = true
            // то есть пользователь уже зафиксировал выбор type и category

        }


        if (
            !isShowOfferDataMayBeLostIsChange_type_and_category
            && refState.current?.type?.[0]
            && refState.current?.category?.[0]
        ) {
            async function fetchComponentsStruct() {
                setUploadStructStatus(null)
                const struct = await dispatch(getComponentStruct({ structType: refState.current?.type, structName: refState.current?.category, toWhoom: "author" }))
                console.log("struct", struct);
                if (struct?.error) {
                    setUploadStructStatus(false)
                } else {
                    setUploadStructStatus(true)
                    setServerComponentsStruct(struct)
                }
            }
            fetchComponentsStruct()

        }
    }, [refState.current?.type?.[0], refState.current?.category?.[0], isShowOfferDataMayBeLostIsChange_type_and_category])


    useEffect(() => {
        if (uploadLoadingOfferResult) {
            dispatch(addOneOffer(uploadLoadingOfferResult))
            localClearForm({ withFormHandlerClearer: true })
            showUploadSuccessWarning(uploadLoadingOfferResult)
        } else if (uploadLoadingOfferResult === false) {
            showUploadErrorWarning()
        }
    }, [uploadLoadingOfferResult])

    if (isLoadingFromLocalStorage) return <></>



    const localClearForm = ({ withFormHandlerClearer = false, withDirectRefStateClear = false, toSave }) => {
        setErrorsState(prev => ({}))
        wasSubmitAttempt.current = false
        refNotEmptyCharsCount.current = 0
        progressObj.current = {}
        refStateSavedNewOnlyCategoryAndType.current = {}
        refStateSavedPrevOnlyCategoryAndType.current = toSave ? toSave : {}
        refUserChooseTypeAndCategory.current = false
        if (withFormHandlerClearer) { clearFilters({ type: undefined, category: undefined }) }

        if (withDirectRefStateClear) {
            refState.current = toSave ? toSave : {}
            // refState.current = { type: undefined, category: undefined, }
        }

        localStorageService.removeOfferItem()
        setUploadLoadingOfferResult(prev => null)

    }



    return (
        <>
            <div ref={refPageStart} className="offer-form">

                <div className="offer-form__left">
                    <form onSubmit={handleSubmit}>
                        {offerToEdit ? <h2>{`Изменяйте обьявление с Удовольствием, ${userName}`}</h2>
                            : userName
                                ? <h2>{`Ваше Новое объявление, ${userName}`}</h2>
                                : <h2>Новое объявление</h2>}
                        <FormGroup
                            className="offer-form-group_type_category"
                        // myRef={ref}
                        >
                            <FormRow errorsState={errorsState?.type}>
                                <GenRadioCheckboxWrapperWithState
                                    key={"type" + togglerClearState}
                                    name={"type"}
                                    type="radio"
                                    onChange={(data) => { loadValToState(data) }}
                                    optionsList={getTypesByCategory(refState.current?.category)}
                                    isDebug={true}
                                    randomState={syntheticState}

                                />
                            </FormRow>
                        </FormGroup>


                        <FormGroup
                            className="offer-form-group_type_category"
                            label="Выберите тип Недвижимости"
                        >
                            <FormRow errorsState={errorsState?.category}>
                                <GenRadioCheckboxWrapperWithState
                                    key={"category" + togglerClearState}
                                    name={"category"}
                                    type="radio"
                                    onChange={(data) => { loadValToState(data) }}
                                    optionsList={getCategoriesByType(refState.current?.type)}
                                    isDebug={true}
                                    randomState={syntheticState}
                                />
                            </FormRow>
                        </FormGroup>



                        {(!refState.current?.type?.length
                            || !refState.current?.category?.length)
                            ? <></>
                            : <>
                                {uploadStructStatus === null
                                    ? <Loader size={"100px"} />
                                    : uploadStructStatus === false
                                        ?
                                        <div className="WarningWrapper">Ошибка загрузки структуры объвления</div>
                                        : <>
                                            {inputList}


                                            < ActionsContainer

                                                isSigned={isSigned}
                                            />
                                        </>
                                }
                            </>
                        }

                    </form>
                </div>
                <div className="offer-form__right">
                    <RightSideActions
                        progress={progress}
                        localClearForm={localClearForm}
                        errorsState={errorsState}
                        downloadAndSetSyntheticState={async () => {
                            showUploadLoading()
                            localClearForm({ withDirectRefStateClear: true })
                            const returning = await downloadAndSetSyntheticState(refState.current?.type?.[0], refState.current?.category?.[0])

                            return returning
                        }
                        }
                    />
                </div>
            </div>

        </>
    )
}

export default AddOfferPage