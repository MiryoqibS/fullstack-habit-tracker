import React, { useEffect, useState } from "react";
import { habitsContext } from "../contexts/habitsContext";
import { api } from "../api/axios";

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("all");

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

    const handleStarHabit = async (id) => {
        const updatedHabits = habits.map(
            (habit) => habit.id === id ?
                { ...habit, isStarred: !habit.isStarred }
                :
                habit
        );
        setHabits(updatedHabits);

        try {
            await api.post(`/habits/${id}/star`);
        } catch (error) {
            console.log(`Произошла ошибка при отметки привычки как избранную: ${error.message}`);
        }
    };

    const handleUpdateHabit = async (id, updatedFields) => {
        const updatedHabits = habits.map(
            (habit) => habit.id === id ?
                { ...habit, ...updatedFields }
                :
                habit
        );
        setHabits(updatedHabits);

        try {
            await api.put(`/habits/${id}`, updatedFields);
        } catch (error) {
            console.log(`Произошла ошибка при обновлении привычки: ${error.message}`);
        }
    }

    const getFilteredHabits = () => {
        switch (filter) {
            case "all":
                return habits;
            case "starred":
                return habits.filter(habit => habit.isStarred);
            case "oldest":
                return [...habits].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            case "newest":
                return [...habits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            default:
                return habits;
        }
    };

    return (
        <habitsContext.Provider value={{
            isLoading,
            filter,
            setFilter,
            getFilteredHabits,
            handleDeleteHabit,
            handleStarHabit,
            handleUpdateHabit,
        }}>
            {children}
        </habitsContext.Provider>
    )
}
