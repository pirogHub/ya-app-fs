import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import DropDownMenuByClick from "../components/DropDownMenuByClick/DropDownMenuByClick";

import "./navbars.scss"
import NavBarList from "./NavBarList";
import "./Navbar.scss"
import { useAuth } from "../../../providers/AuthProvider/AuthProvider";
import Button from "../../ui/Button";
import MyLink from "../../ui/MyLink";




const Navbar = () => {

    const { isSigned, userName, userId, logOut } = useAuth()



    const history = useHistory()

    return (
        <nav className="navbar">
            <div className="navbar__wrapper NavBar__wrapper">
                <div className="navbar__container">
                    <MyLink
                        isBottomWarning={true}
                        isDisabled={true}
                        className="navbar-brand"
                        to="/">
                        Navbar
                    </MyLink>

                    <div className="navbar-actions">

                        <NavBarList>
                            <MyLink isBottomWarning={true} isDisabled={true} to="/">

                                <div className="pill text-bg-secondary">
                                    <i className="bi bi-geo-alt"></i>
                                    Все города
                                </div>
                            </MyLink>
                        </NavBarList>


                        <NavBarList>
                            <MyLink
                                // type="button"
                                to="/add"
                            >
                                <button className="btn btn-green-outline" type="button">Добавить объявление</button>
                            </MyLink>

                            <MyLink type="button"
                                // isDisabled={true}
                                to={userId ? `/user/${userId}` : "/auth"}
                            >
                                <Button
                                    // isDisabled={true}
                                    label={"Кабинет"}
                                    className="btn btn-clean link-black"
                                />
                                {/* <button className="btn btn-clean link-black">Кабинет</button> */}
                            </MyLink>

                            {(!isSigned || !userName)
                                ? <button
                                    onClick={() => history.push("/auth")}
                                    className={"btn btn-lightBlue"}
                                >Войти
                                </button>
                                : <DropDownMenuByClick
                                    isRight={true}
                                    dropdownCenterContent={
                                        <button
                                            className={"btn btn-lightBlue"}
                                        >
                                            {userName}
                                        </button>
                                    }>
                                    <MyLink className="link"
                                        to={userId ? `/user/${userId}` : "/auth"}
                                    >
                                        Профиль
                                    </MyLink>
                                    <MyLink className="link"
                                        to="/"
                                        onClick={logOut}
                                    >
                                        Выйти
                                    </MyLink>
                                    <hr className="dropdown-divider withMargin" />
                                    <MyLink className="link disabled disabledByALittleOpacity"
                                    // to="/auth"
                                    >
                                        Здесь может быть ваша реклама
                                    </MyLink>
                                </DropDownMenuByClick>
                            }
                        </NavBarList>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar