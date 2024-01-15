import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Heading from "../../components/utilities/Heading";
import TextContent from "../../components/utilities/TextContent";

import HomeIcon from "./navIcon.svg";
import BackIcon from "./navIcon2.svg";

import { loginUser, registerUser } from "../../utils/auth";
import { AUTH_TOKEN } from "../../constants";

const Broken = () => {
    const [formData, setFormData] = useState({
        username: "",
        pass: "",
        email: "",
        name: "",
        newUser: false
    });

    const [errorData, setErrorData] = useState({ state: false, msg: "" });
    const [easterCounter, setEasterCounter] = useState(0);
    const navigate = useNavigate();

    const handleEasterClick = () => {
        if (easterCounter >= 2) {
            setFormData({ ...formData, newUser: !formData.newUser });
        }

        else {
            setEasterCounter(easterCounter + 1);
        }
    }

    const handleFormSubmit = () => {
        if (!formData.newUser) {
            loginUser(formData)
                .then(({ data: { token } }) => {
                    localStorage.setItem(AUTH_TOKEN, token);
                    setErrorData({
                        state: false,
                        msg: ""
                    })
                    navigate('/fix');
                })
                .catch((err) => {
                    setErrorData({
                        state: true,
                        msg: err.message
                    });

                    console.error(err);
                })
        } else {
            registerUser(formData)
                .then(({ data: { token } }) => {
                    localStorage.setItem(AUTH_TOKEN, token);
                    setErrorData({
                        state: false,
                        msg: ""
                    })
                    navigate('/fix');
                })
                .catch((err) => {
                    setErrorData({
                        state: true,
                        msg: err.message
                    });

                    console.error(err);
                })
        }
    }
    return (
        <div className="pt-16 pb-20">
            <Heading>{formData.newUser ? "Fixed" : "Broken"}</Heading>

            <div className="userInputContainer w-5/6 xl:w-1/2 mx-auto mt-10">
                <form className="flex flex-col items-center">
                    <div className="userInput grid grid-rows-2 my-3 w-5/6 md:w-1/2">
                        <label htmlFor="username" className="text-2xl mb-2">Problem</label>
                        <input
                            type="text"
                            placeholder="Enter your problem"
                            value={formData.username}
                            onChange={(e) => setFormData({
                                ...formData,
                                username: e.target.value
                            })}
                            id="username"
                            className={`outline-none rounded-md bg-gray-400/30 text-black px-3 text-lg focus-visible:bg-black/25 focus-visible:text-white transition-all ease-in ${errorData.state ? "border-red-500 border-2" : ""}`}
                        />
                    </div>

                    <div className="userInput grid grid-rows-2 my-3 w-5/6 md:w-1/2">
                        <label htmlFor="pass" className="text-2xl mb-2">Solution</label>
                        <input
                            type="password"
                            placeholder="Enter your Solution"
                            value={formData.pass}
                            onChange={(e) => setFormData({
                                ...formData,
                                pass: e.target.value
                            })}
                            id="pass"
                            className={`outline-none rounded-md bg-gray-400/30 text-black px-3 text-lg focus-visible:bg-black/25 focus-visible:text-white transition-all ease-in ${errorData.state ? "border-red-500 border-2" : ""}`}
                        />
                    </div>

                    {formData.newUser && (
                        <div className="userInput grid grid-rows-2 my-3 w-5/6 md:w-1/2">
                            <label htmlFor="email" className="text-2xl mb-2">e-Address</label>
                            <input
                                type="email"
                                placeholder="Enter your e-Address"
                                value={formData.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    email: e.target.value
                                })}
                                id="email"
                                className={`outline-none rounded-md bg-gray-400/30 text-black px-3 text-lg focus-visible:bg-black/25 focus-visible:text-white transition-all ease-in ${errorData.state ? "border-red-500 border-2" : ""}`}
                            />
                        </div>)}

                    {formData.newUser && (
                        <div className="userInput grid grid-rows-2 my-3 w-5/6 md:w-1/2">
                            <label htmlFor="name" className="text-2xl mb-2">Pseudoname</label>
                            <input
                                type="text"
                                placeholder="Enter your pseudoname"
                                value={formData.name}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    name: e.target.value
                                })}
                                id="name"
                                className={`outline-none rounded-md bg-gray-400/30 text-black px-3 text-lg focus-visible:bg-black/25 focus-visible:text-white transition-all ease-in ${errorData.state ? "border-red-500 border-2" : ""}`}
                            />
                        </div>
                    )}

                    {errorData.state && (
                        <div className="w-5/6 md:w-1/2 mt-4">
                            <span className="text-red-500 text-left text-lg">{errorData.msg}</span>
                        </div>
                    )}
                </form>
            </div>

            <TextContent>
                <div className="font-light">
                    <span>
                        This page is
                    </span>
                    <button className={`${formData.newUser ? "line-through" : "animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_3]"} ml-2`}
                        onClick={() => handleEasterClick()}
                    >broken</button>
                    <span className="ml-2 mt-2 md:mt-0 inline-block">
                        {formData.newUser ? "fixed" : ""}
                    </span>
                </div>

                <div className="mt-2 font-light">
                    <button type="button" onClick={handleFormSubmit} className="mr-2 font-bold">Go</button>
                    <span>
                        back to home!
                    </span>
                </div>
            </TextContent>

            <div className="fixed bottom-4 right-4 flex flex-col md:flex-row">
                <Link onClick={() => navigate(-1)} className="w-5 mb-4 md:mb-0 md:mr-4">
                    <img className="" alt="home sceen nav icon" src={BackIcon}></img>
                </Link>

                <Link to={"/"}
                    className="w-5"
                >
                    <img className="" alt="home sceen nav icon" src={HomeIcon}></img>
                </Link>
            </div>
        </div>
    );
};

export default Broken;