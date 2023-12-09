import React from "react";

const LinkDialog = ({ open, link, onClose }) => {

    const handleClose = () => {
        onClose(!open);
    }

    return (
        <>
            {open ? (
                <div className="fixed top-0 w-4/5 sm:w-1/2 sm:left-1/4 left-[10%]">
                    <div className="bg-gray-300 shadow-2xl shadow-black rounded-md lg:w-3/5 mx-auto mt-2 text-black text-sm sm:text-base relative px-4 pt-4 pb-6">
                        <div className="flex flex-col items-start text-left">
                            <span className="mb-2 sm:mb-0">
                                Here's your shareable public link
                            </span>
                            <span className="font-bold">
                                {link}
                            </span>
                        </div>

                        <div className="absolute top-2 sm:top-1 font-bold right-4">
                            <button onClick={handleClose}>X</button>
                        </div>
                    </div>
                </div>) : (<div></div>)
            }
        </>
    );
};

export default LinkDialog;