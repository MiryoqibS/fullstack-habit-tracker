import React, { useRef, useState } from 'react'
import { Tooltip } from "./UI/Tooltip";
import { CheckIcon } from 'lucide-react';
import { Input } from './UI/Input';

export const HabitEditForm = ({ habit, updateHabit }) => {
    const [showSaveTooltip, setShowSaveTooltip] = useState(false);

    const [editHabit, setEditHabit] = useState({
        title: habit.title,
        description: habit.description,
        daysOfWeek: habit.daysOfWeek,
    });

    const toggleSelectedDay = (day) => {
        const daysOfWeek = [...editHabit.daysOfWeek];
        const updatedDaysOfWeek = daysOfWeek.includes(day) ?
            daysOfWeek.filter(d => d !== day)
            : [...daysOfWeek, day].sort((a, b) => a - b);

        setEditHabit((prev) => ({ ...prev, daysOfWeek: updatedDaysOfWeek }));
    };

    const handleUpdate = async () => await updateHabit(editHabit);

    const weekdays = {
        0: "Пн",
        1: "Вт",
        2: "Ср",
        3: "Чг",
        4: "Пт",
        5: "Сб",
        6: "Вс",
    };

    const saveButtonRef = useRef(null);

    return (
        <div
            className="flex flex-1 gap-2 bg-gray-300 p-2 rounded border-2 border-gray-400
            dark:bg-gray-900 dark:border-gray-800"
        >
            <div className="flex flex-1 items-end justify-between gap-2">
                <div className="flex w-full h-full flex-col justify-between items-start gap-2">
                    <p className="mb-auto text-xs font-medium text-indigo-600 underline dark:text-indigo-500">привычка</p>
                    <Input
                        value={editHabit["title"]}
                        onChange={(e) => setEditHabit((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                        value={editHabit["description"]}
                        onChange={(e) => setEditHabit((prev) => ({ ...prev, description: e.target.value }))}
                    />

                    <div className="flex items-center gap-2">
                        {Object.keys(weekdays).map(day => (
                            <div
                                key={day}
                                onClick={() => toggleSelectedDay(+day)}
                                className={`flex items-center justify-center w-10 h-10 
                                p-2 rounded-full aspect-square cursor-pointer transition-colors
                                border-2bg-gray-300 border-gray-400 hover:bg-gray-400
                                dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-indigo-900/30
                                ${editHabit.daysOfWeek.includes(+day) ? "bg-indigo-900/30" : "bg-gray-300"}
                                `}
                            >
                                <p>{weekdays[day]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-start justify-end">
                    <div className="relative">
                        <button
                            ref={saveButtonRef}
                            className="flex items-center justify-center w-8 h-8
                            bg-white rounded-xl p-1 cursor-pointer shadow-lg
                            transition-colors hover:text-indigo-600
                            dark:bg-gray-800 dark:text-gray-300
                            dark:hover:text-gray-400 dark:hover:bg-indigo-900/30"
                            onMouseOver={() => setShowSaveTooltip(true)}
                            onMouseLeave={() => setShowSaveTooltip(false)}
                            onClick={handleUpdate}
                        >
                            <CheckIcon size={16} />
                        </button>
                        <Tooltip targetRef={saveButtonRef} show={showSaveTooltip}>
                            Изменить привычку
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}
