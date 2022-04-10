import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";

import { AuthContext } from "../context/AuthContext";
import { ActiveConversationContext } from "../providers/ActiveConversationProvider";

import { CircularProgress } from "@mui/material"

const ConversationLoading = () => {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 z-30 h-full w-full">
            <div className="flex flex-col items-center space-y-2">
                <CircularProgress color="inherit" size="36px" />
                <p className="text-sm italic">Loading Messages</p>
            </div>
        </div>
    )
}

const ConversationWrapper = ({ unique, user }) => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        unique.map((messageGroup, parentIndex) => {
            const senderId = messageGroup.senderId;
            const createdAt = messageGroup.messages[messageGroup.messages.length - 1].createdAt;
            // this is you
            if (senderId === user._id) {
                return (
                    <div key={"sender".concat(parentIndex)} className="message-group flex flex-col space-y-1 items-end">
                        <div className="flex justify-end items-end space-x-2">
                            <div className="flex flex-col items-end space-y-1">
                                {messageGroup.messages.map((message, childIndex) => {
                                    return (
                                        <p id={"sender".concat(parentIndex, childIndex)} key={"sender".concat(parentIndex, childIndex)} className="text-sm max-w-[16rem] p-2 bg-slate-100 rounded-xl">{message.text}</p>
                                    )
                                })}
                            </div>
                            <div>
                                <div>
                                    <span>
                                        <img className="h-4 w-4 rounded-full" src={user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "profiles/" + user.profilePicture)} alt="" srcSet="" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="pr-8 text-xs px-2 text-slate-500">{format(createdAt)}</p>
                        </div>
                    </div>
                )
            } else {
                // this is your friend
                return (
                    <div key={"reciever".concat(parentIndex)} className="flex flex-col space-y-1 items-start">
                        <div className="flex justify-end items-end space-x-2">
                            <div>
                                <div>
                                    <span>
                                        <img className="h-4 w-4 rounded-full" src={user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "profiles/" + user.profilePicture)} alt="" srcSet="" />
                                    </span>
                                </div>
                            </div>
                            <div className="messages-container flex flex-col items-start space-y-1">
                                {messageGroup.messages.map((message, childIndex) => {
                                    return (
                                        <p id={"sender".concat(parentIndex, childIndex)} key={"reciever_".concat(parentIndex, childIndex)} className="message-box text-sm max-w-[16rem] p-2 bg-blue-500 text-white rounded-xl">{message.text}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <p className="pl-8 text-xs px-2 text-slate-500">{format(createdAt)}</p>
                        </div>
                    </div>
                )
            }
        })
    )
}

const Conversation = ({ messages, setMessages }) => {

    const { user } = useContext(AuthContext);
    const { activeConversation } = useContext(ActiveConversationContext);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("messages updated");
    }, [messages]);

    const unique = [];

    const funCleanMessages = () => {
        messages.forEach((message) => {
            let time = new Date(message.createdAt);
            time.setSeconds(0);
            time.setMilliseconds(0);
            let createdAtMinutes = time.getTime();

            const senderId = message.sender;

            // Try to get existing message group
            let currentGroup = unique.filter(msgGrp => msgGrp.createdAt === createdAtMinutes && msgGrp.senderId === senderId);

            // If we've got the existing group, add the message, otherwise create a new group
            if (currentGroup.length) {
                currentGroup[0].messages.push(message);
            } else {
                unique.push({ "senderId": senderId, "createdAt": createdAtMinutes, "messages": [message] });
            }
        });
    }

    funCleanMessages();

    return (
        <div className="conversation-wrapper space-y-8">
            <ConversationWrapper unique={unique} user={user} />
        </div>
    );
}

export default Conversation;

