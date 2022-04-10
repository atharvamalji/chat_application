import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";

import Conversation from "../components/Conversation";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"
import { ConversationActions, ConversationContext } from "../providers/ConversationProvider";
import { ActiveConversationActions, ActiveConversationContext } from "../providers/ActiveConversationProvider";

import { CircularProgress } from "@mui/material"

import { format } from "timeago.js";

import { io } from "socket.io-client";

const Coversation = ({ messages, messagesGroup, user, publicFolder }) => {

    const scrollToElement = useRef();

    const funScrollToBottom = () => {
        scrollToElement.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        funScrollToBottom();
    }, [messages]);

    if (messages != null) {
        return (
            <div className="space-y-4">
                {messages.map((message, index) => {
                    if (message.sender === user._id) {
                        return (
                            <div key={index} className="flex flex-col items-end space-y-1">
                                <div className="flex justify-end items-end space-x-2">
                                    <div className="flex flex-col items-end space-y-1">
                                        <p className="text-sm max-w-[16rem] p-2 bg-slate-100 rounded-xl">{message.text}</p>
                                    </div>
                                    <div>
                                        <span>
                                            <img className="h-4 w-4 rounded-full" src={user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "profiles/" + user.profilePicture)} alt="" srcSet="" />
                                        </span>
                                    </div>
                                </div>
                                <div><p className="pr-8 text-xs px-2 text-slate-500">{format(message.createdAt)}</p></div>
                            </div>

                        );
                    } else {
                        return (
                            <div key={index} className="flex flex-col items-start space-y-1">
                                <div className="flex justify-end items-end space-x-2">
                                    <div>
                                        <span>
                                            <img className="h-4 w-4 rounded-full" src={user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "profiles/" + user.profilePicture)} alt="" srcSet="" />
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-start space-y-1">
                                        <p className="text-sm max-w-[16rem] p-2 bg-blue-500 text-white rounded-xl">{message.text}</p>
                                    </div>
                                </div>
                                <div><p className="pl-8 text-xs px-2 text-slate-500">{format(message.createdAt)}</p></div>
                            </div>

                        );
                    }
                })}
                <span ref={scrollToElement}></span>
            </div>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }
}

