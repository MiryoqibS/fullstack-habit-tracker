import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AuthProvider } from '../providers/AuthProvider';
import { ToggleTheme } from './ToggleTheme';

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useTheme } from '../hooks/useTheme';

export const Layout = () => {
    const { theme } = useTheme();

    return (
        <AuthProvider>
            <div className="container mx-auto max-w-[500px] min-h-screen flex flex-col py-10">
                <ToggleTheme />

                <main className="flex-1 relative">
                    <Outlet />
                </main>

                <Navbar />
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme={theme}
            />
        </AuthProvider>
    );
}
