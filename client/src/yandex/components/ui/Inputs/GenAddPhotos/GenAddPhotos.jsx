import React, { useEffect } from "react";
import PhotoCard from "../../../Cards/photoCard/photoCard";
import { useModalWindow } from "../../../../providers/modalWindow/modalWindowProvider"


import WindowForDrugAndDrop from "../../../../providers/modalWindow/components/windowForDrugAndDrop/windowForDrugAndDrop";
import { useDragNDrop } from "../../../../providers/dragNDropProvider/dragNDropProvider";
import { useImgsUploader } from "../../../../hooks/useImgsUploader/useImgsUploader"

import "./GenAddPhotos.scss"
import InputFilesHidden from "../InputFilesHidden/InputFilesHidden";
import FormRow from "../../../FormComponents/FormRow";

const fileTypes = ["image/jpeg", "image/pjpeg", "image/gif", "image/png", "image/x-png", "image/webp"]

const GenAddPhotos = ({ name, loadValToForm, randomState, errorsState, guideLabel }) => {

    const {
        refInputFile,
        filesList,
        createImgObjList,
        handlerDeleteImg,
        curFileTypes,
        filesStatusList_ref
    } = useImgsUploader({
        name,
        loadValToForm,
        randomState,
        whatKindOfImg: "photo"
    })

    const dragNDrop = useDragNDrop()
    // const modalWindow = useModalWindow()
    let isSetWindowForDragAndDrop = false


    const handlerOnDrop = (e) => {
        const files = dragNDrop.handleOnDrop(e)
        if (files) createImgObjList(files)
    }

    useEffect(() => {
        document.ondrop = (e) => {
            //  modalWindow.handleCloseModal(); 
            handlerOnDrop(e)
        }
        document.ondragover = (e) => dragNDrop.ignoreOnDragOver(e)
        document.ondragenter = (e) => {
            e.stopPropagation()
            e.preventDefault()
            // if (!isSetWindowForDragAndDrop) {
            // modalWindow.loadContentToFull(<WindowForDrugAndDrop onDropHandler={() => { modalWindow.handleCloseModal(); handlerOnDrop(e) }} />, "0px")
            // isSetWindowForDragAndDrop = true
            // }
        }
        // document.ondragend = () => modalWindow.handleCloseModal()
    }, [])



    return (
        // <FormRow errorsState={errorsState}>
        <div>


            <p>
                {guideLabel ? guideLabel : "Сфотографируйте комнату, кухню, санузел, коридор, балкон, вид из окна, фасад здания, подъезд. Не используйте скриншоты. Максимум 30 фото до 10 Мбайт"}
            </p>

            <div className={"photosContainer__wrapper"}>
                <div className="photosContainer" >

                    {
                        filesList && filesStatusList_ref.current
                            ? Object.keys(filesList).map((fileId) => {
                                if (filesList?.[fileId] && filesStatusList_ref.current?.[fileId]) {
                                    const myLink = filesList?.[fileId]?.url
                                    const mayBeBlobData = filesStatusList_ref.current?.[fileId]?.mayBeBlobData

                                    return <PhotoCard
                                        little={true}
                                        key={fileId}
                                        fileId={fileId}
                                        fileObj={filesStatusList_ref.current?.[fileId]}
                                        status={filesList?.[fileId]?.status}
                                        url={mayBeBlobData}
                                        myLink={myLink}
                                        deleteHandler={handlerDeleteImg}
                                    />


                                } else {
                                    return <></>
                                }

                            })
                            : <></>
                    }


                </div>
            </div>

            <div
                onDrop={handlerOnDrop}
                onDragOver={dragNDrop.ignoreOnDragOver}
                onClick={() => refInputFile.current.click()}
                className={"PhotosDrugDrop" + (filesList.length ? " PhotosDrugDrop__little" : "")}>

                <button className="btn btn-yellow relative" type="button">
                    <InputFilesHidden
                        refInputFile={refInputFile}
                        onChange={(e) => createImgObjList(e.target.files)}
                        multiple={true}
                        accept="image/jpeg,image/pjpeg,image/gif,image/png,image/x-png,image/webp"
                    // accept={curFileTypes.join(",")}
                    />
                    Выберите фотографии
                </button>
                <button className="btn btn-clean">или перетащите в область</button>
            </div>

        </div>
        // {/* </FormRow> */}
    )
}

export default GenAddPhotos