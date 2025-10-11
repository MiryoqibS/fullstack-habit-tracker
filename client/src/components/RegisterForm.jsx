import React, { useContext } from 'react';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import { Field } from './UI/Field';
import { api } from '../api/axios';
import { authContext } from '../contexts/authContext';

export const RegisterForm = () => {
    const { fields, onFieldChange, clearFields } = useForm({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
    });

    const navigate = useNavigate();
    const { setUser } = useContext(authContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(fields);
            const { data } = await api.post("/register", fields);

            setUser(data.user);
            localStorage.setItem("token", data.accessToken);
            navigate("/");
        } catch (error) {
            console.log(`Произошла ошибка во время регистрации: ${error.message}`);
        } finally {
            clearFields();
        };
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
            action="!#"
        >
            <h3 className="transition-colors text-4xl text-gray-900 font-medium dark:text-gray-200">Регистрация</h3>

            {/* Имя пользователя */}
            <Field
                title="Имя пользователя"
                value={fields["username"]}
                onChange={(e) => onFieldChange("username", e.target.value)}
                type="text"
            />

            {/* Электронная почта */}
            <Field
                title="Электонная почта"
                value={fields["email"]}
                onChange={(e) => onFieldChange("email", e.target.value)}
                type="email"
            />

            {/* Пароль */}
            <Field
                title="Пароль"
                value={fields["password"]}
                onChange={(e) => onFieldChange("password", e.target.value)}
                type="password"
            />

            {/* Подтвердите пароль */}
            <Field
                title="Подтвердите пароль"
                value={fields["passwordRepeat"]}
                onChange={(e) => onFieldChange("passwordRepeat", e.target.value)}
                type="password"
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
                регистрация
            </button>

            <p
                onClick={() => navigate("/login")}
                className="transition-colors cursor-pointer text-sm 
                font-medium mr-auto text-indigo-800 hover:text-indigo-900"
            >Уже есть аккаунт?</p>
        </form>
    )
}
