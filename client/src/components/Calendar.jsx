import React, { useState } from 'react'
import { Modal } from './Modal'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export const Calendar = ({ show, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevDate = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextDate = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const weekdays = ["Пн", "Вт", "Ср", "Чг", "Пт", "Сб", "Вс"];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthLastDay = new Date(year, month + 1, 0);
    const monthFirstDay = new Date(year, month, 1);
    let firstWeekday = monthFirstDay.getDay();
    if (firstWeekday === 0) firstWeekday = 7;

    const calendarTitle = Intl.DateTimeFormat("ru-RU", {
        month: "long",
        year: "numeric",
    }).format(currentDate);

    const calendarDays = [];
    calendarDays.push(...Array.from({ length: firstWeekday - 1 }, () => ""));
    for (let day = monthFirstDay.getDate(); day <= monthLastDay.getDate(); day++) {
        calendarDays.push(day);
    };

    const today = new Date().getDate();
    const todayWeekdayIndex = new Date().getDay() || 7;
    const isCurrentMonth = new Date().getMonth() === currentDate.getMonth();

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Календарь"
        >
            <div className="flex flex-col gap-4 py-4 rounded-xl">
                <div className="flex items-center justify-between">
                    <button
                        className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full bg-gray-300 shadow-lg transition-colors hover:bg-gray-400"
                        onClick={handlePrevDate}
                    >
                        <ArrowLeftIcon size={16} />
                    </button>

                    <p className={`text-xl font-medium ${isCurrentMonth ? "text-indigo-600" : ""}`}>{calendarTitle}</p>

                    <button
                        className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full bg-gray-300 shadow-lg transition-colors hover:bg-gray-400"
                        onClick={handleNextDate}
                    >
                        <ArrowRightIcon size={16} />
                    </button>
                </div>

                <span className="h-0.5 w-full bg-gray-900/30"></span>

                <div className="grid grid-cols-7 gap-2 w-full border-collapse">
                    {weekdays.map((weekday, i) => (
                        <div
                            key={weekday}
                            className={`text-center font-medium text-lg 
                                ${i + 1 === todayWeekdayIndex && isCurrentMonth ? "text-indigo-500" : ""}`}
                        >{weekday}</div>
                    ))}

                    {calendarDays.map((day, i) => (
                        <div
                            key={i}
                            className={`
                                flex items-center justify-center
                                w-full aspect-square text-lg font-medium
                                transition-colors cursor-pointer rounded-xl
                                hover:bg-indigo-900/70 hover:text-white
                                ${day === today && isCurrentMonth ?
                                    "border-2 border-indigo-900/80"
                                    : ""}
                            `}>{day}</div>
                    ))}
                </div>

            </div>
        </Modal >
    )
}
