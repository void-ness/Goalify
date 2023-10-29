import React from "react";

const TextContent = ({ children, align }) => {
    return (
        <div className="text-center text-4xl mt-20" style={{ textAlign: align ?? "center" }}>
            {children}
        </div>
    );
};

export default TextContent;