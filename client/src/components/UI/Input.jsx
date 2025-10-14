import React, { useEffect, useState } from 'react'

export const Input = ({
    value,
    onChange,
    type = "text",
    placeholder = "...",
    className = "",
    validation = () => ({ isValid: true, errorMessage: "" }),
    ...props
}) => {
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        console.log(isValid);
    }, [isValid]);

    return (
        <div className="flex flex-col w-full gap-1">
            <input
                className={`
            bg-gray-200 border-2 outline-none rounded p-2 dark:bg-gray-900
            placeholder:text-gray-900 placeholder:font-medium shadow-md
            dark:placeholder:text-gray-200 transition-all
            w-full ${isValid ? "border-gray-300 dark:border-gray-800" : "border-red-500 text-red-700"}
            ${className}
            `}
                type={type}
                value={value}
                onChange={(e) => {
                    onChange(e);
                    const { isValid, errorMessage } = validation(e.target.value);
                    setIsValid(isValid);
                    setErrorMessage(errorMessage);
                }}
                placeholder={placeholder}
                {...props}
            />
            {!isValid && (<p className="text-text font-medium text-red-600">{errorMessage}</p>)}
        </div>

    );
};
