import React from "react";


import { YMaps, Map, SearchControl, Placemark } from "@pbe/react-yandex-maps";
import mySuperValidator from "../../utils/mySuperValidator";

const BallonHeader = ({ offerTitle, userId, priceLabel, fistImg, author }) => {
    return `
         <div class="balloon__header">
         <span class="balloon__header_offerTitle">${offerTitle}</span>
     <span class="balloon__header_author">Продавец:<a href="/user/${userId}"> ${author?.userName}</a></span>
     </div>
     `
}

const BallonBody = ({ offerTitle, priceLabel, fistImg, author }) => {
    return `

         <img src="https://mykaleidoscope.ru/uploads/posts/2021-03/1615552544_48-p-kvartira-v-neboskrebe-52.jpg" alt="Loading..." height="150" width="200"> <br/> 
         <div class="balloon__body_price">Цена: ${priceLabel}</div> 

     `
}

const BallonFooter = ({ coords, addressTitle, offerTitle, priceLabel, fistImg, author }) => {
    const coord0 = (coords?.[0])
    const coord1 = (coords?.[1])
    return `
     <div class="balloon__footer">
     <span class="balloon__footer_addressTitle">${addressTitle === "random" ? "" : `${addressTitle}`}</span>
     </div>
     `
    //  <span class="balloon__footer_coords"> [${addressFixedCoords?.[0]}, ${addressFixedCoords?.[1]}]</span>
}




const TestMaps = ({ address, userId, handleIsMapLoaded, addressTitle, addressFixedCoords, offerTitle, priceLabel, fistImg, author }) => {


    const coords = !mySuperValidator.isEmptyDetecter(address?.coords) ? address.coords : [55.747, 37.57]

    return <YMaps>


        <Map defaultState={{ center: coords, zoom: 9 }} >

            <SearchControl />
            <Placemark
                modules={['geoObject.addon.balloon']}
                defaultGeometry={coords}
                properties={{


                    balloonContentHeader: BallonHeader({ offerTitle, priceLabel, fistImg, author, userId }),

                    balloonContentBody: BallonBody({ offerTitle, priceLabel, fistImg, author }),

                    balloonContentFooter: BallonFooter({ addressTitle, coords, offerTitle, priceLabel, fistImg, author }),

                    iconContent: "Нажми на меня",
                }}
                options={{

                    iconColor: '#ff0000',
                    fillImageHref: "https://novostroyki.shop/wp-content/uploads/2021/01/754678198272065.jpeg",
                    preset: "islands#redStretchyIcon"
                }}
            />
        </Map>

    </YMaps>

}

export default TestMaps