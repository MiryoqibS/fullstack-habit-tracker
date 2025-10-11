import React from 'react'

export const Button = ({ children, handleClick, type = "button", ...props }) => {
    return (
        <button
            onClick={handleClick}
            type={type}
            className="mt-6 px-4 py-2 rounded 
                bg-gray-300 border border-gray-400 text-gray-900 hover:bg-gray-400
                text-md font-semibold cursor-pointer transition-colors
                dark:bg-gray-900 dark:border-gray-700 dark:text-white
                dark:hover:bg-gray-800 dark:hover:text-gray-400"
        >
            {children}
        </button>
    )
}
