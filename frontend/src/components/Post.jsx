import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Post = () => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className="py-2 space-y-2 w-full bg-white">
            <div className="flex justify-between px-4 items-center">
                <div className="flex items-center space-x-4">
                    <div>
                        <Link to="/profile">
                            <span>
                                <img className="h-12 w-12 rounded-full" src={publicFolder + "profiles/1.jpg"} alt="" />
                            </span>
                        </Link>
                    </div>
                    <div>
                        <p className="font-bold">{user.firstName.concat(" ", user.lastName)}</p>
                        <p className="text-sm text-slate-500">{"@".concat(user.username)}</p>
                    </div>
                </div>
                <button>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </span>
                </button>
            </div>
            <div className="py-2 space-y-2">
                <div className="px-4 relative">
                    <div className="text-sm" id="post-text">
                        <p className={ showMore ? "line-clamp-none" : "line-clamp-3" }>
                        I am excited to share that I'll be participating in the <span className="font-bold text-blue-500">Google Summer of Code</span> this year as a mentor and project lead(frontend) for EOS User Story Project Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quasi hic incidunt quidem officiis provident necessitatibus eligendi itaque, facere libero modi vel sed. Dolor quos explicabo labore amet dolore ipsam?
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vitae, reprehenderit maiores dolore, reiciendis aut, praesentium porro quidem culpa numquam debitis recusandae quasi rem. Doloribus voluptate ratione obcaecati ut impedit.
                        </p>
                    </div>
                    <button className="bg-white right-0 bottom-0 text-sm text-slate-500 hover:text-blue-500" onClick={ () => toggleShowMore() }>{ showMore ? "show less" : "show more" }</button>
                </div>
                <div id="post-image"><img className="w-full object-contain" src={publicFolder + "posts/1.jpg"} alt="" /></div>
            </div>
            <div className="px-4 space-y-2">
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
    )
}

export default Post;