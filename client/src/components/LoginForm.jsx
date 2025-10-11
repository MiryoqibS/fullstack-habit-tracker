import React, { useContext } from 'react'
import { useForm } from '../hooks/useForm'
import { Field } from './UI/Field';
import { UserIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { api } from '../api/axios';
import { authContext } from '../contexts/authContext';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../utils/validators';

export const LoginForm = () => {
    const { fields, onFieldChange, clearFields } = useForm({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { setUser } = useContext(authContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(fields);
            const { data } = await api.post("/login", fields, {
                validateStatus: () => true,
            });

            if (!data.success) {
                const { message } = data;
                toast.error(message);
            } else {
                setUser(data.user);
                localStorage.setItem("token", data.accessToken);
                navigate("/");
            };
        } catch (error) {
            console.log(`Произошла ошибка во время авторизации: ${error}`);
        } finally {
            clearFields();
        };
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
        >
            <h3 className="transition-colors text-4xl text-gray-900 font-medium dark:text-gray-200">Авторизация</h3>

            {/* Электронная почта */}
            <Field
                title="Электонная почта"
                value={fields["email"]}
                onChange={(e) => onFieldChange("email", e.target.value)}
                type="email"
                validation={validateEmail}
            />

            {/* Пароль */}
            <Field
                title="Пароль"
                value={fields["password"]}
                onChange={(e) => onFieldChange("password", e.target.value)}
                type="password"
                validation={validatePassword}
            />

            {/* Кнопка отправки */}
            <button
                type="submit"
                className="
                flex items-center gap-1
                mt-auto bg-gray-200 border border-gray-300
                rounded text-md font-semibold px-4 py-1 cursor-pointer
                transition-all hover:bg-gray-300
                dark:bg-gray-900 dark:text-white dark:border-gray-800
                dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400
                "
            >
                <UserIcon size={16} />
                войти
            </button>

            <p
                onClick={() => navigate("/register")}
                className="transition-colors cursor-pointer text-sm 
                font-medium mr-auto text-indigo-800 hover:text-indigo-900"
            >Нету аккаунта?</p>
        </form>
    )
}
