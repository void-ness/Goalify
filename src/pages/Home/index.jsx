import React from "react";
import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import TextContent from "../../components/utilities/TextContent";
import NavIcon from "./navIcon.svg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="pt-10">
            <div className="countdownContainer">
                <Heading>Countdown</Heading>
                <CountDownBoxContainer />
            </div>

            <TextContent>
                Until the preset goals are released.<br />Till then keep hustling!
            </TextContent>

            <div className="fixed bottom-4 right-4 w-5">
                <Link to={"/broken"}>
                    <img className="" alt="broken nav icon" src={NavIcon}></img>
                </Link>
            </div>
        </div>
    );
};

export default Home;