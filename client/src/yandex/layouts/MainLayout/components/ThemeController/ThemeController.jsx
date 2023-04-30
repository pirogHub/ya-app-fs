import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEME_KEYS, getCurrentTheme, toggleTheme } from "../../../../store/theme";


import "./ThemeController.scss"

const body = document.querySelector("body[id='mainBody']")

const ThemeController = () => {
    const dispatch = useDispatch()


    const currentTheme = useSelector(getCurrentTheme())




    return <div
        onClick={() => dispatch(toggleTheme())}
        className="ThemeController">
        {currentTheme !== THEME_KEYS.DARK
            ? <i className="bi bi-lightbulb ThemeController_off"></i>
            : <i className="bi bi-lightbulb-fill ThemeController_on"></i>
        }
    </div>
}

export default ThemeController