import React, { useEffect, useState } from 'react'
import { authContext } from '../contexts/authContext';
import { api } from '../api/axios';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/profile");
                setUser(data.user);
            } catch (error) {
                console.log(`Ошибка авторизации: ${error.message}`);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return (
        <authContext.Provider value={{ user, setUser, isLoading, isAuthenticated: !!user }}>
            {children}
        </authContext.Provider>
    );
};
