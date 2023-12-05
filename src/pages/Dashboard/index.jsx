import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import GoalsBox from "../../components/GoalsBox";

import NavIcon from "./navIcon2.svg";
import NavIcon2 from "./navIcon3.svg";
import addIcon from "./add.svg";
import AddGoalDialog from "../../components/AddGoalDialog";
import { fetchData, addGoal, updateGoal, deleteGoal, fetchUsername } from "../../utils/api";
import { isValidUser } from "../../utils/auth";
import { AUTH_TOKEN } from "../../constants";
import LinkDialog from "../../components/LinkDialog";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [linkDialogOpen, setLinkDialogOpen] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValidUser()) {
            navigate('/broken');
            return;
        }
        fetchGoals();
    }, [])

    const fetchGoals = () => {
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

    const updateUserGoal = (goal) => {
        if (goal) {
            updateGoal(goal)
                .then((newGoal) => {
                    delete newGoal.__v;

                    let updatedGoals = [...goals];
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

    const deleteUserGoal = (id) => {
        deleteGoal(id)
            .then((data) => {
                if (data) {
                    let updatedGoalsList = goals;
                    updatedGoalsList = updatedGoalsList.filter((elem) => elem._id !== id);
                    setGoals(updatedGoalsList);
                }
            })
            .catch((err) => {
                alert("Unable to delete goal");
                console.error(err);
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const addUserGoal = (value) => {
        setOpen(false);
        if (value) {
            addGoal(value)
                .then((data) => {
                    if (data) {
                        delete data.__v;
                        setGoals([...goals, data])
                    }
                })
                .catch((err) => {
                    alert("Unable to add new goal");
                    console.error(err);
                })
        }
    };

    const generateUsername = () => {
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
                // alert("Unable to generate shareable link");
                console.error(err);
                setShareLink("Unable to generate shareable link");
                setLinkDialogOpen(!linkDialogOpen);
            })
    }

    return (
        <div className="pt-16 pb-20">
            <div className="countdownContainer">
                <Heading>Countdown</Heading>
                <CountDownBoxContainer />
            </div>

            <div className="goalsContainer w-5/6 md:w-7/12 mx-auto flex flex-col mt-16">
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

                {
                    (goals && goals.length === 0) &&
                    (
                        <div className="text-3xl md:text-4xl mb-6">
                            No goals found. Create your first by clicking the button below
                        </div>
                    )
                }

                <div className="goal flex items-start my-4" onClick={handleClickOpen}>
                    <img src={addIcon} alt="add new goal icon" className="w-7 h-7 mt-1" />
                </div>
            </div>

            <div className="fixed bottom-4 right-4 flex flex-col md:flex-row">
                <button
                    onClick={() => generateUsername()}
                    className="w-5 mb-4 md:mb-0 md:mr-4"
                >
                    <img className="" alt="broken nav icon" src={NavIcon2}></img>
                </button>

                <Link to={"/broken"}
                    onClick={() => localStorage.removeItem(AUTH_TOKEN)}
                    className="w-5"
                >
                    <img className="" alt="broken nav icon" src={NavIcon}></img>
                </Link>
            </div>

            <LinkDialog open={linkDialogOpen} link={shareLink} onClose={setLinkDialogOpen} />

            <AddGoalDialog onClose={addUserGoal} open={open} />
        </div>
    );
};

export default Dashboard;