const Chat = () => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const socket = useRef();
    const chatBoxValue = useRef();

    const { user } = useContext(AuthContext);
    const { activeConversation, error, dispatch } = useContext(ActiveConversationContext);

    const [isLoading, setIsLoading] = useState(null);

    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [messagesGroup, setMessagesGroup] = useState([]);

    const activeConversationActions = new ActiveConversationActions();

    const funCleanMessages = (messages) => {
        setIsLoading(true);
        const messagesGroup = [];
        messages.forEach((message) => {
            let time = new Date(message.createdAt);
            time.setSeconds(0);
            time.setMilliseconds(0);
            let createdAtMinutes = time.getTime();
            const senderId = message.sender;
            let currentGroup = messagesGroup.filter(msgGrp => msgGrp.createdAt === createdAtMinutes && msgGrp.senderId === senderId);
            if (currentGroup.length) {
                currentGroup[0].messages.push(message);
            } else {
                messagesGroup.push({ "senderId": senderId, "createdAt": createdAtMinutes, "messages": [message] });
            }
        });
        setIsLoading(false);
        // console.log(messagesGroup);
        // for (let i = 0; i < messages.length; i++) {
        //     let counter = 0;
        //     const currentMessage = messages[i];

        //     let time = new Date(currentMessage.createdAt);
        //     time.setSeconds(0);
        //     time.setMilliseconds(0);
        //     let createdAtMinutes = time.getTime();

        //     messagesGroup.push({ "senderId": currentMessage.sender, "createdAt": createdAtMinutes, "messages": [currentMessage] });

        //     if (i === messages.length - 1) {
        //         break;
        //     } else {
        //         let j = i + 1;

        //     }

        //     if (i === messages.length - 1) {
        //         let currentGroup = messagesGroup.filter((messageGroup) => messageGroup.createdAt === createdAtMinutes);

        //         if (currentGroup.length) {
        //             currentGroup[0].messages.push(currentMessage);
        //         } else {
        //             messagesGroup.push({ "senderId": currentMessage.sender, "createdAt": createdAtMinutes, "messages": [currentMessage] });
        //         }

        //     } else {
        //         let j = i + 1;

        //         messagesGroup.push({ "senderId": currentMessage.sender, "createdAt": createdAtMinutes, "messages": [currentMessage] });

        //         while (messages[j].sender === currentMessage.sender) {
        //             if ( j < messages.length -1 ) {
        //                 console.log(j);
        //                 let time = new Date(messages[j].createdAt);
        //                 time.setSeconds(0);
        //                 time.setMilliseconds(0);
        //                 let createdAtMinutes = time.getTime();

        //                 let currentGroup = messagesGroup.filter((messageGroup) => messageGroup.createdAt === createdAtMinutes);

        //                 if (currentGroup.length) {
        //                     currentGroup[currentGroup.length-1].messages.push(messages[j]);
        //                 } else {
        //                     messagesGroup.push({ "senderId": messages[j].sender, "createdAt": createdAtMinutes, "messages": [messages[j]] });
        //                 }
        //                 counter++;  
        //             } else {
        //                 break;
        //             }
        //             j++; 

        //         }

        //         i += counter;
        //     }

        // }
        setMessagesGroup(messagesGroup);
    }

    const funHandleNewMessage = (newMessage) => {

    }

    const funActiveCoversationUnset = () => {
        try {
            dispatch(activeConversationActions.activeConversationUnset());
        } catch (err) {
            dispatch(activeConversationActions.activeConversationFailure(err));
        }
    }

    const funHandleSubmit = async (e) => {
        e.preventDefault();
        if (chatBoxValue.current.value !== "") {
            const currentChatBoxValue = chatBoxValue.current.value;
            const message = {
                sender: user._id,
                text: currentChatBoxValue,
                conversationId: activeConversation.conversationId
            };
            try {
                const res = await axios.post("/messages", message);
                chatBoxValue.current.value = "";
                setMessages([...messages, res.data]);
            } catch (err) {
                console.log(err);
            }

            socket.current.emit("sendMessage", {
                senderId: user._id,
                recieverId: activeConversation.friend._id,
                messageText: currentChatBoxValue
            })
        } else {
            alert("message cannot be empty")
        }
    }

    const funGetMessages = async () => {
        const res = await axios.get("/messages/".concat(activeConversation.conversationId));
        setMessages(res.data);
    }

    useEffect(() => {
        funGetMessages();
        socket.current = io("ws://localhost:8900");
        socket?.current.emit("addUser", user._id);
        socket?.current.on("getUsers", users => {
            // console.log(users);
        });
        socket.current.on("getMessage", data => {
            setNewMessage({
                conversationId: activeConversation.conversationId,
                sender: data.senderId,
                text: data.messageText,
                createdAt: Date.now()
            })
        });
    }, []);

    useEffect(() => {
        if (messages !== null) {
            console.log(messages);
        }
    }, [messages]);

    useEffect(() => {
        newMessage && setMessages(previousMessages => [...previousMessages, newMessage]);
    }, [newMessage, activeConversation]);

    return (
        <div className="flex flex-col h-max min-h-screen">
            <header className="sticky top-0 bg-white border-b">
                <div className="flex items-center justify-between space-x-2 px-1 py-2">
                    <div className="flex">
                        <button>
                            <Link to="/messages" onClick={() => funActiveCoversationUnset()} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                            </Link>
                        </button>
                        <div className="px-2">
                            <img className="h-10 w-10 rounded-full" src={user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "profiles/" + user.profilePicture)} alt="" srcSet="" />
                        </div>
                        <div>
                            <p className="">{activeConversation.friend.firstName.concat(" ", activeConversation.friend.lastName)}</p>
                            <p className="text-xs text-slate-500">{"@".concat(activeConversation.friend.username)}</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </header>
            <div className="flex-1 p-2 space-y-4 chat-section">
                {/* <Coversation mmessages={messages} messagesGroup={messagesGroup} user={user} publicFolder={publicFolder} /> */}

                <Coversation messages={messages} user={user} publicFolder={publicFolder} />
            </div>
            <div className="sticky bottom-0 border-t bg-white">
                <form action="">
                    <div className="p-2 flex space-x-2">
                        <div className="hidden textarea flex-1 p-2 bg-slate-50 border rounded-md outline-none text-sm max-h-[5rem] overflow-auto" onInput={e => console.log(e.currentTarget.textContent)} contentEditable>
                        </div>
                        <input className="flex-1 p-2 bg-slate-50 border rounded-md outline-none text-sm" type="text" ref={chatBoxValue} />
                        <div className="flex items-end">
                            <button className="p-2 bg-blue-500 text-sm  rounded-md px-4 text-white" onClick={e => funHandleSubmit(e)}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat;