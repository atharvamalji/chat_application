import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";

import { CircularProgress } from "@mui/material"

const Login = () => {

    const email = useRef();
    const password = useRef();

    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleFormSubmit = (e) => {
        
        const cleanedEmail = email.current.value.toLowerCase().replace(/([^a-z0-9]+.@)/g,'');
        const cleanedPassword = password.current.value.replace(/[\s]/g,'');
        
        e.preventDefault();

        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }

    return (
        <div className="container p-4 flex flex-col items-center justify-center h-screen">
            <div className="space-y-10">
                <div className="flex flex-col items-center space-y-2">
                    <p className="font-extrabold text-3xl">Student Community</p>
                    <p className="text-center text-sm">Student Community helps you connect and share with students around the world. 🎓</p>
                </div>
                <div className="flex flex-col space-y-2 px-4">
                    <form className="space-y-4" action="" onSubmit={e => handleFormSubmit(e)}>
                        <div>
                            <p className="font-bold text-xl">Login</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm hidden" htmlFor="">Username</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="text" placeholder="username" required ref={email} />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm hidden" htmlFor="">Password</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="password" placeholder="password" required ref={password} />
                            </div>
                        </div>
                        <div>
                            <button className="w-full p-2 text-sm bg-blue-500 text-white rounded-md" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="14px" /> : "Login"}</button>
                        </div>
                    </form>
                    <hr />
                    <p className="text-sm text-center">Don't have an account yet? <Link className="text-blue-500" to="/register">Register</Link> </p>
                </div>
            </div>
        </div>
    );
}

export default Login;