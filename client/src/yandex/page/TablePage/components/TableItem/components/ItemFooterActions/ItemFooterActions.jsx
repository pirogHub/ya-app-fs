import { useEffect, useRef, useState } from "react"
import "./ItemFooterActions.scss"
import Button from "../../../../../../components/ui/Button/Button"

const ItemFooterActions = ({ tel }) => {
    const [state, setState] = useState("Показать Телефон")



    return (
        <div className="footer__actions">
            <button
                className="btn btn-yellow"
                onClick={() => state === tel ? setState("Показать Телефон") : setState(tel)}
            >
                {state}
            </button>
            <Button isDisabled={true} className="btn btn-gray">Избранное</Button>
        </div>
    )
}

export default ItemFooterActions