import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
    activeConversation: JSON.parse(localStorage.getItem("activeConversation"))
}

const ActiveConversationContext = createContext(INITIAL_STATE);

const ActiveConversationReducer = (state, action) => {
    switch (action.type) {
        case "ACTIVE_CONVERSATION_SET":
            return {
                activeConversation: action.payload,
                error: false
            };
        case "ACTIVE_CONVERSATION_UNSET":
            return {
                activeConversation: null,
                error: false
            };
        case "ACTIVE_CONVERSATION_FAILURE":
            return {
                activeConversation: null,
                error: action.payload
            };
        default:
            return state;
    };
}

const ActiveConversationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ActiveConversationReducer, INITIAL_STATE);

    const value = {
        activeConversation: state.activeConversation,
        error: state.error,
        dispatch
    }

    useEffect(() => {
        localStorage.setItem("activeConversation", JSON.stringify(state.activeConversation));
    }, [state.activeConversation]);

    return (
        <ActiveConversationContext.Provider value={value} >
            {children}
        </ActiveConversationContext.Provider>
    )

}

class ActiveConversationActions {
    constructor() {

    }

    activeConversationSet = (activeConversation) => ({
        type: "ACTIVE_CONVERSATION_SET",
        payload: activeConversation
    });

    activeConversationUnset = () => ({
        type: "ACTIVE_CONVERSATION_UNSET"
    });

    activeConversationFailure = (error) => ({
        type: "ACTIVE_CONVERSATION_UNSET",
        payload: error
    });

}

export { ActiveConversationContext, ActiveConversationContextProvider, ActiveConversationActions }