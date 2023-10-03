import React, { useState } from "react";
import { Link } from "react-router-dom";

import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import TextContent from "../../components/utilities/TextContent";
import GoalsBox from "../../components/GoalsBox";

import NavIcon from "./navIcon.svg";
import addIcon from "./add.svg";
import AddGoalDialog from "../../components/AddGoalDialog";

const Home = () => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("old value");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div className="pt-10">
            <div className="countdownContainer">
                <Heading>Countdown</Heading>
                <CountDownBoxContainer />
            </div>

            {/* <TextContent>
                Until the preset goals are released.<br />Till then keep hustling!
            </TextContent> */}

            <div className="goalsContainer w-7/12 mx-auto flex flex-col mt-20">
                <GoalsBox>Update the goal UI Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, necessitatibus.<br /> dhihsi</GoalsBox>

                <GoalsBox>adipisicing elit. Omnis, necessitatibus. dhihsi</GoalsBox>

                <div className="goal flex items-start my-4" onClick={handleClickOpen}>
                    <img src={addIcon} alt="add new goal icon" className="w-7 h-7 mt-1" />
                </div>
            </div>

            {selectedValue}

            <div className="fixed bottom-4 right-4 w-5">
                <Link to={"/broken"}>
                    <img className="" alt="broken nav icon" src={NavIcon}></img>
                </Link>
            </div>

            <AddGoalDialog onClose={handleClose} open={open} selectedValue={selectedValue} />
        </div>
    );
};

export default Home;