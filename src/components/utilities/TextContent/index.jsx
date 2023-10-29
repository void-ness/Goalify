import React from "react";

const TextContent = ({ children, align }) => {
    return (
        <div className="text-center text-3xl md:text-4xl mt-16 mx-auto w-5/6 md:w-full leading-8" style={{ textAlign: align ?? "center" }}>
            {children}
        </div>
    );
};

export default TextContent;