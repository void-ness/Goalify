import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import TextContent from "../../components/utilities/TextContent";
import GoalsBox from "../../components/GoalsBox";

import NavIcon from "./navIcon.svg";
import addIcon from "./add.svg";
import AddGoalDialog from "../../components/AddGoalDialog";
import { fetchData, addGoal, updateGoal, deleteGoal } from "../../utils/api";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetchGoals();
        console.log("fetching new goals");
    }, [])

    const fetchGoals = () => {
        fetchData().then((data) => {
            if (data) {
                setGoals(data)
            }
        });
    }

    const updateUserGoal = (goal) => {
        updateGoal(goal).then(() => {
            let updatedGoalsList = goals;
            let ind = updatedGoalsList.findIndex((elem) => elem._id === goal._id);
            updatedGoalsList[ind] = { ...updatedGoalsList[ind], desc: goal.desc, checked: goal.checked };
        })
    }

    const deleteUserGoal = (id) => {
        deleteGoal(id).then(() => {
            let updatedGoalsList = goals;
            updatedGoalsList = updatedGoalsList.filter((elem) => elem._id !== id);
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (value) {
            addGoal(value).then(() => setGoals([...goals, value]));
        }
    };

    // const goals = [goal1, goal2];

    return (
        <div className="pt-10">
            <div className="countdownContainer">
                <Heading>Countdown</Heading>
                <CountDownBoxContainer />
            </div>

            <div className="goalsContainer w-7/12 mx-auto flex flex-col mt-20">
                {
                    (goals && goals.length !== 0) &&
                    (
                        goals.map((goal, ind) => {
                            return (
                                <GoalsBox key={ind} goal={goal} updateUserGoal={updateUserGoal} deleteUserGoal={deleteUserGoal}></GoalsBox>
                            )
                        })

                    )
                }

                <div className="goal flex items-start my-4" onClick={handleClickOpen}>
                    <img src={addIcon} alt="add new goal icon" className="w-7 h-7 mt-1" />
                </div>
            </div>

            <div className="fixed bottom-4 right-4 w-5">
                <Link to={"/broken"}>
                    <img className="" alt="broken nav icon" src={NavIcon}></img>
                </Link>
            </div>

            <AddGoalDialog onClose={handleClose} open={open} />
        </div>
    );
};

export default Dashboard;