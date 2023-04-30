import React from "react"



import "./RightSideActions.scss"
import Button from "../../../../components/ui/Button"
import Randomizer from "../../../../components/FormComponents/Randomizer/Randomizer"
import ProgressCircle from "../../../../components/ui/ProgressCircle"
const RightSideActions = ({ progress, localClearForm, downloadAndSetSyntheticState, errorsState }) => {


    return (
        <div className="sticky-wrapper">
            <ProgressCircle
                progress={progress}
            />

            <Randomizer
                onClick={async () => {

                    localClearForm({ withDirectRefStateClear: true })
                    const [promises, ,] = await downloadAndSetSyntheticState()
                    return promises
                }}
            />

            <Button
                type="button"
                onClick={() => {

                    localClearForm({ withFormHandlerClearer: true })
                }}

                className="btn btn-red-outline"
                label="Сбросить всё"
            />

            <div>
                {JSON.stringify(errorsState)}
            </div>
        </div>
    )
}


export default RightSideActions