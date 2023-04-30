import { useHistory } from "react-router-dom"
import Button from "../../../../components/ui/Button"


import "./WarningWrapper.scss"
import { useModalWindow } from "../../../../providers/modalWindow/modalWindowProvider"

const ContentEditWarning = ({ handleCloseModal }) => {
    const history = useHistory()

    return <div className="WarningWrapper">
        <div> {`Страница изменения Объявления еще не до конца готова :(`}</div>
        <Button
            onClick={() => {
                history.push('/auth')
                handleCloseModal()
            }}
            className={"btn btn-yellow"}
            label={"Назад в Профиль"}
        />
    </div>
}

export const useShowEditPageWarning = () => {
    const history = useHistory()
    const { loadContentToFull, handleCloseModal } = useModalWindow()

    const showEditPageWarning = () => loadContentToFull({
        content: <ContentEditWarning handleCloseModal={handleCloseModal} />,
        canClose: () => history.push('/auth')
    })


    return [showEditPageWarning, handleCloseModal]
}
