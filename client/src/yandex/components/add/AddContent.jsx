import React from "react";
import AddContainer from "./AddContainer";
import "./AddContent.scss"
const AddContent = () => {


    return (
        <div className="AddContent">
            <AddContainer img={undefined} name={"Oaks"} price={"5 mln"} />
            <AddContainer img={undefined} name={"Oaks"} price={"5 mln"} />
        </div>
    )
}

export default AddContent