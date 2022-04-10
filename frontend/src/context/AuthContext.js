import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const temp_user = {
    _id: "62332ed8b49624376f242993",
    firstName: "Surabhi",
    lastName: "Malji",
    username: "surabhi_malji",
    email: "surabhi.malji@gmail.com",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    following: [],
}

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    // user: temp_user,
    isFetching: false,
    error: false
};

const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };