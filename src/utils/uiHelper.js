import { fetchData, addGoal, updateGoal, deleteGoal, fetchUsername } from "./api.js";

const renderGoals = (setGoals) => {
    fetchData()
        .then((data) => {
            if (data) {
                setGoals(data);
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

const handleGoalUpdation = (goal, goalsList, setGoals) => {
    if (goal) {
        updateGoal(goal)
            .then((newGoal) => {
                delete newGoal.__v;

                let updatedGoals = [...goalsList];
                updatedGoals = updatedGoals.map((currGoal) => {
                    if (currGoal._id === newGoal._id) {
                        return newGoal;
                    }

                    else {
                        return currGoal;
                    }
                })
                setGoals(updatedGoals);
            })
            .catch((err) => {
                alert("Unable to update goal");
                console.error(err);
            })
    }
}

const handleGoalDeletion = (id, setGoals, goalsList) => {
    deleteGoal(id)
        .then((data) => {
            if (data) {
                let updatedGoalsList = goalsList;
                updatedGoalsList = updatedGoalsList.filter((elem) => elem._id !== id);
                setGoals(updatedGoalsList);
            }
        })
        .catch((err) => {
            alert("Unable to delete goal");
            console.error(err);
        })
}

const handleGoalAddition = (value, setOpen, setGoals, goalsList) => {
    setOpen(false);
    if (value) {
        addGoal(value)
            .then((data) => {
                if (data) {
                    delete data.__v;
                    setGoals([...goalsList, data])
                }
            })
            .catch((err) => {
                alert("Unable to add new goal");
                console.error(err);
            })
    }
};

const renderShareLink = (setShareLink, setLinkDialogOpen, linkDialogOpen) => {
    fetchUsername()
        .then((data) => {
            if (data) {
                const username = data.username;
                const origin = window.location.origin;
                const homePageLink = `${origin}/home/${username}`;
                setShareLink(homePageLink);
                setLinkDialogOpen(!linkDialogOpen);
            }
        })
        .catch((err) => {
            console.error(err);
            setShareLink("Unable to generate shareable link");
            setLinkDialogOpen(!linkDialogOpen);
        })
}

export {
    handleGoalAddition,
    handleGoalDeletion,
    handleGoalUpdation,
    renderGoals,
    renderShareLink
}

