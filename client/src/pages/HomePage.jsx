import React from 'react'
import { DailyHabits } from '../components/DailyHabits'
import { Header } from "../components/Header";

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <DailyHabits />
    </div>
  )
}
