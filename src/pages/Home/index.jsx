import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import TextContent from "../../components/utilities/TextContent";
import GoalsBox from "../../components/GoalsBox";

import NavIcon from "./navIcon.svg";
import addIcon from "./add.svg";
import AddGoalDialog from "../../components/AddGoalDialog";

const Home = () => {
    let goal1 = { id: 123, desc: "This is a demo goal", checked: false };
    let goal2 = { id: 124, desc: "This is not a demo goal", checked: true };

    const [open, setOpen] = useState(false);
    const [goals, setGoals] = useState([goal1, goal2]);

    // main page has been mounted
    useEffect(() => {
        console.log("main page reloads 1st time");
    }, [])

    useEffect(() => {
        console.log("main page reloads");
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (value) {
            console.log("new goal added");
            console.log(value);
        }
    };

    // const goals = [goal1, goal2];

    return (
        <div className="pt-10">
            <div className="countdownContainer">
                <Heading>Countdown</Heading>
                <CountDownBoxContainer />
            </div>

            {(!goals || goals.length === 0) ? (
                <TextContent>
                    Until the preset goals are released.<br />Till then keep hustling!
                </TextContent>
            ) : (
                <div className="goalsContainer w-7/12 mx-auto flex flex-col mt-20">
                    {goals.map((goal, ind) => {
                        return (
                            <GoalsBox key={ind} goal={goal} ind={ind}></GoalsBox>
                        )
                    })}

                    <div className="goal flex items-start my-4" onClick={handleClickOpen}>
                        <img src={addIcon} alt="add new goal icon" className="w-7 h-7 mt-1" />
                    </div>
                </div>
            )}

            <div className="fixed bottom-4 right-4 w-5">
                <Link to={"/broken"}>
                    <img className="" alt="broken nav icon" src={NavIcon}></img>
                </Link>
            </div>

            <AddGoalDialog onClose={handleClose} open={open} />
        </div>
    );
};

export default Home;