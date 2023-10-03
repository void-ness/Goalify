import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";

const AddGoalDialog = ({ onClose, selectedValue, open }) => {
    const [userInput, setUserInput] = useState(selectedValue);

    const handleClose = () => {
        onClose(selectedValue);
        setUserInput(selectedValue);
    }

    const handleItemSelect = (value) => {
        onClose(value);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="userGoalInputContainer flex-col flex items-center px-6 py-8 bg-gradient-to-r from-neutral-400/80 to-neutral-900/90">
                <div className="userInput grid grid-rows-2 mb-12 w-full">
                    <label htmlFor="username" className="text-2xl mb-2">Update Goal</label>

                    <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Enter your updated goal" id="username" className="outline-none rounded-md bg-slate-100 text-black px-3 w-96 text-xl transition-all ease-in" />
                </div>

                <button className="text-black bg-slate-300 hover:bg-slate-100 hover:font-bold px-4 py-1 rounded-lg self-end transition-all ease-in" onClick={() => handleItemSelect(userInput)}>POST</button>
            </div>
        </Dialog>
    );
};

export default AddGoalDialog;