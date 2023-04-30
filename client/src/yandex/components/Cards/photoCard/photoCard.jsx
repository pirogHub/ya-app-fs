import React, { forwardRef, useEffect, useRef, useState } from "react";
import imgService from "../../../services/img.service";
import Loader from "../../ui/Loader/Loader";

import "./photoCard.scss"
import { useImgsUploader_LOADING_STATUS } from "../../../hooks/useImgsUploader/useImgsUploader";

const OneControl = ({ onClick, iconTag }) => {

    return (
        <div className="PhotoCard__one_controll_wrapper">
            <button type="button" onClick={onClick} className="PhotoCard__controll">
                {iconTag}
            </button>
        </div>
    )
}

const ControlsWrapper = ({ children }) => {

    return (
        <div className="PhotoCard__controlls_layer">
            <div className="PhotoCard__controlls_wrapper">
                {children}
            </div>
        </div>
    )
}


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
        let if_statusAlreadyShowed = localStatus === "toEndShowSuccess" ? "toEndShowSuccess" : status
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

        default:
            return StatusLoading
    }
}

const PhotoCard = ({ little, deleteHandler, status, url, fileObj, myLink, fileId }) => {





    return (
        <div
            className={"PhotoCard" + (little ? " PhotoCard__little" : "")}
        // draggable="true"
        >
            {/* <div className="PhotoCard__background" style={{ backgroundImage: `url(${url || ""})` }} ></div> */}
            <img className="PhotoCard_img" src={url ? url : myLink} />
            <div className={"PhotoCard__background-shadow" + (status === useImgsUploader_LOADING_STATUS.success ? " none" : "")} ></div>
            <StatusComponent status={status} />




            <ControlsWrapper>
                {/* <OneControl
                    onClick={handleSendFile}
                    iconTag={<i className="bi bi-arrow-counterclockwise"></i>} /> */}

                <OneControl
                    onClick={() => deleteHandler(fileId, fileObj)}
                    iconTag={<i className="bi bi-trash-fill"></i>} />

                {/* <OneControl
                    onClick={handleSearch}
                    iconTag={<i className="bi bi-search"></i>} /> */}

            </ControlsWrapper>
            <div className={"littleSuccess" + (status === useImgsUploader_LOADING_STATUS.success ? " show" : "")}> <img src="https://theappliances.in/wp-content/uploads/2022/02/check-mark-2048x2048.png" /> </div>






        </div >
    )
}

export default PhotoCard