import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

import edit from "./edit.svg";
import bin from "./bin.svg";

import UpdateGoalDialog from "../UpdateGoalDialog";
import { isNewYearWeek } from "../../utils/countdown";

const GoalsBox = ({ goal, updateUserGoal, deleteUserGoal, index }) => {
    const currGoal = goal;
    const [open, setOpen] = useState(false);

    function handleEdit() {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
        if (value && (value.desc !== currGoal.desc)) {
            updateUserGoal(value);
        }
    };

    function updateChecked() {
        updateUserGoal({ ...currGoal, checked: !currGoal.checked });
    }

    function handleDelete() {
        deleteUserGoal(currGoal._id);
    }

    return (
        <>
            <Draggable
                draggableId={`task-${index}`}
                key={`task-${index}`}
                index={index}
            >
                {(provided) => (
                    currGoal &&
                    <div className="goal flex items-start my-4 flex-wrap md:flex-nowrap"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <input type="checkbox" checked={currGoal.checked} onChange={updateChecked} className="w-7 h-7 mt-1" />

                        <div
                            className="flex items-start w-10/12 md:w-full flex-wrap"
                        >
                            <span
                                className={`${currGoal.checked ? "line-through" : ""} text-2xl md:text-3xl mx-4 md:text-justify md:w-fit`}
                                {...provided.dragHandleProps}
                            >
                                {currGoal.desc}
                            </span>

                            <div className="flex mt-1 items-center justify-center ml-4">
                                {!isNewYearWeek() && <img src={edit} className="w-5 md:w-6 mx-1 cursor-pointer" onClick={handleEdit} alt="edit icon" />}
                                <img src={bin} className="w-7 md:w-8 mx-1 cursor-pointer" onClick={handleDelete} alt="bin icon" />
                            </div>
                        </div>

                        <UpdateGoalDialog onClose={handleClose} open={open} userGoal={currGoal} />
                    </div >
                )}

            </Draggable>
        </>
    );
};

export default GoalsBox;