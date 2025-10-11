import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { api } from '../api/axios';

export const DailyHabits = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            const { data } = await api.get("/habits/today");
            setHabits(data.habits);
        };
        fetchHabits();
    }, []);

    if (habits.length === 0) return "привычек на сегодня нет...";

    return (
        <div>
            {habits.map((habit) => (
                <div
                    key={habit.id}
                    className=''
                >
                    <p>{habit.title}</p>
                </div>
            ))}
        </div>
    );
};
