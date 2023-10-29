import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";

const AddGoalDialog = ({ onClose, open }) => {
    const [userGoal, setuserGoal] = useState({ desc: "", checked: false });

    const handleClose = () => {
        // user has either not added the desc        
        if (userGoal.desc === "") {
            onClose(null);
            return;
        }

        // or forgot posting it
        else {
            let confirmation = window.confirm("You haven't posted your goal. Do you want to go back without posting?");
            if (confirmation) {
                onClose(null);
                setuserGoal({ ...userGoal, desc: "" });
                return;
            }
        }
    }

    const handleUpdateGoal = () => {
        // user is trying to post a blank goal        
        if (userGoal.desc === "") {
            alert("Please enter a valid desc");
            return;
        }

        else {
            onClose(userGoal);
            setuserGoal({ ...userGoal, desc: "" });
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="userGoalInputContainer flex-col flex items-center px-6 py-8 bg-gradient-to-tr from-zinc-400 to-zinc-700">
                <div className="userInput flex flex-col mb-12">
                    <label htmlFor="username" className="text-2xl mb-2">Add Goal</label>

                    <input
                        type="text"
                        value={userGoal.desc}
                        onChange={(e) => setuserGoal({ ...userGoal, desc: e.target.value })}
                        placeholder="Enter your new goal"
                        id="username"
                        className="outline-none rounded-md bg-slate-100 focus-visible:bg-black/25 text-black focus-visible:text-white py-1 px-3 md:w-96 text-lg transition-all ease-in" />
                </div>

                <button className="text-white bg-black/25 hover:bg-black/50 px-4 py-1 rounded-lg self-end transition-all ease-in" onClick={() => handleUpdateGoal()}>POST</button>
            </div>
        </Dialog>
    );
};

export default AddGoalDialog;