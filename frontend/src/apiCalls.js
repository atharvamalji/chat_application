import axios from "axios";

import { LoginStart, LoginSuccess, LoginFailure } from "./context/AuthActions";

const loginCall = async (userCredentials, dispatch) => {
    dispatch(LoginStart(userCredentials));
    try {
        const res = await axios.post("auth/login", userCredentials);
        dispatch(LoginSuccess(res.data));
    } catch (err) {
        dispatch(LoginFailure(err));
    }
}

export { loginCall };