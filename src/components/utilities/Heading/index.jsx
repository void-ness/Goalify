import React from "react";

const Heading = ({ children }) => {
    return (
        <h2 className="text-6xl text-center uppercase">
            {children}
        </h2>
    );
};

export default Heading;