import axios from "axios";
import { refreshToken } from "./auth";

const baseURL = process.env.REACT_APP_BASE_URL;

const authFetch = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
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
                    return authFetch(origRequest);
                }
            }

            else {
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