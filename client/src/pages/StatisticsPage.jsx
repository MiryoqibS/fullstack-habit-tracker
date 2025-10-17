import React, { useContext, useMemo } from 'react';
import { habitsContext } from "../contexts/habitsContext";
import { StatsCards } from '../components/StatsCards';
import { WeeklyActivityChart } from '../components/WeeklyActivityChart';
import { Loader } from "../components/Loader";
import { HabitsPieChart } from '../components/HabitsPieChart';

export const StatisticsPage = () => {
    const { habits, isLoading } = useContext(habitsContext);
    const total = habits.length;
    const active = habits.filter(habit => habit.isActive).length;
    const starred = habits.filter(habit => habit.isStarred).length;
    const logs = habits.reduce((sum, h) => sum + h.logs.length, 0);

    const weekStats = useMemo(() => {
        const map = {
            0: { name: "Вс", value: 0 },
            1: { name: "Пн", value: 0 },
            2: { name: "Вт", value: 0 },
            3: { name: "Ср", value: 0 },
            4: { name: "Чг", value: 0 },
            5: { name: "Пт", value: 0 },
            6: { name: "Сб", value: 0 },
        };
        habits.forEach(habit => {
            habit.logs.forEach(date => {
                const day = new Date(date).getDay();
                console.log(`day: ${day}`);

                map[day].value += 1;
            })
        });
        console.log(map);

        return Object.values(map);
    }, [habits]);

    const pieData = [
        { name: "Активные", value: active },
        { name: "Избранные", value: starred },
        { name: "Неактивные", value: total - active },
    ];

    if (isLoading) return <Loader />

    return (
        <div className="p-6 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Статистика привычек
            </h1>
            <StatsCards
                total={total}
                active={active}
                starred={starred}
                logs={logs}
            />
            <WeeklyActivityChart data={weekStats} />
            <HabitsPieChart data={pieData} />
        </div>
    );
};