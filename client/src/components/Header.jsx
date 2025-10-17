import React, { useState } from 'react'
import { CalendarIcon } from 'lucide-react';
import { WeekSlider } from './WeekSlider';
import { Calendar } from './Calendar';

export const Header = () => {
    const [showCalendar, setShowCalendar] = useState(false);

    const formatDate = (date) => {
        return Intl.DateTimeFormat("ru-RU", {
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    };

    return (
        <>
            <div className="w-full flex flex-col items-start gap-4">
                <div className="flex w-full gap-2 justify-between">
                    <div className="flex flex-col items-start gap-2">
                        <h3 className="text-4xl font-medium">Сегодня</h3>
                        <p className="text-md">{formatDate(Date.now())}</p>
                    </div>

                    <button
                        onClick={() => setShowCalendar(true)}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all
                 bg-background-dark text-text-dark/70 dark:bg-white dark:text-text-light/70
                 cursor-pointer hover:shadow-md hover:text-text-dark hover:scale-105 dark:hover:text-text-light
                 ">
                        <CalendarIcon size={20} />
                    </button>
                </div>

                <WeekSlider />
            </div>

            <Calendar
                show={showCalendar}
                onClose={() => setShowCalendar(false)}
            />
        </>
    )
}
