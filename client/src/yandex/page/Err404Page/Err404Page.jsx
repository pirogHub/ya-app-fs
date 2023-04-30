import React from "react";
import { Link } from "react-router-dom";

import "./Err404Page.scss"

const Err404Page = () => {

    return <>
        <div className="Err404Page">
            <h1>Page not found</h1>
            <Link to="/"><button className="btn btn-yellow">Back to Home</button></Link>
        </div>
    </>
}

export default Err404Page