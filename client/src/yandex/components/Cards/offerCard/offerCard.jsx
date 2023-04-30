import React from "react";



import "./offerCard.scss"
const OfferCard = ({ className, label, children, spaceBetween, needBottomBorder, childrenFlexOne, beautyFlexChildren, additionalLabel }) => {

    // console.log("children", children);

    if (!children) return

    return (
        <div className={"offerCard"
            + (className ? ` ${className}` : "")
            + (needBottomBorder ? ` needBottomBorder` : "")

        }>
            {label
                && <div className="offerCard__title">
                    <h2>{label}</h2>
                    {additionalLabel && <h4>{additionalLabel}</h4>}
                </div>
            }


            <div className={"offerCard__content"
                + (spaceBetween ? ` ${" spaceBetween"}` : "")
                + (childrenFlexOne ? ` childrenFlexOne` : "")
                + (childrenFlexOne && beautyFlexChildren ? ` beautyFlexChildren` : " ")
            }>
                {children}
            </div>
        </div>
    )
}

export default OfferCard