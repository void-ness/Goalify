import React from "react";
import "./style.css";

const CountDownBox = ({ children, value }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-zinc-500 w-20 h-24 text-6xl text-black rounded-md countDownBox relative">
                <div className="bg-white/70 backdrop-blur-sm absolute left-2 -bottom-2 w-full h-full flex items-center justify-center rounded-md">
                    {value}
                </div>
            </div>
            <span className="text-3xl md:text-4xl pt-6 pl-2">
                {children}
            </span>
        </div>
    );
};

export default CountDownBox;