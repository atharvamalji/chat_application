import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material"


const LogOutModal = ({ showModal, setShowModal }) => {

    const history = useHistory();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const funLogOut = () => {
        setIsLoggingOut(true);
        localStorage.removeItem("user");
        localStorage.removeItem("conversations");
        setIsLoggingOut(false);
        window.location.reload(false);
        history.push("/login");
    }

    return (
        <div className={"absolute top-0 left-0 h-screen w-screen bg-black/60 z-30 flex items-center justify-center " + (showModal ? "" : "hidden")}>
            <div className="bg-white p-2 w-72 space-y-2 rounded-md">
                <div className="">
                    <p className="font-bold text-center">Log Out ?</p>
                </div>
                <div className=" flex items-center justify-center py-4">
                    <p className="text-center text-sm">Do you want to Log Out?</p>
                </div>
                <div className=" grid grid-cols-2 gap-2">
                    <button className="p-2 text-sm bg-slate-200 rounded-md" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="p-2 text-sm text-white bg-blue-500 rounded-md" onClick={() => funLogOut()}>{ isLoggingOut ? <CircularProgress color="inherit" size="14px" /> : "Log Out"}</button>
                </div>
            </div>
        </div>
    )
}

const Settings = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="container p-4 flex-1 flex">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-xl">Settings</p>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">

                    </div>
                    <div>
                        <button className="text-sm font-bold text-blue-500" onClick={() => setShowModal(true)}>Log Out</button>
                    </div>
                </div>
            </div>
            <LogOutModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default Settings;