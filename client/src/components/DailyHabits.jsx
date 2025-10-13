import React, { useContext } from 'react'
import { HabitsList } from './HabitsList';
import { Loader } from './Loader';
import { habitsContext } from "../contexts/habitsContext";

export const DailyHabits = () => {
    const { habits, isLoading, handleDeleteHabit } = useContext(habitsContext);
    if (isLoading) return <Loader />
    if (habits.length === 0) return "привычек на сегодня нет...";

    return (
        <div className="flex flex-col items-start gap-4">
            <h3 className="text-2xl">Сегодняшние привычки</h3>
            <HabitsList
                habits={habits}
                deleteHabit={handleDeleteHabit}
            />
        </div>
    );
};
