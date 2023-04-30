import { useHistory } from "react-router-dom"
import Button from "../../../../components/ui/Button"
import { useModalWindow } from "../../../../providers/modalWindow/modalWindowProvider"

import "./WarningWrapper.scss"

const ContentWarning = ({ handleCloseModal, uploadLoadingResult }) => {

    const history = useHistory()
    return <div className="WarningWrapper">
        <div> Объявление успешно создано и загружено!</div>
        <Button
            onClick={() => {
                // localClearForm({ withFormHandlerClearer: true })
                handleCloseModal()
            }}
            className={"btn btn-yellow"}
            label={"Создать новое?"}
        />
        <Button
            onClick={() => {
                history.push(`/offer${uploadLoadingResult}`)
                handleCloseModal()
            }}
            className={"btn btn-green"}
            label={"Посмотреть"}
        />
        <Button
            onClick={() => {
                history.push("/auth")
                handleCloseModal()
            }}
            className={"btn btn-lightBlue"}
            label={"Обратно в профиль"}
        />
    </div>
}


export const useShowUploadSuccessWarning = () => {
    const history = useHistory()
    const { loadContentToFull, handleCloseModal } = useModalWindow()


    const showUploadSuccessWarning = (uploadLoadingResult) => loadContentToFull({
        content: <ContentWarning handleCloseModal={handleCloseModal} uploadLoadingResult={uploadLoadingResult} />,
        canClose: false
    })


    return [showUploadSuccessWarning, handleCloseModal]
}



