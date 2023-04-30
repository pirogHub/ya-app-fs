import { createRef, useEffect, useRef } from "react";


export const useInfScrollObserver = ({
    conditionFunc,
    actionFunc,
    on_atStartOfActionInSight
}) => {

    const item_ref = createRef();
    const observerLoader_ref = useRef();

    const actionInSight = (entries) => {

        const flag = conditionFunc ? conditionFunc() : true
        if (entries[0].isIntersecting && flag) {
            if (on_atStartOfActionInSight) on_atStartOfActionInSight()
            actionFunc()
        } else {

        }
    }

    useEffect(() => {

        if (observerLoader_ref.current) {
            observerLoader_ref.current.disconnect()
        }
        observerLoader_ref.current = new IntersectionObserver(actionInSight, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });
        if (item_ref.current) {

            observerLoader_ref.current.observe(item_ref.current)
        }
    }, [item_ref])



    return [item_ref, observerLoader_ref]
}