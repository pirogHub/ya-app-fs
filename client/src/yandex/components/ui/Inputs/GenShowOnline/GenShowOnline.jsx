import React, { useEffect, useRef, useState } from "react";

import "./GenShowOnline.scss"

const GenShowOnline = ({ loadValToForm, name, randomState, isNotRequired }) => {

    const refInput = useRef()
    useEffect(() => {

        if (randomState) {
            if (Object.keys(randomState).length !== 0) {
                const { value, promise } =
                    randomState
                        ? name
                            ? randomState?.[name]
                            : randomState
                        : { value: refInput.current.checked, promise: () => { } }
                refInput.current.checked = value?.includes("showOnline") ? true : false

                if (Promise.prototype.isPrototypeOf(promise)) {
                    if (promise?.resolve) promise.resolve()
                }
            } else {
                refInput.current.checked = false
            }
        }

    }, [randomState])




    return (
        <>
            {isNotRequired
                && <div className="ShowOnline__isNotRequired__title">

                    *Необязательно для заполнения*

                </div>
            }

            <div className="ShowOnline__onlineShow">
                <h3>Возможен онлайн-показ</h3>
                <p>Выберите, если готовы показать объект онлайн с помощью сервисов видео‑звонков.</p>
                <div>
                    <label htmlFor="showOnline" className="ShowOnline__inputContainer">
                        <input
                            ref={refInput}
                            name="showOnline"
                            onChange={({ target }) => {
                                loadValToForm({ filters: target.checked ? ["showOnline"] : [] })
                            }
                            } type="checkbox" id="showOnline" /> Готовы показать онлайн</label>
                </div>
            </div>
        </>
    )
}

export default GenShowOnline