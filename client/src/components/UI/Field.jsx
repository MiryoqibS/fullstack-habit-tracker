import React from 'react';
import { Input } from "./Input";

export const Field = ({ title, ...inputProps }) => {
    return (
        <div className="flex flex-col gap-2 items-start w-full">
            <p className="text-xl font-medium">{title}</p>
            <Input {...inputProps} className="w-full" />
        </div>
    )
}
