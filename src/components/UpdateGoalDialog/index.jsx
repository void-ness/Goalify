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
        <Dialog open={open} onClose={handleClose}>
            <div className="userGoalInputContainer flex-col flex items-center px-6 py-8 bg-gradient-to-r from-neutral-400/80 to-neutral-900/90">
                <div className="userInput grid grid-rows-2 mb-12 w-full">
                    <label htmlFor="username" className="text-2xl mb-2">Update Goal</label>

                    <input type="text" value={updatedGoal.desc} onChange={(e) => setUpdatedGoal({ ...updatedGoal, desc: e.target.value })} placeholder="Enter your updated goal" id="username" className="outline-none rounded-md bg-slate-100 text-black px-3 w-96 text-xl transition-all ease-in" />
                </div>

                <button className="text-black bg-slate-300 hover:bg-slate-100 hover:font-bold px-4 py-1 rounded-lg self-end transition-all ease-in" onClick={() => handleUpdateGoal()}>POST</button>
            </div>
        </Dialog>
    );
};

export default UpdateGoalDialog;