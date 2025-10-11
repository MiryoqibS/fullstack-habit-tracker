import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AddHabitPage } from "./pages/AddHabitPage";
import { SettingsPage } from "./pages/SettingsPage";
import { StatisticsPage } from './pages/StatisticsPage';
import { NotFoundPage } from "./pages/NotFoundPage";
import { AccountPage } from './pages/AccountPage';


export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/addHabit" element={<AddHabitPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/statics" element={<StatisticsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};