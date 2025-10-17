import React from "react";

export const Card = ({ children, className = "" }) => {
    return (
        <div className={`rounded-xl border bg-white dark:bg-gray-800 shadow ${className}`}>
            {children}
        </div>
    );
};