import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BellIcon, ChartNoAxesColumn, HomeIcon, LogInIcon, PlusIcon, SettingsIcon, UserIcon } from "lucide-react";
import { authContext } from '../contexts/authContext';

export const Navbar = () => {
    const { user, setUser } = useContext(authContext);

    const navLinkClass = ({ isActive }) => {
        return `
        flex items-center justify-center w-12 h-12 
        rounded-xl cursor-pointer transition-all
        text-gray-500 dark:text-gray-400
        hover:text-indigo-600 dark:hover:text-indigo-400
        hover:bg-gray-100 dark:hover:bg-gray-800
        ${isActive ?
                "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-md scale-110"
                :
                ""
            }
        `
    };

    return (
        <nav className="transition-colors flex gap-3 p-3 justify-center bg-gray-300 dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-gray-400 dark:border-gray-800">
            <NavLink
                to="/"
                className={navLinkClass}
            >
                <HomeIcon />
            </NavLink>

            <NavLink
                to="/addHabit"
                className={navLinkClass}
            >
                <PlusIcon />
            </NavLink>

            {user ?
                (
                    <>
                        <NavLink
                            to="/account"
                            className={navLinkClass}
                        >
                            <UserIcon />
                        </NavLink>
                        <NavLink
                            to="/statistics"
                            className={navLinkClass}
                        >
                            <ChartNoAxesColumn />
                        </NavLink>
                        <NavLink
                            to="/notifications"
                            className={navLinkClass}
                        >
                            <BellIcon />
                        </NavLink>
                    </>
                ) :
                (
                    <>
                        <NavLink
                            to="/login"
                            className={navLinkClass}
                        >
                            <LogInIcon />
                        </NavLink>
                    </>
                )}

            <NavLink
                to="/settings"
                className={navLinkClass}
            >
                <SettingsIcon />
            </NavLink>
        </nav>
    )
};