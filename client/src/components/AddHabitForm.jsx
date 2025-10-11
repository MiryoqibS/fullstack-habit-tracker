import React, { useState } from 'react'
import { Field } from './UI/Field';
import { Button } from './UI/Button';
import { api } from "../api/axios";

export const AddHabitForm = () => {
    const [habitTitle, setHabitTitle] = useState("");
    const [habitDescription, setHabitDescription] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);

    const toggleDay = (id) => {
        setSelectedDays((prev) =>
            prev.includes(id) ?
                prev.filter((day) => day !== id)
                :
                [...prev, id].sort((a, b) => a - b)
        );
    };

    const days = [
        { id: 0, label: "Пн" },
        { id: 1, label: "Вт" },
        { id: 2, label: "Ср" },
        { id: 3, label: "Чт" },
        { id: 4, label: "Пт" },
        { id: 5, label: "Сб" },
        { id: 6, label: "Вс" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const habit = {
            title: habitTitle,
            description: habitDescription,
            daysOfWeek: selectedDays,
        };

        const { data } = await api.post("/habits", habit);
        console.log(data);


        setHabitTitle("");
        setHabitDescription("");
        setSelectedDays([]);
    };

    return (
        <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-bold">Добавить привычку</h1>

            <Field
                title="Заголовок привычки"
                value={habitTitle}
                onChange={(e) => setHabitTitle(e.target.value)}
                placeholder="..."
            />

            <Field
                title="Описание привычки"
                value={habitDescription}
                onChange={(e) => setHabitDescription(e.target.value)}
                placeholder="..."
            />

            <div className="w-full flex items-center gap-2 justify-between px-2">
                {days.map((day) => (
                    <button
                        key={day.id}
                        type="button"
                        onClick={() => toggleDay(day.id)}
                        className={`flex items-center justify-center w-12 h-12 rounded-full text-lg 
                        p-4 font-medium cursor-pointer transition-colors border
                        bg-gray-300 border-gray-400 hover:bg-gray-400
                        dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-indigo-900/30
                        ${selectedDays.includes(day.id) ? "!bg-indigo-900/30" : ""}
                        `}
                    >
                        {day.label}
                    </button>
                ))}
            </div>

            <Button type="submit">Добавить</Button>
        </form>
    );
};
