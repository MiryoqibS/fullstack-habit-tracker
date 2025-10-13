import React, { useState, useEffect } from "react";
import { api } from "../api/axios";

export const WeekSlider = () => {
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [days, setDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDays = async () => {
            try {
                setIsLoading(true);
                const { data } = await api.get("/habits/stats");
                setDays(data.stats);
                console.log(data.stats);

            } catch (error) {
                console.log(`Произошла ошибка при получении статистки недели: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDays();
    }, []);

    if (isLoading) return <p>Идёт загрузка...</p>

    return (
        <div className="flex gap-4 overflow-x-auto px-2 py-3 no-scrollbar">
            {days.map((day) => {
                const progress = day.totalHabits === 0 ? 0 : (day.habitsCompleted / day.totalHabits) * 100;
                const isActive = day.day === selectedDay;

                return (
                    <button
                        key={day.day}
                        onClick={() => setSelectedDay(day.day)}
                        className={`relative w-14 h-14 flex items-center justify-center rounded-full transition
                            bg-slate-800 text-gray-200 cursor-pointer hover:ring-2 hover:ring-pink-400
                        ${isActive ? "ring-2 ring-pink-500" : "ring-1 ring-gray-600"}    
                        `}
                    >
                        <svg className="absolute w-full h-full -rotate-90">
                            <circle
                                cx="28"
                                cy="28"
                                stroke="gray"
                                strokeWidth="4"
                                fill="none"
                            />
                            <circle
                                cx="28"
                                cy="28"
                                r="25"
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 25}`}
                                strokeDashoffset={`${2 * Math.PI * 25 * (1 - progress / 100)}`}
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="z-10 flex flex-col items-center justify-center">
                            <span className="text-sm font-medium">
                                {day.day}
                            </span>
                            <span className="text-xs">
                                {day.weekday}
                            </span>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
