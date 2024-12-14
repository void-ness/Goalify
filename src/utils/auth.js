import { publicFetch, authFetch } from "./axios";

const isValidUser = async () => {
    try {
        const result = await authFetch.get(
            '/user/authenticate'
        );

        return result.data;
    } catch (error) {
        const errorMsg = error.response?.data.error?.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Session Expired");
        }
    }
}

const logoutUser = async () => {
    try {
        const result = await authFetch.post('/user/logout');

        return (result.data);
    } catch (error) {
        const errorMsg = error.response?.data.error?.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Logout Unsuccessful");
        }
    }
}

const refreshToken = async () => {
    try {
        const result = await authFetch.post('/user/refresh', null, {
            headers: {
                ...authFetch.defaults.headers,
                'x-refresh-token': `Bearer ${localStorage.getItem("refreshToken")}`

            }
        });
        localStorage.setItem("authToken", result.data.token);
        return result.data;
    } catch (error) {
        const errorMsg = error.response?.data.error?.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Logout Unsuccessful");
        }
    }
}

// should set a cookie with authToken on successful login
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

        const result = await publicFetch.post(
            '/user/login',
            data
        );

        return result.data;
    } catch (error) {
        const errorMsg = error.response?.data.error?.message;

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

        const result = await publicFetch.post('/user/register', data);

        return result.data;
    } catch (error) {
        const errorMsg = error.response?.data.error?.message;

        if (errorMsg || error.message) {
            throw new Error(errorMsg ? errorMsg : error.message);
        } else {
            throw new Error("Signup unsuccessful");
        }
    }
}

export {
    loginUser,
    logoutUser,
    registerUser,
    isValidUser,
    refreshToken
};