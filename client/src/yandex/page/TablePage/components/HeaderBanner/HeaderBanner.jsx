import React, { useEffect, useRef } from "react";

import "./HeaderBanner.scss"
import ImageLoader from "../../../../components/ImageLoader";

const HeaderBanner = ({ bannerSizeWhenImgLoading, bannerLink, children }) => {

    // console.log("HeaderBanner bannerLink", bannerLink);
    const refBanner = useRef()
    const onLoaded = () => {
        refBanner.current.classList.add("notBlured")
    }
    return (
        <div
            ref={refBanner}
            className="HeaderBanner"
            style={{ minHeight: (bannerSizeWhenImgLoading ? `${bannerSizeWhenImgLoading}px` : "auto") }}

        >
            <div className="HeaderBanner__shadower"></div>

            <ImageLoader
                className="HeaderBanner__img"
                link={bannerLink}
                onLoaded={onLoaded}
            >
                {children}
            </ImageLoader>
        </div>
    )
}

export default HeaderBanner