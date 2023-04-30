import { Link } from "react-router-dom"


import "./ItemPremiumFooter.scss"
import MyLink from "../../../../../../components/ui/MyLink"


const ItemPremiumFooter = ({ link = undefined, children }) => {


    return (
        <MyLink to={link} className="premium-footer">
            {children}
        </MyLink>
    )
}

export default ItemPremiumFooter