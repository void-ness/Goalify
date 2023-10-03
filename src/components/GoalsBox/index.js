import React, { useState } from "react";
import edit from "./edit.svg";
import bin from "./bin.svg";

const GoalsBox = ({ children }) => {
    const [checked, setChecked] = useState(false);

    function updateChecked() {
        setChecked(!checked);
    }

    return (
        <div className="goal flex items-start my-4">
            <input type="checkbox" checked={checked} onChange={updateChecked} className="w-7 h-7 mt-1 text-red-500" />
            <div className="flex items-start w-10/12">
                <span className={`${checked ? "line-through" : ""} text-3xl mx-4 text-justify w-fit`}>{children}</span>
                <div className="flex mt-1">
                    <img src={edit} className="w-6 mx-1 cursor-pointer" alt="edit icon" />
                    <img src={bin} className="w-8 mx-1 cursor-pointer" alt="bin icon" />
                </div>
            </div>
        </div >
    );
};

export default GoalsBox;