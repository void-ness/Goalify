import { fetchData, addGoal, updateGoal, deleteGoal, fetchUsername } from "./api.js";
import { loginUser, logoutUser, registerUser } from "./auth.js";

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

const handleGoalPositionUpdation = (goalsList, setGoals, srcIndex, destIndex) => {
    let updatedGoal = goalsList[srcIndex];

    const updatedPosition = findGoalPosition(srcIndex, destIndex, goalsList);

    updatedGoal = {
        ...updatedGoal,
        position: updatedPosition
    };

    updateGoal(updatedGoal)
        .then((newGoal) => {
            delete newGoal.__v;

            let updatedGoals = [...goalsList];
            updatedGoals.splice(srcIndex, 1);
            updatedGoals.splice(destIndex, 0, newGoal);

            setGoals(updatedGoals);
        })
        .catch((err) => {
            alert("Unable to update goal");
            console.error(err);
        })
}

const findGoalPosition = (sourceIndex, destIndex, goalsList) => {
    const beforeIndex = goalsList[destIndex].position;

    if (sourceIndex > destIndex) {
        // moving backwards
        if (destIndex === 0) {
            // it is the first goal
            const newPosition = beforeIndex - 100;
            return newPosition;
        }

        else {
            const newPosition = beforeIndex - 1;
            return newPosition;
        }
    }

    if (sourceIndex < destIndex) {
        // moving forwards
        if (destIndex === (goalsList.length - 1)) {
            // it is the last goal
            const newPosition = beforeIndex + 100;
            return newPosition;
        }

        else {
            const newPosition = beforeIndex + 1;
            return newPosition;
        }
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
        const newGoal = {
            ...value,
            position: (goalsList.length + 1) * 100,
        };

        addGoal(newGoal)
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

const handleLogout = (navigate) => {
    logoutUser()
        .then((response) => {
            if (response.ok) {
                navigate('/broken');
            }

            else {
                throw Error("logout failed")
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

const handleLogin = (formData, setErrorData, navigate) => {
    loginUser(formData)
        .then((response) => {
            if (response.ok) {
                setErrorData({
                    state: false,
                    msg: ""
                })
                navigate('/fix');
            }
        })
        .catch((err) => {
            setErrorData({
                state: true,
                msg: err.message
            });

            console.error(err);
        })
}

const handleRegistration = (formData, setErrorData, navigate) => {
    registerUser(formData)
        .then((response) => {
            if (response.ok) {
                setErrorData({
                    state: false,
                    msg: ""
                })
                navigate('/fix');
            }
        })
        .catch((err) => {
            setErrorData({
                state: true,
                msg: err.message
            });

            console.error(err);
        })
}


export {
    handleGoalAddition,
    handleGoalDeletion,
    handleGoalUpdation,
    handleGoalPositionUpdation,
    handleLogout,
    handleLogin,
    handleRegistration,
    renderGoals,
    renderShareLink
}

