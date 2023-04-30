import React from "react";
import AddContent from "../../../../components/add/AddContent";
import ContentColLeft from "../ContentColLeft";
import ContentColRight from "../ContentColRight";

import "./Content.scss"

const Content = ({ children, leftCol, rightCol }) => {


    return (

        <div className="Content__columns">
            <ContentColLeft>
                {leftCol ? leftCol : children}
            </ContentColLeft>

            <ContentColRight>
                {rightCol ? rightCol : <AddContent />}
            </ContentColRight>
        </div>
    )
}

export default Content