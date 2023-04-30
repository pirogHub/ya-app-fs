import React from "react";

import { YMaps, Map, SearchControl, Placemark } from "@pbe/react-yandex-maps";
import mySuperValidator from "../../../../utils/mySuperValidator";

import "./MyMapYa.scss"


const BallonHeader = ({ offerTitle, userId, priceLabel, firstImg, author }) => {
    return `
         <div class="balloon__header">
         <span class="balloon__header_offerTitle">${offerTitle}</span>
     <span class="balloon__header_author">Продавец:<a href="/user/${userId}"> ${author?.userName}</a></span>
     </div>
     `
}

const BallonBody = ({ offerTitle, priceLabel, firstImg, author }) => {
    return `

       
         <img src="${firstImg}" alt="Loading..." height="150" width="200"> <br/> 
         <div class="balloon__body_price">Цена: ${priceLabel}</div> 

     `
    //  <img src="https://mykaleidoscope.ru/uploads/posts/2021-03/1615552544_48-p-kvartira-v-neboskrebe-52.jpg" alt="Loading..." height="150" width="200"> <br/> 
}

const BallonFooter = ({ coords, addressTitle, offerTitle, priceLabel, firstImg, author }) => {
    const coord0 = (coords?.[0])
    const coord1 = (coords?.[1])
    return `
     <div class="balloon__footer">
     <span class="balloon__footer_addressTitle">${addressTitle === "random" ? "" : `${addressTitle}`}</span>
     </div>
     `
    //  <span class="balloon__footer_coords"> [${addressFixedCoords?.[0]}, ${addressFixedCoords?.[1]}]</span>
}




const MyMapYa = ({
    address,
    userId,
    handleIsMapLoaded,
    addressTitle,
    addressFixedCoords,
    offerTitle,
    priceLabel,
    firstImg,
    author
}) => {


    const coords = !mySuperValidator.isEmptyDetecter(address?.coords) ? address.coords : [55.747, 37.57]

    return <YMaps>


        <Map
            width="100%"
            height="400px"
            className="orderMap"
            defaultState={{ center: coords, zoom: 9 }}
        >

            <SearchControl />
            <Placemark
                modules={['geoObject.addon.balloon']}
                defaultGeometry={coords}
                properties={{


                    balloonContentHeader: BallonHeader({ offerTitle, priceLabel, firstImg, author, userId }),

                    balloonContentBody: BallonBody({ offerTitle, priceLabel, firstImg, author }),

                    balloonContentFooter: BallonFooter({ addressTitle, coords, offerTitle, priceLabel, firstImg, author }),

                    iconContent: "Нажми на меня",
                }}
                options={{

                    iconColor: '#ff0000',
                    fillImageHref: firstImg,
                    preset: "islands#redStretchyIcon"
                }}
            />
        </Map>

    </YMaps>

}

export default MyMapYa