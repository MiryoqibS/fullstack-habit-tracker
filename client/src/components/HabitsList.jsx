import React from "react";
import { HabitItem } from "./HabitItem";

export const HabitsList = ({ habits, deleteHabit }) => {
    return (
        <div className="flex flex-col w-full gap-2">
            {habits.map((habit) => (
                <HabitItem
                    key={habit.id}
                    habit={habit}
                    deleteHabit={deleteHabit}
                />
            ))}
        </div>
    );
};
