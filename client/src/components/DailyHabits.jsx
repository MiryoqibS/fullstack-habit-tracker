import React, { useContext } from 'react'
import { HabitsList } from './HabitsList';
import { Loader } from './Loader';
import { habitsContext } from "../contexts/habitsContext";
import { HabitsFilter } from './HabitsFilter';

export const DailyHabits = () => {
    const {
        getFilteredHabits,
        isLoading,
        setFilter,
        filter,
        handleDeleteHabit,
        handleStarHabit,
        handleUpdateHabit,
    } = useContext(habitsContext);
    if (isLoading) return <Loader />

    return (
        <div className="flex flex-col items-start gap-4">
            <h3 className="text-2xl">Сегодняшние привычки</h3>
            <HabitsFilter
                habits={getFilteredHabits()}
                changeFilter={setFilter}
                filter={filter}
            />
            <HabitsList
                habits={getFilteredHabits()}
                deleteHabit={handleDeleteHabit}
                starHabit={handleStarHabit}
                updateHabit={handleUpdateHabit}
            />
        </div>
    );
};
