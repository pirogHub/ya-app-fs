import { useEffect, useRef } from "react"




export const useRandomStateHandler = ({
    reactComponentName,
    componentName,
    randomState,
    onNewRandomStateDetected,
    isDebug,
    is_ComparingByStringifyDataWhenRandom
}) => {



    const anti_FirstRender_data_forDataCompare_ref = useRef()
    const loadToCompare = (dataToCompare) => {
        anti_FirstRender_data_forDataCompare_ref.current = dataToCompare
    }
    const wasCompare_ref = useRef(true)

    // const refThatRandomStateInited = useRef(false)
    const refThatRandomStateInited = useRef(undefined)
    const refRandomPromise = useRef(undefined)

    useEffect(() => {



        const currentRandomState = componentName ? randomState?.[componentName]?.value : randomState?.value
        const currentPromise = componentName ? randomState?.[componentName]?.promise : randomState?.promise
        const isEqual = refThatRandomStateInited.current === currentRandomState
        if (currentRandomState && !isEqual) {
            if (is_ComparingByStringifyDataWhenRandom) wasCompare_ref.current = false
            // if (isDebug) console.log(`<${name}>`, "randomState  ", randomState, "-state", refThatRandomStateInited.current,);

            let data
            let tmpRandomState = componentName ? randomState[componentName] : randomState

            refThatRandomStateInited.current = tmpRandomState?.value


            // data = tmpRandomState?.value ? tmpRandomState?.value : notEmpty ? [optionsList[0].value] : []
            refRandomPromise.current = tmpRandomState?.promise

            onNewRandomStateDetected(tmpRandomState?.value, refRandomPromise.current)


        } else {

            console.log(componentName, "ALREADY randomState. randomState: ", randomState);
            currentPromise?.resolve()
        }

    }, [randomState])


    const checkIsRandomStateResolved_AND_resolveIfNot = (dataToCompare) => {
        if (is_ComparingByStringifyDataWhenRandom && !wasCompare_ref.current) {

            const toCompare = JSON.stringify(dataToCompare)
            const byCompare = JSON.stringify(anti_FirstRender_data_forDataCompare_ref.current)
            const isEqual = toCompare === byCompare
            if (!isEqual)
                return false
            wasCompare_ref.current = true
        }

        if (refRandomPromise.current) {
            // if (isDebug) logger({ functionName: "", action: "RESOLVE", prop: "randomState", data: "" })
            console.log("RESOLVE randomState");

            refRandomPromise.current?.resolve(componentName)
            refRandomPromise.current = undefined
            return false
        }
        return true
    }

    return {
        checkIsRandomStateResolved_AND_resolveIfNot,
        checkIsRandomStateResolvedOnly: () => refRandomPromise.current ? false : true,
        loadToCompare

    }
}