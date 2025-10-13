import React from 'react'
import { DailyHabits } from '../components/DailyHabits'
import { Header } from "../components/Header";
import { HabitProvider } from "../providers/HabitProvider";

export const HomePage = () => {
  return (
    <HabitProvider>
      <div className="flex flex-col">
        <Header />
        <DailyHabits />
      </div>
    </HabitProvider>
  )
}
