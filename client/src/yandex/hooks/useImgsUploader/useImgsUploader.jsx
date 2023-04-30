import { useRef } from "react"
import { useState } from "react"
import { createRef } from "react"
import imgService from "../../services/img.service"
import { useEffect } from "react"
import { useRandomStateHandler } from "../useRandomStateHandler/useRandomHandler"
import mySuperValidator from "../../utils/mySuperValidator"

export const useImgsUploader_LOADING_STATUS = {
    toUpload: "toUpload",
    error: "error",
    pending: "pending",
    success: "success",
    none: "none"
}


const defaultFileTypes = ["image/jpeg", "image/pjpeg", "image/gif", "image/png", "image/x-png", "image/webp"]


export const useImgsUploader = ({
    name,
    fileTypes,
    loadValToForm,
    randomState,
    loadService,
    onOneFileBeforeUpload,
    onOneFileSuccessed,
    onOneFileErrored,
    onOneFileGotFromInput,
    is_notLoadValWhenFirstInit,
    onRandomStateChanged,
    whatKindOfImg = "plan",
    isToRandomDb,
    is_ComparingImgDataWhenRandom = true,
    is_removeAllBefore = false
}) => {

    const curFileTypes = fileTypes ? fileTypes : defaultFileTypes
    const refInputFile = createRef()
    const [filesList, setFilesList] = useState({})
    const filesStatusList_ref = useRef({})

    const is_firstInit = useRef(true)

    // const currentLoadService = loadService ? loadService : imgService.loadRandomImg
    const currentLoadService = loadService ? loadService : imgService.loadImg


    const {
        checkIsRandomStateResolved_AND_resolveIfNot,
        loadToCompare
    }
        = useRandomStateHandler({
            reactComponentName: "useImgsUploader",
            componentName: name,
            randomState,
            is_ComparingByStringifyDataWhenRandom: is_ComparingImgDataWhenRandom,
            onNewRandomStateDetected: (data, resolveRandomState) => {
                const toFileList = {}
                filesStatusList_ref.current = {}
                if (!mySuperValidator.isEmptyDetecter(data)) {



                    for (const myLink of data) {
                        const fileId = Date.now() + Math.random() + myLink
                        toFileList[fileId] = { url: myLink, status: useImgsUploader_LOADING_STATUS.success }
                        filesStatusList_ref.current[fileId] = {}


                        filesStatusList_ref.current[fileId].mayBeBlobData = myLink

                        filesStatusList_ref.current[fileId].status = useImgsUploader_LOADING_STATUS.success
                        filesStatusList_ref.current[fileId].linkForForm = myLink
                    }


                }

                loadToCompare({ ...toFileList })
                setFilesList(prev => ({ ...toFileList }))
                if (onRandomStateChanged) onRandomStateChanged(data, toFileList)

            },
            isDebug: true
        })

    const uploadTo = (f_obj) => {
        console.log("------upload", f_obj.file.name);

        if (onOneFileBeforeUpload) onOneFileBeforeUpload(filesStatusList_ref.current[f_obj.fileId])

        currentLoadService({ file: f_obj.file, type: whatKindOfImg, isToRandomDb })
            .then(async (data) => {

                filesStatusList_ref.current[f_obj.fileId].status = useImgsUploader_LOADING_STATUS.success
                filesStatusList_ref.current[f_obj.fileId].linkForForm = data
                const fl = { ...filesList }
                fl[f_obj.fileId].status = useImgsUploader_LOADING_STATUS.success
                setFilesList(prev => fl)
                if (onOneFileSuccessed) onOneFileSuccessed(filesStatusList_ref.current[f_obj.fileId])
            })
            .catch((data) => {

                console.log("-------catch loaded ", f_obj.file.name, data);
                filesStatusList_ref.current[f_obj.fileId].status = useImgsUploader_LOADING_STATUS.error
                filesStatusList_ref.current[f_obj.fileId].linkForForm = ""
                const fl = { ...filesList }
                fl[f_obj.fileId].status = useImgsUploader_LOADING_STATUS.error
                setFilesList(prev => fl)
                if (onOneFileErrored) onOneFileErrored(filesStatusList_ref.current[f_obj.fileId])

            })



    }



    const createImgObjList = (currentfiles) => {

        const files = currentfiles
        if (files.length === 0) return
        if (is_removeAllBefore) {
            filesStatusList_ref.current = {}
        }

        const files_urls = {}

        for (const file of files) {
            if (!curFileTypes.includes(file.type)) {
                continue

            }

            const newFile = new File([file], file.name, { type: file.type })
            const blobUrl = URL.createObjectURL(file)
            const fileId = Date.now() + Math.random() + file.name
            const fileObj = { file: newFile, fileId, mayBeBlobData: blobUrl, linkForForm: 0, status: useImgsUploader_LOADING_STATUS.toUpload }
            files_urls[fileId] = { url: blobUrl, status: useImgsUploader_LOADING_STATUS.toUpload }
            filesStatusList_ref.current[fileId] = fileObj
            if (onOneFileGotFromInput) onOneFileGotFromInput(fileObj)
        }
        refInputFile.current.value = null
        let prevState = filesList
        if (is_removeAllBefore) {
            prevState = {}

        }
        setFilesList(prev => ({ ...prevState, ...files_urls }))

    }

    useEffect(() => {
        const tmp = filesList

        const tmp_flag = !checkIsRandomStateResolved_AND_resolveIfNot(filesList)
        if (tmp_flag) return

        const alreadyLoadedFiles = []

        Object.keys(filesStatusList_ref.current).map(key => {
            const f_obj = filesStatusList_ref.current[key]
            if (f_obj.status === useImgsUploader_LOADING_STATUS.toUpload) {
                f_obj.status = useImgsUploader_LOADING_STATUS.pending
                uploadTo(f_obj)
            } else
                if (f_obj.status === useImgsUploader_LOADING_STATUS.success) {
                    alreadyLoadedFiles.push(f_obj.linkForForm)
                }
        })
        if (loadValToForm) {

            if (name) loadValToForm({ [name]: alreadyLoadedFiles })
            else loadValToForm(alreadyLoadedFiles)

        }


    }, [filesList])


    const handlerDeleteImg = (fileId, file_obj) => {

        if (!filesStatusList_ref.current?.[fileId]) {
            console.log("error: useImgsUploader -> handlerDeleteImg");
            return
        }
        if (filesStatusList_ref.current[fileId]?.mayBeBlobData) {
            URL.revokeObjectURL(filesStatusList_ref.current[fileId]?.mayBeBlobData)
        }
        delete filesStatusList_ref.current[fileId]
        if (filesList?.[fileId]) {

            const updatedFilesList = filesList
            delete updatedFilesList[fileId]

            setFilesList(prev => ({ ...updatedFilesList }))
        }
    }


    useEffect(() => {
        is_firstInit.current = false
    }, [])

    return {
        refInputFile,
        filesList,
        createImgObjList,
        handlerDeleteImg,
        curFileTypes,
        filesStatusList_ref
    }
}
