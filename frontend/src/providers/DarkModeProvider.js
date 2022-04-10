import { Context, createContext, useReducer, useEffect } from "react";

const DARK_THEME = {
    background: "bg-slate-900",
    color: "text-slate-500",
    isDark: true
}

const LIGHT_THEME = {
    background: "bg-white",
    color: "text-black",
    isDark: false
}


// Context
const DarkModeContext = {
    mode: {},
    
}

// Reducer
const darkModeReducer = (value, isDark) => {
    isDark ? DARK_THEME : LIGHT_THEME
}