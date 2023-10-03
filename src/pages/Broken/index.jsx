import React from "react";
import Heading from "../../components/utilities/Heading";
import { Link } from "react-router-dom";
import NavIcon from "./navIcon.svg";
import TextContent from "../../components/utilities/TextContent";

const Broken = () => {
    return (
        <div className="pt-10">
            <Heading>Broken</Heading>

            <div className="userInputContainer w-1/2 mx-auto flex-col flex items-center mt-10">
                <div className="userInput grid grid-rows-2 my-3">
                    <label htmlFor="username" className="text-2xl mb-2">Problem</label>
                    <input type="text" placeholder="Enter your problem" id="username" className="outline-none rounded-md bg-gray-400/30 text-black px-3 w-72 text-lg focus-visible:bg-black/25 focus-visible:text-white transition-all ease-in" />
                </div>

                <div className="userInput grid grid-rows-2 my-3">
                    <label htmlFor="pass" className="text-2xl mb-2">Solution</label>
                    <input type="password" placeholder="Enter your Solution" id="pass" className="outline-none rounded-md bg-gray-400/30 text-black px-3 w-72 text-lg focus-visible:bg-black/25 focus-visible:text-white transition-all ease-in" />
                </div>
            </div>

            <TextContent>
                This page is broken. <b>Go</b> back to home!
            </TextContent>

            <div className="fixed bottom-4 right-4 w-5">
                <Link to={"/"}>
                    <img className="" alt="home sceen nav icon" src={NavIcon}></img>
                </Link>
            </div>
        </div>
    );
};

export default Broken;