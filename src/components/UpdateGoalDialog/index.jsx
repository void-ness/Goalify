import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";

const UpdateGoalDialog = ({ onClose, userGoal, open }) => {
    // userGoal is the current goal
    const [updatedGoal, setUpdatedGoal] = useState(userGoal);

    // this runs when user clicks outside of modal to close it
    const handleClose = () => {
        if (updatedGoal.desc === "") {
            onClose(null);
            setUpdatedGoal(userGoal);
            return;
        }

        else {
            let confirmation = window.confirm("You haven't updated your goal. Do you want to go back without updating?");
            if (confirmation) {
                onClose(null);
                setUpdatedGoal(userGoal);
                return;
            }
        }
    }

    // this happens when user clicks the post button
    const handleUpdateGoal = () => {
        if (updatedGoal.desc === "") {
            alert("Enter a valid desc added");
            return;
        }

        else {
            onClose(updatedGoal);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <div className="userGoalInputContainer flex-col flex items-center px-6 py-8 bg-gradient-to-tr from-zinc-400 to-zinc-700">
                <div className="userInput flex flex-col mb-12">
                    <label htmlFor="username" className="text-2xl mb-4 text-white">Update Goal</label>

                    <input
                        type="text"
                        value={updatedGoal.desc}
                        onChange={(e) => setUpdatedGoal({ ...updatedGoal, desc: e.target.value })}
                        placeholder="Enter your updated goal"
                        id="username"
                        className="outline-none rounded-md bg-slate-100 focus-visible:bg-black/25 text-black focus-visible:text-white py-1 px-3 md:w-96 text-lg transition-all ease-in" />
                </div>

                <button className="text-white bg-black/25 hover:bg-black/50 px-4 py-1 rounded-lg self-end transition-all ease-in" onClick={() => handleUpdateGoal()}>POST</button>
            </div>
        </Dialog>
    );
};

export default UpdateGoalDialog;