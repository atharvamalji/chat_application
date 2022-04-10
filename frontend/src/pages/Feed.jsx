import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"

import Post from "../components/Post";

const Feed = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="py-4">
        <div className="space-y-2">
            <div className="flex items-center justify-between px-4">
                <p className="font-bold text-xl">Feed</p>
            </div>
            <div className="bg-slate-100 space-y-2 ">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post /> 
            </div>
        </div>
    </div>
    );
}

export default Feed;