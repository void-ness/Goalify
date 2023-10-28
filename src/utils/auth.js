import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

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

export { loginUser, registerUser };