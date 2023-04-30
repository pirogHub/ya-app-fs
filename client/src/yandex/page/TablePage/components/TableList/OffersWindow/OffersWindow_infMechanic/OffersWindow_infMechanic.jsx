import { useRef } from "react"
import { useInfScrollObserver } from "../../../../../../hooks/useInfScrollObserver/useInfScrollObserver"
import { useEffect } from "react"



const OffersWindow_infMechanic = ({
    fetchingFunc,
    loadingStatus,
    loadingStatus_finishedKey,
    conditionFunc,
    is_alreadyInFetching_ref,
    is_blockFetching,
    is_blockFetching_setter
}) => {


    const last__IDX_of_current_itemObserved_ref = useRef()
    const last__IDX_of_old_itemObserved_ref = useRef()
    const last__isScrolled_to_OLD_itemObserved_ref = useRef(true)
    // const is_alreadyInFetching_ref = useRef()
    // const [is_blockFetching, set_is_blockFetching] = useState(false)

    const last__to_clear_refs = () => {
        last__IDX_of_current_itemObserved_ref.current = undefined
        last__IDX_of_old_itemObserved_ref.current = undefined
        last__isScrolled_to_OLD_itemObserved_ref.current = true
    }



    const [last__current_itemObserved_ref, last__observerLoader_current_itemObserver_ref] = useInfScrollObserver({
        conditionFunc: conditionFunc ? conditionFunc : () => true,
        on_atStartOfActionInSight: undefined,
        actionFunc: () => {

            if (is_alreadyInFetching_ref.current) return true
            if (!last__isScrolled_to_OLD_itemObserved_ref.current) {
                last__old_itemObserved_ref.current.scrollIntoView({ block: "center" })
                return true
            }
            if (is_blockFetching) return true
            is_alreadyInFetching_ref.current = true
            last__isScrolled_to_OLD_itemObserved_ref.current = false
            last__IDX_of_old_itemObserved_ref.current = last__IDX_of_current_itemObserved_ref.current
            if (fetchingFunc) fetchingFunc()

        }
    })


    const [last__old_itemObserved_ref, last__observerLoader_old_itemObserver_ref] = useInfScrollObserver({
        conditionFunc: () => true,
        on_atStartOfActionInSight: undefined,
        actionFunc: () => {

            if (is_alreadyInFetching_ref.current) return
            last__isScrolled_to_OLD_itemObserved_ref.current = true
            is_blockFetching_setter(prev => false)
        }
    })


    useEffect(() => {
        if (loadingStatus === loadingStatus_finishedKey) {
            is_alreadyInFetching_ref.current = false


            if (last__old_itemObserved_ref.current) {
                last__old_itemObserved_ref.current.scrollIntoView({ block: "center" })
            } else {
                last__isScrolled_to_OLD_itemObserved_ref.current = true
            }
        }

    }, [loadingStatus])







    return {
        last__observerLoader_current_itemObserver_ref,
        last__current_itemObserved_ref,
        last__IDX_of_current_itemObserved_ref,
        last__observerLoader_old_itemObserver_ref,
        last__IDX_of_old_itemObserved_ref,
        last__old_itemObserved_ref,
        last__to_clear_refs
    }
}

export default OffersWindow_infMechanic