import React, { useState } from "react";

const GoalsBoxViewOnly = ({ goal }) => {
    const [currGoal] = useState(goal)

    return (
        <>
            {currGoal &&
                <div className="goal flex items-start my-4">
                    <input type="checkbox" readOnly={true} checked={currGoal.checked} className="w-7 h-7 mt-1 text-red-500" />
                    <div className="flex items-start w-10/12">
                        <span className={`${currGoal.checked ? "line-through" : ""} text-2xl md:text-3xl mx-4 md:text-justify w-fit`}>{currGoal.desc}</span>
                    </div>
                </div >
            }
        </>
    );
};

export default GoalsBoxViewOnly;