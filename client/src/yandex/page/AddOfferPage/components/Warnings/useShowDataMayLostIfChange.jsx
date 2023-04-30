











import { useHistory } from "react-router-dom"
import Button from "../../../../components/ui/Button"
import { useModalWindow } from "../../../../providers/modalWindow/modalWindowProvider"

import "./WarningWrapper.scss"

const ContentWarning = ({ handleCloseModal, funcIfYes, funcIfNot, whatChanged_forPeople }) => {

    return <div className="WarningWrapper">
        <div>Если вы измените категорию, то все введённые данные не сохранятся.</div>
        <div>{`Вы уверены, что хотите поменять ${whatChanged_forPeople} объявления?`}</div>
        <Button
            onClick={() => {
                // localClearForm({ withFormHandlerClearer: true })
                funcIfYes()
                handleCloseModal()
            }}
            className={"btn btn-yellow"}
            label={"Да, меняю категорию"}
        />
        <Button
            onClick={() => {

                funcIfNot()
                handleCloseModal()
            }}
            className={"btn btn-green"}
            label={"Нет, закончу это объявление"}
        />
    </div>
}


export const useShowDataMayLostIfChange = () => {
    const history = useHistory()
    const { loadContentToFull, handleCloseModal } = useModalWindow()


    const showDataMayLostIfChange = ({
        isTypeChanged,
        isCategoryChanged,
        funcIfYes,
        funcIfNot }) => {
        const whatChanged_forPeople = isTypeChanged ? "тип" : "категорию"
        loadContentToFull({
            content: <ContentWarning whatChanged_forPeople={whatChanged_forPeople} handleCloseModal={handleCloseModal} funcIfYes={funcIfYes} funcIfNot={funcIfNot} />,
            canClose: false
        })
    }


    return [showDataMayLostIfChange, handleCloseModal]
}
