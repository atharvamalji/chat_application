import { createContext, useReducer } from "react";
import HeaderLocationReducer from "./HeaderLocationReducer";

const INITIAL_STATE = {
    location: "feed"
}

const HeaderLocationContext = createContext(INITIAL_STATE);

const HeaderLocationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(HeaderLocationReducer, INITIAL_STATE);
    return (
        <HeaderLocationContext.Provider value={{location: state.location, dispatch}}>
            {children}
        </HeaderLocationContext.Provider>
    )
}

export { HeaderLocationContext, HeaderLocationProvider };