import React, { useEffect, useRef, useState } from "react";


import "./NavbarSecond.scss"
import "./navbars.scss"
import NavBarList from "./NavBarList";
import DropDownMenuByHover from "../components/DropDownMenuByHover";

import ThemeController from "../../../layouts/MainLayout/components/ThemeController/ThemeController";
import MyLink from "../../ui/MyLink";
const NavbarSecond = () => {

    const refMenu = useRef()
    const [showedChildren, setShowedChildren] = useState()
    let refLink = useRef()

    const handlerShow = ({ children, reff }) => {


        if (refLink.current) refLink.current.classList.remove("active")
        if (reff.current) reff.current.classList.add("active")
        refLink.current = reff.current

        setShowedChildren(children)
    }

    useEffect(() => {
        if (showedChildren) refMenu.current.classList.add("DroppedMenu__menu-show")
        if (!showedChildren) refMenu.current.classList.remove("DroppedMenu__menu-show")
    }, [showedChildren])

    const handleMouseLeave = () => {
        console.log("handleMouseLeave");
        setShowedChildren(undefined)
        if (refLink.current) refLink.current.classList.remove("active")
    }

    return (
        <nav className="sec-navbar">
            <div onMouseLeave={handleMouseLeave} className="navbar-wrapper-columns">
                <div className="navbar__wrapper NavBar__wrapper">
                    <div className="second-navbar">
                        <div className="sec_navbar-container">

                            <NavBarList>
                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <a className="nav-link" aria-current="page" href="/">Купить</a>
                                    }>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Купить</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Купить</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Купить</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Купить</a>
                                    </div>
                                </DropDownMenuByHover>

                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <a className="nav-link" aria-current="page" href="/">Снять</a>
                                    }>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                    </div>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                    </div>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Снять</a>
                                    </div>
                                </DropDownMenuByHover>

                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <a className="nav-link" aria-current="page" href="/">Новостройки</a>
                                    }>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                    </div>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Новостройки</a>
                                    </div>
                                </DropDownMenuByHover>

                                <DropDownMenuByHover handler={handlerShow}
                                    dropdownCenterContent={
                                        <a className="nav-link" aria-current="page" href="/">Коммерческая</a>
                                    }>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                    </div>
                                    <div className="links_container">
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                        <a className="nav-link link-black badge-hovered" aria-current="page" href="/">Коммерческая</a>
                                    </div>
                                </DropDownMenuByHover>

                            </NavBarList>



                        </div>
                        <div className="sec_navbar-container">
                            {/* <div className="anotherLinksContainer"> */}
                            <NavBarList>
                                <MyLink

                                    isNavLink={true}
                                    activeClassName={"active"}
                                    className={"nav-link"}
                                    label={"Домой"}
                                    exact
                                    to={"/"}
                                />
                                <MyLink
                                    isNavLink={true}
                                    activeClassName={"active"}
                                    className={"nav-link"}
                                    label={"К фильтрам"}
                                    exact
                                    to={"/table"}
                                />
                                <MyLink
                                    isNavLink={true}
                                    className={"nav-link"}
                                    label={"Случайный пользователь"}
                                    exact
                                    to={"/random/user"}
                                />
                                <MyLink
                                    isNavLink={true}
                                    className={"nav-link"}
                                    label={"Случайное объявление"}
                                    exact
                                    to={"/random/offer"}
                                />
                            </NavBarList>
                        </div>
                        {/* </div> */}

                        {/* <ThemeController /> */}

                    </div>
                </div>
                <div className="DroppedMenu__wrapper">

                    <div ref={refMenu} className="DroppedMenu__menu" >
                        <hr className="dropdown-divider" />
                        <div className="navbar__wrapper NavBar__wrapper">
                            <div className="sec-navbar_toggledContent">
                                <div className="toggledContent_content">{showedChildren}</div>
                                <div className="toggledContent_add"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default NavbarSecond