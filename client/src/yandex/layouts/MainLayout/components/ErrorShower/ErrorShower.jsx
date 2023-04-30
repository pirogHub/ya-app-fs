import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ERROR_TYPES, getErrors, removeError } from "../../../../store/errors";
import { useRef } from "react";
import { useEffect } from "react";


import "./ErrorShower.scss"

const notificationConfig = {
    valid: { icon: 'fa-circle-check', class: 'NotificationValid' },
    error: { icon: 'fa-circle-xmark', class: 'NotificationError' },
    warning: { icon: 'fa-circle-exclamation', class: 'NotificationWarning' },
}


const OneNotification = ({
    text,
    timeout,
    removeFromStore,
    errorType
}) => {

    let configKey = "error"
    if (errorType === ERROR_TYPES.WARNING) configKey = "warning"
    if (errorType === ERROR_TYPES.VALID) configKey = "valid"
    const config = notificationConfig[configKey]


    const refDiv = useRef()

    useEffect(() => {
        // refDiv.current
    }, [])

    const removingFunc = () => {
        setTimeout(() => {
            refDiv.current?.classList?.remove('Notification-show')
            refDiv.current?.classList?.add('Notification-hide')
            setTimeout(() => {
                removeFromStore()
            }, 300)
        }, timeout);
    }

    return (
        <div
            ref={refDiv}
            className={"Notification Notification-show " + config.class}>
            <i className={"fa-solid " + config.icon}></i>
            <p>{text}</p>
            {removingFunc()}
        </div>
    )
}

let forErrorRemoving = []

const ErrorShower = ({ }) => {

    const errors = useSelector(getErrors())
    const dispatch = useDispatch()
    // const [forErrorRemoving, setForErrorRemoving] = useState([])

    const removeFromStore = (e) => {
        if (forErrorRemoving.includes(e)) setTimeout(() => {

            forErrorRemoving = forErrorRemoving.filter(i => i !== e)
            dispatch(removeError(e))
        }, 100)

    }


    return (
        <div className="ErrorShower__wrapper">
            {
                !!errors?.length &&
                errors.map(e => {
                    if (!forErrorRemoving.includes(e)) {
                        forErrorRemoving.push(e)

                        return <OneNotification
                            key={e.key}
                            text={e.message}
                            timeout={5000}
                            errorType={e.errorType}
                            removeFromStore={() => removeFromStore(e)}
                        />
                    } else return <></>
                })

            }
            {/* <OneNotification
                text={e.message}
                timeout={3000}
                errorType={e.type}
                removeFromStore={() => removeError(e)}
            /> */}
        </div>
    )

}

export default ErrorShower