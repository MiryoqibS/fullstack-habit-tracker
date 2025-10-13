import React, { useEffect, useState } from "react";
import { habitsContext } from "../contexts/habitsContext";
import { api } from "../api/axios";

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHabits = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get("/habits");
                setHabits(data.habits);
            } catch (error) {
                console.log(`Произошла ошибка при получении привычек: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHabits();
    }, []);

    const handleDeleteHabit = async (id) => {
        const updatedHabits = habits.filter(habit => habit.id !== id);
        setHabits(updatedHabits);

        try {
            await api.delete(`/habits/${id}`);
        } catch (error) {
            console.log(`Произошла ошибка при удалении привычки: ${error.message}`);
        };
    };

    return (
        <habitsContext.Provider value={{ habits, isLoading, handleDeleteHabit }}>
            {children}
        </habitsContext.Provider>
    )
}
