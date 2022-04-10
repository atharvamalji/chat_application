import { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


import { CircularProgress } from "@mui/material"

import Post from "../components/Post";

import { ActiveConversationActions, ActiveConversationContext } from "../providers/ActiveConversationProvider";


const ProfileSkeleton = () => {
    return (
        <div className="bg-slate-100 space-y-2">
            <div className="space-y-2 w-full bg-white">
                <div className="flex flex-col">
                    <div className="flex-1">
                        <div className="animate-pulse bg-slate-200 h-36 w-full"></div>
                    </div>
                    <div className="px-4 py-2 space-y-4 flex flex-col">
                        <div className="flex items-center space-x-4">
                            <div className="">
                                <div className="animate-pulse bg-slate-200 border-white h-28 w-28 rounded-full">

                                </div>
                            </div>
                            <div className="space-y-4 flex-1">
                                <div className="space-y-1">
                                    <div className="animate-pulse w-48 p-3 rounded-md bg-slate-200"></div>
                                    <div className="animate-pulse w-40 p-2 rounded-md bg-slate-200"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-center">
                                        <div className="animate-pulse p-2 w-8 rounded-md bg-slate-200"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="animate-pulse p-2 w-8 rounded-md bg-slate-200"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="animate-pulse p-2 w-8 rounded-md bg-slate-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="p-2 bg-slate-200 rounded-md"></div>
                            <div className="p-2 bg-slate-200 w-48 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileComponent = ({ user, currentUser, message, history }) => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const { activeConversation, error, dispatch } = useContext(ActiveConversationContext);

    const activeConversationActions = new ActiveConversationActions();

    const [friends, setFriends] = useState(currentUser.friends);
    const [isFriend, setIsFriend] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    const funMessage = async () => {
        const reqBody = {
            senderId: currentUser._id,
            recieverId: user._id
        }
        const res = await axios.post("/conversations/", reqBody);
        console.log(res.data);
        funSetActiveConversation(res.data.conversationId, res.data.friend);
        history.push("/chat");
    }

    const funAddFriend = async () => {
        const reqBody = {
            userId: currentUser._id,
            addFriendUserId: user._id
        }
        const res = await axios.post(("/users/" + currentUser._id + "/addFriend"), reqBody);
        console.log(res.data);
        setFriends([...friends, user._id]);
    }

    const funRemoveFriend = async () => {
        const reqBody = {
            userId: currentUser._id,
            removeFriendUserId: user._id
        }
        const res = await axios.post(("/users/" + currentUser._id + "/removeFriend"), reqBody);
        console.log(res.data);
        setFriends(friends.filter(friend => friend !== user._id));
    }

    const funGetFriends = async () => {
        const res = await axios.get(("/users/friends/" + currentUser._id + "/id"));
        setFriends(res.data);
    }

    useEffect(() => {
        funGetFriends();
    }, [])

    useEffect(() => {
        if (friends) {
            if (friends.includes(user._id)) {
                setIsFriend(true);
            } else {
                setIsFriend(false);
            }
            setIsLoading(false);
        }
    }, [friends])

    if (isLoading) {
        return (
            <div>
                <CircularProgress color="inherit" size="14px" />
            </div>
        )
    } else {
        return (
            <div className="bg-slate-100 space-y-2">
                <div className="space-y-2 w-full bg-white">
                    <div className="flex flex-col">
                        <div className="flex-1">
                            <img className="h-36 w-full object-cover" src={user.coverPicture === "" ? (publicFolder + "covers/default_cover.jpg") : (publicFolder + "covers/" + user.coverPicture)} alt="" />
                        </div>
                        <div className="px-4 py-2 space-y-4 flex flex-col">
                            <div className="flex items-center space-x-4">
                                <div className="">
                                    <span>
                                        <img className="border-white h-24 w-24 rounded-full object-cover" src={user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "profiles/" + user.profilePicture)} alt="" />
                                    </span>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <p className="text-xl font-bold">{user.firstName.concat(" ", user.lastName)}</p>
                                        <p className="text-sm text-slate-500">{"@".concat(user.username)}</p>
                                        <p>{message}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col items-center">
                                            <p className="text-sm font-bold">1.2k</p>
                                            <p className="text-sm">Connections</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-sm font-bold">{user.followers.length}</p>
                                            <p className="text-sm">Followers</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-sm font-bold">{user.following.length}</p>
                                            <p className="text-sm">Following</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-center">{user.bio}</p>
                                {
                                    user._id === currentUser._id ?
                                        <button className="text-sm p-1 rounded-md w-full border bg-slate-50">Edit profile</button> :
                                        <div className="grid grid-cols-2 gap-2">
                                            {isFriend ? <button className="p-2 text-sm border rounded-md" onClick={(e) => funRemoveFriend()}>Remove Friend</button> : <button onClick={(e) => funAddFriend()} className="p-2 text-sm border rounded-md">Add Friend</button>}
                                            {/* <button className="p-2 text-sm border rounded-md hidden">{ currentUser.following.includes(user._id) ? "Following" : "Follow" }</button> */}
                                            <button className="p-2 text-sm bg-blue-500 text-white rounded-md" onClick={() => funMessage()}>Message</button>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="hidden flex items-center space-x-4">
                            <div>
                                <span>
                                    <img className="h-12 w-12 rounded-full" src={publicFolder + "profiles/1.jpg"} alt="" />
                                </span>
                            </div>
                            <div>
                                <p className="font-bold">{user.firstName.concat(" ", user.lastName)}</p>
                                <p className="text-sm text-slate-500">{"@".concat(user.username)}</p>
                            </div>
                        </div>
                        <button className="hidden">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="hidden py-2 space-y-2">
                        <div className="px-4 text-sm">
                            <p>I am excited to share that I'll be participating in the <span className="font-bold text-blue-500">Google Summer of Code</span> this year as a mentor and project lead(frontend) for EOS User Story Project</p>
                        </div>
                        <div><img className="w-full object-contain" src={publicFolder + "posts/1.jpg"} alt="" /></div>
                    </div>
                    <div className="hidden px-4 space-y-2">
                        <div className="flex justify-between">
                            <div className="reactions flex space-x-4">
                                <button className="focus:bg-slate-100 rounded-full">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </span>
                                </button>
                                <button className="focus:bg-slate-100 rounded-full">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </span>
                                </button>
                                <button className="focus:bg-slate-100 rounded-full">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </span>
                                </button>
                                <button className="focus:bg-slate-100 rounded-full">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div>
                                <button className="focus:bg-slate-100 rounded-full">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <p className="text-sm font-bold">785 likes  </p>
                        <p className="text-sm text-slate-500">5 hours ago</p>
                    </div>
                </div>
            </div>
        )
    }
}

const Profile = () => {

    const history = useHistory();

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const { username } = useParams();

    const [person, setPerson] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async (username) => {
        const res = await axios.get("/users/" + username);
        // console.log(res.data);
        setPerson(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (username) {
            getUser(username);
        } else {
            setIsLoading(false);
            console.log("your profile page");
        }
    }, [])

    return (
        <div className="flex-1">
            <div className="space-y-0">
                <div className="p-4 z-30 sticky top-0 flex bg-white items-center justify-between border-b">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => history.goBack()}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                            </span>
                        </button>
                        <p className="font-bold text-xl">{username ? username : user.username}</p>
                    </div>
                </div>
                {isLoading ? <ProfileSkeleton /> : <ProfileComponent user={username ? person : user} currentUser={user} history={history} />}
            </div>
        </div>
    );
}

export default Profile;