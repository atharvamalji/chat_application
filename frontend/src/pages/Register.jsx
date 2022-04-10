import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const Register = () => {

    const firstName = useRef();
    const lastName = useRef();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const history = useHistory();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password.current.value !== confirmPassword.current.value) {
            confirmPassword.current.setCustomValidity("Passwords do not match.");
        } else {
            const user = {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try {
                const res = await axios.post("/auth/register", user);
                history.push("/login")
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    return (
        <div className="container p-4 flex flex-col items-center justify-center h-screen">
            <div className="space-y-10">
                <div className="flex flex-col items-center space-y-2">
                    <p className="font-extrabold text-3xl">Student Community</p>
                    <p className="text-center text-sm">Student Community helps you connect and share with students around the world. 🎓</p>
                </div>
                <div className="flex flex-col space-y-2 px-4">
                    <form className="space-y-4" action="" onSubmit={ e => handleFormSubmit(e) }>
                        <div>
                            <p className="font-bold text-xl">Register</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm hidden" htmlFor="">First Name</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="text" min="2" required placeholder="First name" ref={firstName} />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm hidden" htmlFor="">Last Name</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="text" min="2" required placeholder="Last name" ref={lastName} />
                            </div>
                            <div className="flex flex-col space-y-1 col-span-2">
                                <label className="text-sm hidden" htmlFor="">Username</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="text" min="2" required placeholder="Username" ref={username} />
                            </div>
                            <div className="flex flex-col space-y-1 hidden">
                                <label className="text-sm hidden" htmlFor="">Birth Date</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="text" placeholder="Birth date" />
                            </div>
                            <div className="flex flex-col space-y-1 hidden">
                                <label className="text-sm hidden" htmlFor="">Phone No.</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="text" placeholder="Phone no." />
                            </div>
                            <div className="flex flex-col space-y-1 col-span-2 hidden">
                                <label className="text-sm hidden" htmlFor="">Country</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="text" placeholder="Country" />
                            </div>
                            <div className="flex flex-col space-y-1 col-span-2">
                                <label className="text-sm hidden" htmlFor="">Email</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="email" placeholder="Email" ref={email} />
                            </div>
                            <div className="flex flex-col space-y-1 col-span-2">
                                <label className="text-sm hidden" htmlFor="">Password</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="password" placeholder="Password" ref={password} />
                            </div>
                            <div className="flex flex-col space-y-1 col-span-2">
                                <label className="text-sm hidden" htmlFor="">Confirm Password</label>
                                <input className="p-2 text-sm bg-slate-100 border rounded-md outline-none focus:ring-2" type="password" placeholder="Confirm password" ref={confirmPassword} />
                            </div>
                        </div>
                        <div>
                            <button className="w-full p-2 text-sm bg-blue-500 text-white rounded-md">Register</button>
                        </div>
                    </form>
                    <hr />
                    <p className="text-sm text-center">Already have an account? <Link className="text-blue-500" to="/login">Login</Link> </p>
                </div>
            </div>
        </div>
    );
}

export default Register;