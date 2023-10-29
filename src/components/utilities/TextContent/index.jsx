import React from "react";

const TextContent = ({ children, align }) => {
    return (
        <div className="text-center text-4xl mt-20 w-5/6 md:w-full" style={{ textAlign: align ?? "center" }}>
            {children}
        </div>
    );
};

export default TextContent;