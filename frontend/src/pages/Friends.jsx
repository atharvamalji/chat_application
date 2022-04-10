import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext"

const Friends = () => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);

    const [friends, setFriends] = useState([]);

    const funGetFriends = async () => {
        const res = await axios.get("/users/friends/".concat(user._id));
        setFriends(res.data);
    }

    useEffect(() => {
        funGetFriends();
    }, []);

    return (
        <div className="container p-4 flex-1">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-xl">Friends</p>
                </div>
                <div className="space-y-4">
                    {friends.map((friend, index) => {
                        return (
                            <div key={"frnd_".concat(index)} className="flex items-center space-x-4">
                                <Link to={"/profile/" + friend.username}>
                                    <div>
                                        <span>
                                            <img className="h-10 w-10 rounded-full" src={publicFolder + "profiles/1.jpg"} alt="" />
                                        </span>
                                    </div>
                                </Link>
                                <div>
                                    <p className="text-sm font-bold">{friend.firstName.concat(" ", friend.lastName)}</p>
                                    <p className="text-sm text-slate-600">{"@".concat(friend.username)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Friends;