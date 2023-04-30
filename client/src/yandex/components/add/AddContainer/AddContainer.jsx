import React, { useState } from "react"

import "./AddContainer.scss"

const AddContainer = ({ img, name, price }) => {


    const [showAddSettings, setShowAddSettings] = useState(false)
    return (
        <div className={"AddContainer__wrapper" + (showAddSettings ? " onSettings" : "")}>


            <div
                className={"AddContainer__settingsToggler" + (showAddSettings ? " onSettings" : "")}
                onClick={showAddSettings ? () => setShowAddSettings(prev => false) : undefined}
            >
                <button
                    onClick={() => setShowAddSettings(prev => !prev)}
                    className="btn-clean toSettings"
                >
                    <i className="bi bi-three-dots-vertical defore-p-0"></i>
                </button>
            </div>




            <div
                className={"AddContainer__content-wrapper"}>
                {showAddSettings
                    &&
                    <div
                        className={"AddContainer__settings-wrapper"}
                    >

                        <ul className="AddContainer__settings">
                            <li>smth was ?</li>
                            <li>smth else</li>
                            <li>another</li>
                        </ul>
                    </div>

                }
                <div className={"AddContainer__content" + (showAddSettings ? " onSettings" : "")}>
                    <img src={img} height="153px" />
                    <div>{name}</div>
                    <div>{price}</div>
                    <button className="btn btn-add">lalala</button>
                </div>
            </div>

        </div>

    )
}

export default AddContainer