import React from "react";

import "./ContentCard.scss"


const ContentCard = ({ isWrapper, title, children, isInRow, isTitleRight = false }) => {


    return (

        <div className={"ContentCard" + (isInRow ? " inRow" : "")}>
            {title && !isTitleRight && <h2 className="ContentCard__title">{title}</h2>}
            {isWrapper
                ? <div className="ContentCard__wrapper">
                    {children}
                </div>
                : <> {children}</>
            }
            {title && isTitleRight && <h2 className={"ContentCard__title" + (isTitleRight ? " right" : "")}>{title}</h2>}
        </div>
    )
}

export default ContentCard