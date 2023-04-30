import React, { useEffect, useState } from "react";

import "./AvatarComponent.scss"
import Button from "../../../../components/ui/Button/Button";
import InputFilesHidden from "../../../../components/ui/Inputs/InputFilesHidden/InputFilesHidden";
import { useImgsUploader, useImgsUploader_LOADING_STATUS } from "../../../../hooks/useImgsUploader/useImgsUploader";
import userService from "../../../../services/user.service";
import { useDispatch } from "react-redux";
import { ERROR_TYPES, setError } from "../../../../store/errors";
import Loader from "../../../../components/ui/Loader";


const StatusShowSuccess = <div className={"PhotoCard__loadingStatus PhotoCard__loadingStatus_Success"} >
    <img
        className="PhotoCard__loadingStatus loadingSuccess"
        // src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png" 
        src="https://top-fon.com/uploads/posts/2023-01/1674885510_top-fon-com-p-znachki-dlya-prezentatsii-bez-fona-106.png"
    />
</div>


const StatusLoading = <div className={"PhotoCard__loadingStatus PhotoCard__loadingStatus_Loading"} >
    <Loader />
</div>


const StatusError = <div className={"PhotoCard__loadingStatus PhotoCard__loadingStatus_Error"} >
    <div>Error</div>
</div>


const StatusShowedSuccess = <></>


const StatusComponent = ({ status }) => {

    const [localStatus, setLocalStatus] = useState(status)

    useEffect(() => {
        let if_statusAlreadyShowed = localStatus === "toEndShowSuccess" && status === useImgsUploader_LOADING_STATUS.success ? "toEndShowSuccess" : status
        setLocalStatus(if_statusAlreadyShowed)
    }, [status])

    switch (localStatus) {
        case useImgsUploader_LOADING_STATUS.pending:
        case useImgsUploader_LOADING_STATUS.toUpload:
            return StatusLoading

        case "toEndShowSuccess":
            return StatusShowedSuccess
        case useImgsUploader_LOADING_STATUS.success:

            setTimeout(() => {
                setLocalStatus(prev => "toEndShowSuccess")
            }, 3000)

            return StatusShowSuccess


        case useImgsUploader_LOADING_STATUS.error:
            return StatusError
        case useImgsUploader_LOADING_STATUS.none:
            return <></>
        default:
            return StatusLoading
    }
}







const AvatarComponent = ({ isAuthUserPage, avatarLink }) => {

    const dispatch = useDispatch()
    const [avatarUrl, setAvatarUrl] = useState(avatarLink)
    // const [avatarUrl, setAvatarUrl] = useState(`https://ui-avatars.com/api/?background=fff&color=000&name=df`)
    const [status, setStatus] = useState(useImgsUploader_LOADING_STATUS.none)

    const {
        refInputFile,
        filesList,
        createImgObjList,
        handlerDeleteImg,
        curFileTypes,
        filesStatusList_ref
    } = useImgsUploader({
        is_removeAllBefore: true,
        loadService: userService.patchAvatar,
        onOneFileGotFromInput: () => setStatus(prev => useImgsUploader_LOADING_STATUS.pending),
        onOneFileBeforeUpload: () => setStatus(prev => useImgsUploader_LOADING_STATUS.pending),
        onOneFileSuccessed: (fileObj) => {
            setStatus(useImgsUploader_LOADING_STATUS.success)
            setAvatarUrl(fileObj?.linkForForm)
            dispatch(setError({ message: "Аватарка обновлена успешно!", errorType: ERROR_TYPES.VALID }))

        },
        onOneFileErrored: () => {
            setStatus(useImgsUploader_LOADING_STATUS.error)
            setTimeout(() => {
                setStatus(useImgsUploader_LOADING_STATUS.none)
            }, [2000])
            dispatch(setError({ message: "Ошибка, повторите позже.", errorType: ERROR_TYPES.ERROR }))
        },
    })

    const removeAvatar = async () => {
        setStatus(prev => useImgsUploader_LOADING_STATUS.pending)
        let isRemoved = avatarUrl
        isRemoved = await userService.removeAvatar()

        if (!isRemoved) {
            dispatch(setError({ message: "Аватарка удалена успешно!", errorType: ERROR_TYPES.VALID }))
        } else {
            dispatch(setError({ message: "Ошибка, повторите позже.", errorType: ERROR_TYPES.ERROR }))
        }
        setStatus(prev => useImgsUploader_LOADING_STATUS.none)
        setAvatarUrl(isRemoved)
    }

    useEffect(() => {
        const tmp = avatarUrl

    }, [avatarUrl])


    return (
        <div className="UserAvatar-wrapper">
            <div className="UserAvatar_img_wrapper">
                <img className="UserAvatar__avatar" src={avatarUrl ? avatarUrl : ""} alt="" />
                <div className={"UserAvatar__loadingStatus"
                    + (status === useImgsUploader_LOADING_STATUS.pending ? " loading" : "")
                }>
                    <StatusComponent status={status} />
                </div>
            </div>
            {isAuthUserPage &&
                <div className="UserAvatar__actions__wrapper">

                    <Button
                        onClick={() => refInputFile.current.click()}
                        className="btn btn-gray-outline"
                    >

                        <InputFilesHidden
                            refInputFile={refInputFile}
                            onChange={(e) => createImgObjList(e.target.files)}
                            // multiple={false}
                            accept="image/jpeg,image/pjpeg,image/gif,image/png,image/x-png,image/webp"
                        />
                        {avatarUrl
                            ? " Поменять аватарку"
                            : "Загрузить аватарку"}
                    </Button>

                    {
                        avatarUrl
                        &&
                        <Button
                            onClick={removeAvatar}
                            className="btn btn-gray-outline"
                            label="Удалить аватарку"
                        />
                    }
                </div>
            }
        </div>
    )
}


export default AvatarComponent