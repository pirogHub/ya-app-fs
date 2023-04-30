import React, { useEffect } from "react";
import HomeHeader from "../HomePage/components/HomeHeader";
import OfferContent from "./components/offerContent";
import Content from "../../layouts/MainLayout/components/Content";



const OfferPage = (props) => {

    return (
        <>
            {/* <HomeHeader /> */}
            <Content>
                <OfferContent
                    {...props}
                />
            </Content>
        </>
    )
}

export default OfferPage