import { useHistory } from "react-router-dom"
import Button from "../../../../components/ui/Button"
import { useModalWindow } from "../../../../providers/modalWindow/modalWindowProvider"

import "./WarningWrapper.scss"

const ContentError = ({ handleCloseModal }) => {
    const history = useHistory()
    return (
        <div className="WarningWrapper">
            <div>
                <div> К сожалению, сейчас сервер очень загружен. </div>
                <div> Но ваше объявление сохранено в локальной памяти Вашего браузера!</div>
                <div> Поэтому, когда вы зайдете сюда позже, вы увидите это объявление и сможете его загрузить,</div>
                <div>    нажав кнопку опубликовать</div>
            </div>
            <Button
                onClick={() => {
                    history.push('/auth')
                    handleCloseModal()
                }}
                className={"btn btn-yellow"}
                label={"Ок! Понятно!"}
            />
        </div>

    )
}

export const useShowUploadError = () => {
    const history = useHistory()
    const { loadContentToFull, handleCloseModal } = useModalWindow()

    const showUploadError = () => loadContentToFull({
        content: <ContentError handleCloseModal={handleCloseModal} />,
        canClose: () => history.push('/auth')
    })


    return [showUploadError, handleCloseModal]
}
