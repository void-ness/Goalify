import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

//fetching publically available goals
const fetchPendingData = async (username) => {
    try {
        const results = await axios.get(`${baseURL}/goals/pending/${username}`);
        return results.data;
    } catch (error) {
        console.error("Error fetching records: ", error.response.data);
        return [];
    }
}

//fetching goals protected behind authentication wall
const fetchData = async () => {
    try {
        const results = await axios.get(baseURL);
        return results.data;
    } catch (error) {
        console.log(error);
    }
}

const addGoal = async (goal) => {
    try {
        const results = await axios.post(baseURL, {
            desc: goal.desc
        })

        return results.data;
    } catch (error) {
        console.log(error);
    }
}

const updateGoal = async (goal) => {
    try {
        const results = await axios.patch(`${baseURL}/${goal._id}`, {
            desc: goal.desc,
            checked: goal.checked
        })

        return results.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteGoal = async (GoalId) => {
    try {
        console.log(GoalId);

        const results = await axios({
            method: 'delete',
            url: baseURL,
            data: {
                id: GoalId
            }
        });

        console.log(results);
        return results.data;
    } catch (error) {
        console.log(error);
    }
}

export { fetchData, addGoal, updateGoal, deleteGoal, fetchPendingData };