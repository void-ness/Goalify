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
                // Don't retry if this is the refresh token request itself to prevent infinite loop
                if (origRequest.url?.endsWith('/user/refresh')) {
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('refreshToken')
                    window.location.href = '/login'
                    return Promise.reject(resError)
                }

                origRequest._retry = true;

                try {
                    await refreshToken()
                    // refreshToken() already updates localStorage with new authToken
                    const newToken = localStorage.getItem('authToken');
                    if (!newToken) {
                        // If token refresh didn't set a new token, clear and redirect
                        localStorage.removeItem('authToken')
                        localStorage.removeItem('refreshToken')
                        window.location.href = '/login'
                        return Promise.reject(new Error('Token refresh failed'))
                    }
                    origRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return authFetch(origRequest);
                } catch (refreshError) {
                    // If refresh failed, clear token and redirect
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('refreshToken')
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