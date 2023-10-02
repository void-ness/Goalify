import React from "react";
import "./style.css";

const CountDownBox = ({ children, value }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white/80 py-3 px-4 text-6xl text-black rounded-md countDownBox relative shadow-inner shadow-black">
                {value}
            </div>
            <span className="text-4xl pt-4">
                {children}
            </span>
        </div>
    );
};

export default CountDownBox;