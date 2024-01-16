import axios from "axios";
import { AUTH_TOKEN } from "../constants";

const baseURL = process.env.REACT_APP_BASE_URL;

//fetching publically available goals
const fetchPendingData = async (username) => {
    try {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const results = await axios.get(`${baseURL}/goals/pending/${username}`, {
            headers: {
                timezone: userTimezone
            }
        });
        return results.data;
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Unable to fetch goals");
        }
    }
}

//fetching goals protected behind authentication wall
const fetchData = async () => {
    try {
        const token = localStorage.getItem(AUTH_TOKEN);
        const results = await axios.get(`${baseURL}/goals`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return results.data;
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Login Unsuccessful");
        }
    }
}

const addGoal = async (goal) => {
    try {
        const token = localStorage.getItem(AUTH_TOKEN);
        const results = await axios.post(
            `${baseURL}/goals/`,
            {
                desc: goal.desc
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        return results.data;
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Failed to add new goal");
        }
    }
}

const updateGoal = async (goal) => {
    try {
        const token = localStorage.getItem(AUTH_TOKEN);

        const data = {
            desc: goal.desc,
            checked: goal.checked
        };

        const results = await axios.patch(
            `${baseURL}/goals/${goal._id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return results.data;
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Failed to add new goal");
        }
    }
}

const deleteGoal = async (GoalId) => {
    try {
        const token = localStorage.getItem(AUTH_TOKEN);

        const results = await axios({
            method: 'delete',
            url: `${baseURL}/goals/`,
            data: {
                id: GoalId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return results.data;
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Failed to add new goal");
        }
    }
}

const fetchUsername = async () => {
    try {
        const token = localStorage.getItem(AUTH_TOKEN);

        const result = await axios.get(
            `${baseURL}/user/username`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        return result.data;
    } catch (error) {
        const errorMsg = error.response?.data.error.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Failed to add new goal");
        }
    }
}

export { fetchData, addGoal, updateGoal, deleteGoal, fetchPendingData, fetchUsername };