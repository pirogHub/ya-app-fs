import React, { useState } from "react";

import { YMaps, Map, Placemark, SearchControl, GeolocationControl, ZoomControl } from "@pbe/react-yandex-maps";

import "./myMap.scss"

const BallonHeader = ({ offerTitle, userId, priceLabel, fistImg, author }) => {
    //     return `
    //     <div class="balloon__header">
    //     <span class="balloon__header_offerTitle">${offerTitle}</span>
    // <span class="balloon__header_author">Продавец:<a href="/user/${userId}"> ${author?.userName}</a></span>
    // </div>
    // `
}

const BallonBody = ({ offerTitle, priceLabel, fistImg, author }) => {
    //     return `

    //     <img src="https://mykaleidoscope.ru/uploads/posts/2021-03/1615552544_48-p-kvartira-v-neboskrebe-52.jpg" alt="Loading..." height="150" width="200"> <br/> 
    //     <div class="balloon__body_price">Цена: ${priceLabel}</div> 

    // `
}

const BallonFooter = ({ addressFixedCoords, addressTitle, offerTitle, priceLabel, fistImg, author }) => {
    // const coord0 = address.coords[0].toFixed(6)
    // const coord1 = address.coords[1].toFixed(6)
    // return `
    // <div class="balloon__footer">
    // <span class="balloon__footer_addressTitle">${addressTitle === "random" ? "" : `${addressTitle}`}</span>
    // </div>
    // `
    // <span class="balloon__footer_coords"> [${addressFixedCoords?.[0]}, ${addressFixedCoords?.[1]}]</span>
}
const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
    width: "100%",
    height: "100%",
};

const geolocationOptions = {
    defaultOptions: { maxWidth: 128 },
    defaultData: { content: "Determine" },
};
const MyMap = ({ address, userId, handleIsMapLoaded, addressTitle, addressFixedCoords, offerTitle, priceLabel, fistImg, author }) => {

    // const [zoom, setZoom] = useState(9);

    // const title = address?.title ? address.title : ""
    // const coords = address?.address ? address.address : [55.747, 37.57]



    // return (
    //     <>
    //         <YMaps>

    //             <Map
    //             // width="100%"
    //             // height="400px"
    //             // className="orderMap"
    //             // defaultState={{
    //             //     // center: coords, //
    //             //     center: [55.747, 37.57], //
    //             //     zoom: 10,
    //             //     controls: ['zoomControl']
    //             // }}
    //             // modules={['control.ZoomControl']}
    //             >
    //                 <SearchControl />




    //             </Map>

    //         </YMaps>
    //     </>

    // )

    return (
        <YMaps query={{ apikey: "29294198-6cdc-4996-a870-01e89b830f3e", lang: "ru_RU" }}>
            <Map
                {...mapOptions}
                state={{ center: [55.749451, 37.542824], zoom: 12 }}
            // onLoad={setMapConstructor}
            // onBoundsChange={handleBoundsChange}
            // instanceRef={refMap}
            >

                <GeolocationControl {...geolocationOptions} />
                <ZoomControl />
            </Map>
        </YMaps>
    )
};

export default MyMap