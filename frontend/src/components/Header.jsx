import { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthContext"

const SimpleHeader = () => {
    return (
        <div className="flex items-center justify-between space-x-2 px-1 py-2">
            <div className="px-2 py-1">
                <p className="flex items-center space-x-1 text-xl font-bold"><span>Student</span><span className="bg-black text-md rounded text-white p-1 rounded-sm">Community</span></p>
            </div>
        </div>
    );
}

const FeatureHeader = ({location}) => {

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);

    return (
        <div className="flex items-center justify-between space-x-2 px-1 py-2">
            <Link to="/profile">
                <div className="px-2">
                    <img className="h-8 w-8 border rounded-full" src={ user.profilePicture === "" ? (publicFolder + "profiles/default_avatar.jpg") : (publicFolder + "profiles/" + user.profilePicture)} alt="" srcSet="" />
                </div>
            </Link>
            <div className="flex-1">
                { location.pathname === "/friends" ? <Link to="/search"><input className="p-1 w-full text-sm border rounded-md bg-slate-50" type="text" placeholder="Search your friends here" /></Link> : <input className="p-1 w-full text-sm border rounded-md bg-slate-50" type="text" /> }
            </div>
            <div className="px-2">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </span>
            </div>
        </div>
    );
}

const Header = (props) => {

    const location = useLocation();

    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    return (
        <header className="sticky top-0 bg-white border-b z-20">
            {location.pathname === "/feed" ? <SimpleHeader /> : <FeatureHeader  location={location} />}
        </header>
    );
}

export default Header;