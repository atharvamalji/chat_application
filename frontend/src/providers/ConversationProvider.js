import { createContext, useReducer, useEffect } from "react"

const INITIAL_STATE = {
    conversations: JSON.parse(localStorage.getItem("conversations")) || [],
    isFetching: false,
    isRefreshing: false,
    error: false
}

const ConversationContext = createContext(INITIAL_STATE);

const ConversationReducer = (state, action) => {
    switch (action.type) {
        case "CONVERSATION_FETCHING":
            return {
                conversations: [],
                isFetching: true,
                isRefreshing: false,
                error: false
            };
        case "CONVERSATION_REFRESHING":
            return {
                conversations: [],
                isFetching: false,
                isRefreshing: true,
                error: false
            };
        case "CONVERSATION_SUCCESS":
            return {
                conversations: action.payload,
                isFetching: false,
                isRefreshing: false,
                error: false
            };
        case "CONVERSATION_FAILURE":
            return {
                conversations: [],
                isFetching: false,
                isRefreshing: false,
                error: action.payload
            };
        default:
            return state;
    }
}

const ConversationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ConversationReducer, INITIAL_STATE);

    const value = {
        conversations: state.conversations,
        isFetching: state.isFetching,
        isRefreshing: state.isRefreshing,
        error: state.error,
        dispatch
    }

    useEffect(() => {
        localStorage.setItem("conversations", JSON.stringify(state.conversations))
    }, [state.conversations]);
    

    return (
        <ConversationContext.Provider value={{
            conversations: state.conversations,
            isFetching: state.isFetching,
            isRefreshing: state.isRefreshing,
            error: state.error,
            dispatch
        }
    }>
            {children}
        </ConversationContext.Provider>
    )
}

class ConversationActions {
    constructor() {
        
    }

    conversationFetching = (userId) => ({
        type: "CONVERSATION_FETCHING"
    });

    conversationRefreshing = (userId) => ({
        type: "CONVERSATION_REFRESHING"
    })

    conversationSuccess = (conversations) => ({
        type: "CONVERSATION_SUCCESS",
        payload: conversations
    });

    conversationFailure = (error) => ({
        type: "CONVERSATION_FAILURE",
        payload: error
    })
}

export { ConversationContext, ConversationContextProvider, ConversationActions }