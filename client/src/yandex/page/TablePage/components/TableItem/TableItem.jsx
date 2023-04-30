import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import LittleCard from "../../components/Cards/LittleCard";
// import SmallSlider from "../../../components/Sliders/smallSlider/smallSlider";
import ItemDealInfo from "./components/ItemDealInfo";
import ItemGeneralInfo from "./components/ItemGeneralInfo";
import SmallSlider from "../../../../components/ui/Sliders/smallSlider/smallSlider";

import "./TableItem.scss"
import ItemMeta from "./components/ItemMeta";
import ItemAuthor from "./components/ItemAuthor";
import ItemPremiumFooter from "./components/ItemPremiumFooter/ItemPremiumFooter";
import ItemFooterActions from "./components/ItemFooterActions/ItemFooterActions";
import ItemFooter from "./components/ItemFooter";
import ItemDescription from "./components/ItemDescription";
import offerTransform from "../../../../utils/offerTransform";
import { useFetchUser } from "../../../../hooks/useFetchUser/useFetchUser";


const TableItem = forwardRef(({ offer, className, currentIdx }, ref) => {
    const { fetchUser } = useFetchUser()
    const [author, setAuthor] = useState()
    const [generalViewOffer, setGeneralViewOffer] = useState()
    const refIsAlreadyTransforming = useRef(false)
    useState(() => {
        let tmp = offer

        if (!generalViewOffer && !refIsAlreadyTransforming.current) {
            tmp = offerTransform.toGeneralView(offer.category, offer)
            refIsAlreadyTransforming.current = true

        }
        fetchUser(offer.userId, setAuthor)
        setGeneralViewOffer(tmp)
    }, [offer])

    if (!generalViewOffer) return <></>
    return (<>
        <div
            ref={ref}
            className={
                "TableItem"
                + (className ? ` ${className}` : "")
            }
        >
            <div className="left_part">
                <div className="index_wrapper">№:&nbsp;{currentIdx}</div>

                <SmallSlider
                    className="f-1"
                    images={generalViewOffer.imgPhotos}
                    // images={4}
                    // _id={offer?._id}
                    linkToOffer={generalViewOffer.linkToOffer}
                    bottomImgs_flag={true}
                />
            </div>
            <div className="building_info f-5">
                <div className="building_info_main">

                    <ItemGeneralInfo
                        linkToOffer={generalViewOffer.linkToOffer}
                        mainTitle={generalViewOffer.titles.mainTitle}
                        additionalTitle={generalViewOffer.titles.additionalTitle}
                        // category={offer?.category}
                        addressTitle={generalViewOffer.titles.addressTitle}
                    // builtYear={offer?.aboudBuilding?.year}
                    // area={offer?.aboutFlat?.area?.area_total}
                    // floorsCurrent={offer?.aboutFlat?.floors?.floor_total}
                    // foorsTotal={offer?.aboutFlat?.floors?.floor_current}
                    // totalRooms={offer?.aboutFlat?.rooms?.rooms_total[0]} 
                    />

                    <ItemDealInfo
                        area={generalViewOffer.totalArea}
                        // totalPrice={generalViewOffer?.priceDetails?.price}
                        pricePerMeterLabel={generalViewOffer?.priceDetails?.pricePerMeterLabel}
                        priceLabel={generalViewOffer?.priceDetails?.priceLabel}
                    />
                </div>


                <ItemDescription
                    story={generalViewOffer?.description?.story}
                />


                <ItemFooter>
                    <ItemFooterActions
                        tel="+7 777 777 77 77"
                    />
                    {/* <button className="btn btn-yellow">Показать Телефон</button>
                        <button className="btn btn-gray">Избранное</button> */}
                    {/* </ItemFooterActions> */}

                    <ItemPremiumFooter link={author ? `/user/${author.userId}` : undefined} >
                        {author && <ItemAuthor
                            author={author}

                        />
                        }
                        <ItemMeta
                            updatedAt={generalViewOffer?.createdAt}
                        />
                    </ItemPremiumFooter>
                    {/* </div> */}
                </ItemFooter>
            </div>
        </div >
    </>
    )

})

export default TableItem