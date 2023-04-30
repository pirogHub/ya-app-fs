import { useModalWindow } from "../../../../providers/modalWindow/modalWindowProvider"

import "./WarningWrapper.scss"
import Loader from "../../../../components/ui/Loader/Loader"

export const useShowUploadLoading = () => {
    const { loadContentToFull, handleCloseModal } = useModalWindow()

    const showUploadLoading = () => loadContentToFull({
        content: <div className="AddOfferPage__loader-wrapper">
            <div className="loader-content">
                <Loader />
            </div>
        </div>,
        canClose: false
    }
    )


    return [showUploadLoading, handleCloseModal]
}
