import React, { createRef, useEffect, useRef, useState } from "react";
// import OptionCard from "../../../page/offerAddPage/OptionCard";
// import imgService from "../../../services/img.service";
import PhotoCard from "../../../Cards/photoCard/photoCard";
import { useImgsUploader } from "../../../../hooks/useImgsUploader/useImgsUploader"
import AOoptionCard from "../../../Cards/AOoptionCard";

import "./GenAddPlanPhoto.scss"
import InputFilesHidden from "../InputFilesHidden/InputFilesHidden";

const AOaddPlanPhoto = ({ name, loadValToForm, randomState, isNotRequired }) => {

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
        whatKindOfImg: "plan"
    })

    const handleCallInputFileModal = () => {
        refInputFile.current.click()
    }

    return (
        <>
            {isNotRequired
                && <div className="AddPlanPhoto__isNotRequired__title">

                    *Необязательно для заполнения*

                </div>
            }
            <div className="photosContainer__wrapper">
                <div className="photosContainer" >
                    {
                        filesList && filesStatusList_ref.current
                            ? Object.keys(filesList).map((fileId) => {
                                if (filesList?.[fileId] && filesStatusList_ref.current?.[fileId]) {
                                    const myLink = filesList?.[fileId]?.url
                                    const mayBeBlobData = filesStatusList_ref.current?.[fileId]?.mayBeBlobData

                                    return <PhotoCard
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


                    {filesList.length < 4 || true
                        ? <>
                            <AOoptionCard
                                handler={handleCallInputFileModal}
                                className="Option_sizeBox_big board-dash"
                                label="Добавить планировку"
                                val="category-sell" />
                            <InputFilesHidden
                                refInputFile={refInputFile}
                                onChange={(e) => createImgObjList(e.target.files)}
                                multiple={true}
                                accept="image/jpeg,image/pjpeg,image/gif,image/png,image/x-png,image/webp"
                            // accept={curFileTypes}
                            />
                        </>
                        : ""}
                </div>

            </div>

        </>

    )
}

export default AOaddPlanPhoto