import React from "react";
import CountDownBox from "./CountDownBox";

const CountDownBoxContainer = () => {
    return (
        <div className="grid grid-cols-4 w-1/2 mx-auto mt-16">
            <CountDownBox value="66">
                Days
            </CountDownBox>

            <CountDownBox value="66">
                Hours
            </CountDownBox>

            <CountDownBox value="66">
                Minutes
            </CountDownBox>

            <CountDownBox value="66">
                Seconds
            </CountDownBox>
        </div>
    );
};

export default CountDownBoxContainer;