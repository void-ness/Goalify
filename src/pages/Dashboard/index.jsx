import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import GoalsBox from "../../components/GoalsBox";

import NavIcon from "./navIcon2.svg";
import NavIcon2 from "./navIcon3.svg";
import addIcon from "./add.svg";
import AddGoalDialog from "../../components/AddGoalDialog";
import {
    renderGoals,
    handleGoalAddition,
    handleGoalUpdation,
    handleGoalDeletion,
    renderShareLink,
    handleGoalPositionUpdation,
    handleLogout
} from "../../utils/uiHelper";

import { isValidUser } from "../../utils/auth";
import LinkDialog from "../../components/LinkDialog";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [goals, setGoals] = useState("");
    const [loading, setLoading] = useState(true);
    const [linkDialogOpen, setLinkDialogOpen] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        isValidUser()
            .then((response) => {
                if (response.ok) {
                    renderGoals(setGoals);
                }
                else {
                    navigate('/broken');
                }
            })
            .catch((err) => {
                console.error(err);
                navigate('/broken');
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.index === destination.index) {
            return;
        }

        const currGoal = goals[source.index];

        let updatedGoals = [...goals];
        updatedGoals.splice(source.index, 1);
        updatedGoals.splice(destination.index, 0, currGoal);

        handleGoalPositionUpdation(goals, setGoals, source.index, destination.index);
        setGoals(updatedGoals);
    }

    return (
        <>
            {loading ? (<></>) :
                (
                    <div className="pt-16 pb-20">
                        <div className="countdownContainer">
                            <Heading>Countdown</Heading>
                            <CountDownBoxContainer />
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="goalsContainer w-5/6 md:w-7/12 mx-auto flex flex-col mt-16">
                                <Droppable droppableId="goals-container">
                                    {(provided) => (
                                        <div className="flex flex-col"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {
                                                (goals && goals.length !== 0) &&
                                                (
                                                    goals.map((goal, ind) => {
                                                        return (
                                                            <GoalsBox
                                                                key={ind}
                                                                index={ind}
                                                                goal={goal}
                                                                updateUserGoal={(goal) => handleGoalUpdation(goal, goals, setGoals)}
                                                                deleteUserGoal={(id) => handleGoalDeletion(id, setGoals, goals)}
                                                            ></GoalsBox>
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

                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                <div className="goal flex items-start my-4" onClick={handleClickOpen}>
                                    <img src={addIcon} alt="add new goal icon" className="w-7 h-7 mt-1" />
                                </div>
                            </div>
                        </DragDropContext>

                        <div className="fixed bottom-4 right-4 flex flex-col md:flex-row">
                            <button
                                onClick={() => renderShareLink(setShareLink, setLinkDialogOpen, linkDialogOpen)}
                                className="w-5 mb-4 md:mb-0 md:mr-4"
                            >
                                <img className="" alt="broken nav icon" src={NavIcon2}></img>
                            </button>

                            <button
                                onClick={() => handleLogout(navigate)}
                                className="w-5"
                            >
                                <img className="" alt="broken nav icon" src={NavIcon}></img>
                            </button>
                        </div>

                        <LinkDialog open={linkDialogOpen} link={shareLink} onClose={setLinkDialogOpen} />

                        <AddGoalDialog onClose={(value) => handleGoalAddition(value, setOpen, setGoals, goals)} open={open} />
                    </div>
                )}
        </>
    );
};

export default Dashboard;