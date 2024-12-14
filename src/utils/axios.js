import axios from "axios";
import { refreshToken } from "./auth";

const baseURL = process.env.REACT_APP_BASE_URL;

const authFetch = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        "Content-Type": "application/json"
    }
})

const publicFetch = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true/
})

authFetch.interceptors.request.use(
    async (config) => {
        // Dynamically set the Authorization header at runtime
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        // config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

authFetch.interceptors.response.use(
    (response) => {
        return response;
    },
    async (resError) => {
        try {
            const origRequest = resError.config;

            if (resError.response.status === 403 && !origRequest._retry) {
                origRequest._retry = true;
                const response = await refreshToken();

                if (response.ok) {
                    // Ensure the response is valid JSON
                    const data = await response.json();
                    // Update the token in localStorage
                    localStorage.setItem("authToken", data.newToken);
                    // Update the Authorization header
                    origRequest.headers["Authorization"] = `Bearer ${data.newToken}`;
                    return authFetch(origRequest);
                }
            } else {
                return Promise.reject(resError);
            }
        } catch (error) {
            return Promise.reject(error);
            // console.error(error);
        }
    }
)

export {
    authFetch,
    publicFetch
}