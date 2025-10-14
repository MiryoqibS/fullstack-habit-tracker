import { CalendarArrowDownIcon, CalendarArrowUpIcon, StarIcon, TextAlignStart } from 'lucide-react'
import React from 'react'

export const HabitsFilter = ({ filter, changeFilter }) => {
    const filterButtonClass = (buttonFilter) => {
        return `
            flex items-center justify-center h-8 w-8 rounded border transition-colors cursor-pointer
            ${filter === buttonFilter ? "bg-white shadow-lg border-gray-300 text-indigo-700" : "border-gray-400 bg-gray-300"}`;
    };

    return (
        <div className="flex w-full gap-2">
            <button
                onClick={() => changeFilter("all")}
                className={filterButtonClass("all")}
            >
                <TextAlignStart size={16} />
            </button>
            <button
                onClick={() => changeFilter("starred")}
                className={filterButtonClass("starred")}
            >
                <StarIcon size={16} />
            </button>
            <button
                onClick={() => changeFilter("oldest")}
                className={filterButtonClass("oldest")}
            >
                <CalendarArrowDownIcon size={16} />
            </button>
            <button
                onClick={() => changeFilter("newest")}
                className={filterButtonClass("newest")}
            >
                <CalendarArrowUpIcon size={16} />
            </button>
        </div >
    )
}
