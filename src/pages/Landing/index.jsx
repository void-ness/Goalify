import React from "react";
import { Link } from "react-router-dom";

import Heading from "../../components/utilities/Heading";
import CountDownBoxContainer from "../../components/CountDownBoxContainer";
import TextContent from "../../components/utilities/TextContent";

import NavIcon from "./navIcon.svg";

const Landing = () => {
    return (
        <div className="pt-16 pb-16 md:pb-10">
            <div className="countdownContainer">
                <Heading>Goalify</Heading>
                <span className="text-center text-3xl md:text-4xl mt-4 mb-12 mx-auto w-5/6 md:w-full leading-8 block font-light">
                    A new way to track your pending goals
                </span>
                <CountDownBoxContainer />
            </div>

            <TextContent>
                <div className="flex flex-col">
                    <span>
                        Until the year ends.
                    </span>
                    <span className="mt-6 md:mt-3">
                        Hurry up before it's too late!
                    </span>
                </div>
            </TextContent>

            {/* cta btn */}
            <Link to={"/broken"}>
                <div className="flex flex-col items-center mt-10 hover:scale-105 hover:cursor-pointer transition-all ease-in w-fit mx-auto">
                    <div className="bg-zinc-500 w-28 md:w-36 h-10 md:h-12 text-2xl md:text-3xl text-black rounded-md countDownBox relative -left-2">
                        <div className="bg-white/70 backdrop-blur-sm absolute left-2 -bottom-2 w-full h-full flex items-center justify-center rounded-md">
                            Join
                        </div>
                    </div>
                </div>
            </Link>

            <div className="fixed bottom-4 right-4 w-5">
                <Link to={"/broken"}>
                    <img className="" alt="broken nav icon" src={NavIcon}></img>
                </Link>
            </div>
        </div>
    );
};

export default Landing;