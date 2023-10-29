import React, { useEffect, useState } from "react";
import edit from "./edit.svg";
import bin from "./bin.svg";
import UpdateGoalDialog from "../UpdateGoalDialog";

const GoalsBox = ({ goal, updateUserGoal, deleteUserGoal }) => {
    const [currGoal, setCurrGoal] = useState(goal)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setCurrGoal(goal);
    }, [goal])

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
            {currGoal &&
                <div className="goal flex items-start my-4">
                    <input type="checkbox" checked={currGoal.checked} onChange={updateChecked} className="w-7 h-7 mt-1 text-red-500" />
                    <div className="flex items-start w-10/12">
                        <span className={`${currGoal.checked ? "line-through" : ""} text-3xl mx-4 text-justify w-fit`}>{currGoal.desc}</span>
                        <div className="flex mt-1">
                            <img src={edit} className="w-6 mx-1 cursor-pointer" onClick={handleEdit} alt="edit icon" />
                            <img src={bin} className="w-8 mx-1 cursor-pointer" onClick={handleDelete} alt="bin icon" />
                        </div>
                    </div>

                    <UpdateGoalDialog onClose={handleClose} open={open} userGoal={currGoal} />
                </div >

            }
        </>
    );
};

export default GoalsBox;