import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="container p-4 flex flex-col items-center justify-center h-screen">
            <div className="space-y-10">
                <div className="flex flex-col items-center space-y-2">
                    <p className="font-extrabold text-3xl">Student Community</p>
                    <p className="text-center text-sm">Student Community helps you connect and share with students around the world. 🎓</p>
                </div>
                <div className="flex flex-col space-y-2 px-10">
                    <form className="hidden" action="">
                        <div className="space-y-4">
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm" htmlFor="">Username</label>
                                <input className="p-1 bg-slate-100 border rounded-md" type="text" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm" htmlFor="">Password</label>
                                <input className="p-1 bg-slate-100 border rounded-md" type="password" />
                            </div>
                        </div>
                        <div>
                            <button></button>
                        </div>
                    </form>
                    <Link to="/login">
                        <button className="w-full p-1 bg-blue-500 text-white rounded-md">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="w-full p-1 bg-blue-500 text-white rounded-md">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;