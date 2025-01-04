import { authFetch, publicFetch } from "./axios";

//fetching publically available goals
const fetchPendingData = async (username) => {
    try {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const results = await publicFetch.get(`/goals/pending/${username}`, {
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
const fetchData = async (year) => {
    try {
        const results = await authFetch.get('/goals', {
            params: { year }
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
        const results = await authFetch.post(
            '/goals',
            {
                desc: goal.desc,
                position: goal.position
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
        const data = {
            desc: goal.desc,
            checked: goal.checked,
            position: goal.position
        };

        const results = await authFetch.patch(
            `/goals/${goal._id}`,
            data
        )

        return results.data;
    } catch (error) {
        const errorMsg = error.response?.data.error?.message;

        if (errorMsg) {
            throw new Error(errorMsg)
        } else {
            throw new Error("Failed to add new goal");
        }
    }
}

const deleteGoal = async (GoalId) => {
    try {
        const results = await authFetch({
            method: 'delete',
            url: '/goals',
            data: {
                id: GoalId
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
        const result = await authFetch.get('/user/username')

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