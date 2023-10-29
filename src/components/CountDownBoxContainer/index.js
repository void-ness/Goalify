import React, { useEffect, useState } from "react";
import CountDownBox from "./CountDownBox";
import updateTimerValue from "../../utils/countdown";

const CountDownBoxContainer = () => {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        let timer = setInterval(() => {
            // updateTimerValue(setTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-10 w-5/6 md:w-3/4 xl:w-1/2 mx-auto mt-10 md:mt-16">
            <CountDownBox value={time.days}>
                Days
            </CountDownBox>

            <CountDownBox value={time.hours}>
                Hours
            </CountDownBox>

            <CountDownBox value={time.minutes}>
                Minutes
            </CountDownBox>

            <CountDownBox value={time.seconds}>
                Seconds
            </CountDownBox>
        </div>
    );
};

export default CountDownBoxContainer;