import React from "react";

export const Loader = () => {
    return (
        <div className="flex justify-center items-center h-full mt-6">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
};