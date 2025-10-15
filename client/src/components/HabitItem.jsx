import React, { useState } from "react";
import { HabitEditForm } from "./HabitEditForm";
import { HabitView } from "./HabitView";

export const HabitItem = ({ habit, deleteHabit, starHabit, updateHabit, completeHabit, weekday }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateHabit = async (updatedHabit) => {
        setIsEditing(false);

        try {
            await updateHabit(habit.id, updatedHabit);
        } catch (error) {
            console.log(`Произошла ошибка при обновлении задачи: ${error.message}`);
        };
    };

    return isEditing ?
        <HabitEditForm
            habit={habit}
            updateHabit={handleUpdateHabit}
        />
        :
        <HabitView
            habit={habit}
            deleteHabit={deleteHabit}
            starHabit={starHabit}
            editHabit={() => setIsEditing(true)}
            completeHabit={completeHabit}
            weekday={weekday}
        />;
}
