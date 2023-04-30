import React from "react";

import "./Footer.scss"
import MyLink from "../../../../components/ui/MyLink";

const FooterRow = ({ isNoWrap, children }) => {


    return (
        <>
            <div className={"FooterRow" + (isNoWrap ? " noWrap" : "")}>
                {children}
            </div>
        </>
    )
}

const FooterList = ({ label, list, linkToAll }) => {


    return (
        <div className="FooterList">
            <ul>
                <div>{label}</div>
                {list.map(l => (
                    <li key={l}>

                        <MyLink isDisabled={true} label={l} isDarkWarning={true} />
                    </li>
                ))}
                <div>
                    <MyLink isDisabled={true} className="to-all" label={linkToAll} isDarkWarning={true} />
                </div>
            </ul>
        </div>)
}


const Footer = () => {


    return (
        <div className="SuperMegaFooter">
            <div className="Footer__wrapper">

                <FooterRow>
                    <FooterList {...footerConfig.area} />
                    <FooterList  {...footerConfig.metro} />
                    <FooterList {...footerConfig.area} />
                    <FooterList  {...footerConfig.metro} />
                    <FooterList {...footerConfig.area} />
                    <FooterList  {...footerConfig.metro} />
                    <FooterList {...footerConfig.area} />

                </FooterRow>
                <FooterRow isNoWrap={true}>
                    {/* <div className="my-d-flex my-justify-content-spacebetween w100"> */}
                    <ul className="navbar Footer__nav">
                        <li className="nav-item"><MyLink isDarkWarning={true} className="nav-link" isDisabled={true} label={"lalala"} /></li>
                        <li className="nav-item"><MyLink isDarkWarning={true} className="nav-link" isDisabled={true} label={"lalala"} /></li>
                        <li className="nav-item"><MyLink isDarkWarning={true} className="nav-link" isDisabled={true} label={"lalala"} /></li>
                        <li className="nav-item"><MyLink isDarkWarning={true} className="nav-link" isDisabled={true} label={"lalala"} /></li>
                        <li className="nav-item"><MyLink isDarkWarning={true} className="nav-link" isDisabled={true} label={"lalala"} /></li>
                    </ul>
                    <div className="my-d-flex my-align-items-center">
                        <button className="btn-clean fill-white fill-hover-blue"><i className="bi bi-badge-ad fz-big"></i></button>
                        <button className="btn-clean fill-white fill-hover-blue"><i className="bi bi-telegram fz-big"></i></button>
                    </div>
                    {/* </div> */}
                </FooterRow>
            </div>
        </div>
    )
}


export default Footer



const footerConfig = {
    metro: {
        label: "У МЕТРО",
        list: [
            "Щёлковская",
            "Первомайская",
            "Измайловская",
            "Партизанская",
            "Семёновская",
            "Электрозаводская"
        ],
        linkToAll: "Все станции метро"
    },
    area: {
        label: "В РАЙОНЕ",
        list: [
            "Сокольники",
            "Солнцево",
            "Капотня",
            "Куркино",
            "Левобережный",
            "Кузьминки"
        ],
        linkToAll: "Все районы"
    }
}