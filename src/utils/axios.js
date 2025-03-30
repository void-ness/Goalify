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

            if (resError.response?.status === 403 && origRequest._retry) {
                // Both tokens are expired, clear storage and redirect to login
                localStorage.removeItem('authToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
                return Promise.reject(resError)
            }

            if (resError.response.status === 403 && !origRequest._retry) {
                // this is getting triggered when refresh request is failing too
                origRequest._retry = true;

                try {
                    const response = await refreshToken()
                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('authToken', data.newToken);
                        origRequest.headers['Authorization'] = `Bearer ${data.newToken}`;
                        return authFetch(origRequest);
                    }
                    // If refresh failed, clear token and redirect
                    localStorage.removeItem('authToken')
                    window.location.href = '/login'
                    return Promise.reject(error)
                } catch (refreshError) {
                    // If refresh failed, clear token and redirect
                    localStorage.removeItem('authToken')
                    window.location.href = '/login'
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(resError);
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