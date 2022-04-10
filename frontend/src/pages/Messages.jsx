import { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";
import { format } from "timeago.js";

import { ConversationActions, ConversationContext } from "../providers/ConversationProvider";
import { ActiveConversationActions, ActiveConversationContext } from "../providers/ActiveConversationProvider";

import { io } from "socket.io-client";


import { CircularProgress } from "@mui/material"


const ConversationsWrapper = ({ conversations, user }) => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const { activeConversation, error, dispatch } = useContext(ActiveConversationContext);

    const activeConversationActions = new ActiveConversationActions();

    const funSetActiveConversation = (conversationId, friend) => {
        const value = {
            conversationId: conversationId,
            friend: friend
        }
        try {
            dispatch(activeConversationActions.activeConversationSet(value));
        } catch (err) {
            dispatch(activeConversationActions.activeConversationFailure(err));
        }
    }

    if (conversations) {
        return (
            conversations.map((conversation, index) => {
                return (
                    <Link key={"friend_".concat(index)} to="/chat" onClick={() => funSetActiveConversation(conversation.conversationId, conversation.friend)} >
                        <div className="flex items-center space-x-4 bg-white py-2 focus:bg-slate-50 rounded-md">
                            <div>
                                <span>
                                    <img className="h-10 w-10 rounded-full" src={user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "covers/" + user.coverPicture)} alt="" srcSet="" />
                                </span>
                            </div>
                            <div className="flex flex-1 justify-between">
                                <div>
                                    <p className="text-sm font-bold4">{conversation.friend.firstName.concat(" ", conversation.friend.lastName)}</p>
                                    {
                                        conversation.lastMessage ? 
                                        <p className="text-xs text-slate-500 line-clamp-1">{(conversation.lastMessage.sender === user._id ? "You: " : "") + conversation.lastMessage.text}</p> :
                                        ""
                                    }
                                    
                                </div>
                                <div className="">
                                    <p className="text-xs text-slate-500 whitespace-nowrap">{format(conversation.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })
        );
    } else {
        return (
            <CircularProgress color="inherit" size="20px" />
        )
    }
}

const Messages = () => {

    const socket = useRef();

    const { conversations, isFetching, isRefreshing, error, dispatch } = useContext(ConversationContext);
    const { user } = useContext(AuthContext);

    const { activeConversation } = useContext(ActiveConversationContext);

    const conversationActions = new ConversationActions();

    const funGetConversations = async (dispatch) => {
        dispatch(conversationActions.conversationFetching(user._id));
        try {
            const res = await axios.get("/conversations/temp/".concat(user._id));
            dispatch(conversationActions.conversationSuccess(res.data));
        } catch (err) {
            dispatch(conversationActions.conversationFailure(err));
        }
    }

    const funRefreshConversations = async (dispatch) => {
        dispatch(conversationActions.conversationRefreshing(user._id));
        try {
            const res = await axios.get("/conversations/temp/".concat(user._id));
            dispatch(conversationActions.conversationSuccess(res.data));
        } catch (err) {
            dispatch(conversationActions.conversationFailure(err));
        }
    }

    useEffect(() => {
        funGetConversations(dispatch);
        // socket.current = io("ws://localhost:8900");
    }, []);

    // useEffect(() => {
    //     console.log(socket);
    // }, [socket]);

    useEffect(() => {
        // socket.current.emit("addUser", user._id);
        // socket.current.on("getUsers", users => {
        //     console.log(users);
        // });
    }, [user]);

    return (
        <div className="container p-4 flex-1">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-xl">Messages</p>
                    <button onClick={() => funRefreshConversations(dispatch)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={"h-5 w-5 " + (isRefreshing ? "animate-spin" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="bg-white">
                    {isFetching ? <CircularProgress color="inherit" size="20px" /> : <ConversationsWrapper conversations={conversations} user={user} />}
                </div>
            </div>
        </div>
    );
}

export default Messages;