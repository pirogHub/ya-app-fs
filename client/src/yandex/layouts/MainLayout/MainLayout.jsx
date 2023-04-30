import React from "react";

import ModalWindowProvider from "../../providers/modalWindow/modalWindowProvider";
import Navbar from "../../components/Navs/Navbars/Navbar";
import NavbarSecond from "../../components/Navs/Navbars/NavbarSecond";
import Footer from "./components/Footer";

import "./MainLayout.scss"
import ErrorShower from "./components/ErrorShower/ErrorShower";
import ThemeController from "./components/ThemeController/ThemeController";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { THEME_KEYS, getCurrentTheme } from "../../store/theme";
import { useEffect } from "react";
import AuthController from "./components/AuthController/AuthController";


const MainLayout = ({ children }) => {

    const currentTheme = useSelector(getCurrentTheme())
    const refMainLayout = useRef()



    useEffect(() => {

        if (currentTheme !== THEME_KEYS.DARK) {
            // refMainLayout.current.classList.add("MainLayout__Theme-dark")
        } else {
            // refMainLayout.current.classList.remove("MainLayout__Theme-dark")
        }
    }, [currentTheme])
    return (
        <>
            <div
                ref={refMainLayout}
                className="MainLayout__Theme"
            >

                <AuthController />
                <ModalWindowProvider>

                    <div className="SuperUltraNavBar_Wrapper">

                        <Navbar />
                        <NavbarSecond />

                    </div>

                    <div className="MainLayout">

                        <ErrorShower />

                        <div className="MainLayout__content">
                            {children}

                        </div>




                    </div>
                    <Footer />

                </ModalWindowProvider>

            </div>
        </>

    )
}

export default MainLayout