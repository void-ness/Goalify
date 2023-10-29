import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import TextContent from "../../components/utilities/TextContent";
import GoalsBoxViewOnly from "../../components/GoalsBoxViewOnly";

import NavIcon from "./navIcon.svg";
import { fetchPendingData } from "../../utils/api";

const Home = () => {
    const [goals, setGoals] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        fetchGoals();
    }, [])

    const fetchGoals = () => {
        fetchPendingData(username)
            .then((data) => {
                if (data) {
                    setGoals(data)
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="mt-16 md:mt-10">
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
                            <GoalsBoxViewOnly key={ind} goal={goal}></GoalsBoxViewOnly>
                        )
                    })}
                </div>
            )}

            <div className="fixed bottom-4 right-4 w-5">
                <Link to={"/broken"}>
                    <img className="" alt="broken nav icon" src={NavIcon}></img>
                </Link>
            </div>
        </div>
    );
};

export default Home;