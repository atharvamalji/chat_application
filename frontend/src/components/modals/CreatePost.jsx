import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CreatePost = () => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-white w-full flex flex-1">
            <div className="absolute inline-flex h-screen w-full flex items-center justify-center backdrop bg-black/50 hidden">

            </div>
            <div className="border modal w-full flex flex-col py-4 bg-white rounded-md space-y-4">
                <div className="px-4 flex space-x-2">
                    <Link to="/feed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    </Link>
                    <p className="text-xl font-bold">Create a Post</p>
                </div>
                <div className="space-y-4 flex-1 flex flex-col">
                    <div className="px-4 flex space-x-4">
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
                    <div className="flex-1 flex flex-col space-y-2">
                        <div className="flex-1 px-4 py-2 outline-none" role="textbox" contenteditable="true" aria-placeholder="5-digit zipcode" aria-labelledby="txtboxLabel">
                        </div>
                        <div className="px-4">
                            <button className="text-blue-500 font-bold text-sm px-2 py-1 rounded-md focus:bg-blue-200">Add a hashtag</button>
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <div>
                        <button>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;