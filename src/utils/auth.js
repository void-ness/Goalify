import axios from "axios";
import { AUTH_TOKEN } from "../constants";

const baseURL = process.env.REACT_APP_BASE_URL;

const setAuthorizationHeader = () => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    else {
        axios.defaults.headers.common["Authorization"] = null;
    }
};

const isValidUser = () => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (!token) return false;

    return true;
}

// should return a token on successful login
// an error of invalid credentials if login not successful
const loginUser = async (user) => {
    try {
        if (!(user.username && user.pass)) {
            throw new Error("invalid user details sent");
        }

        const data = {
            username: user.username,
            password: user.pass
        };

        const result = await axios.post(
            `${baseURL}/user/login`,
            data
        );

        return result;
        // console.log(results);
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Login Unsuccessful");
        }
    }
}

const registerUser = async (user) => {
    try {
        if (!(user.name && user.email && user.pass && user.username)) {
            throw new Error("invalid user details sent")
        }

        const data = {
            name: user.name,
            password: user.pass,
            email: user.email,
            username: user.username
        };

        const result = await axios.post(`${baseURL}/user/register`, data);

        return result;
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg);
        } else {
            throw new Error("Signup unsuccessful");
        }
    }
}

export { loginUser, registerUser, setAuthorizationHeader, isValidUser };