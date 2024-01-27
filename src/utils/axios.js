import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const authFetch = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        "Content-Type": "application/json",
    }
})

const publicFetch = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
})

authFetch.interceptors.request.use(
    async (config) => {
        config.withCredentials = true;
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
    (error) => {
        const origRequest = error.config;

        if (error.response.status === 403 && !origRequest._retry) {
            origRequest._retry = true;
            // add logic to refresh the token
            return authFetch(origRequest);
        }

        return Promise.reject(error);
    }
)

export {
    authFetch,
    publicFetch
}