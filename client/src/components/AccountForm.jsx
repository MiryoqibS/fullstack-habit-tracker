import React, { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../contexts/authContext";
import { CheckIcon, ImageUpIcon, PenIcon } from "lucide-react";
import { Input } from "./UI/Input";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export const AccountForm = () => {
    const { user, isLoading, isAuthenticated } = useContext(authContext);
    const [isBioEditing, setIsBioEditing] = useState(false);
    const [isUsernameEditing, setIsUsernameEditing] = useState(false);
    const [profile, setProfile] = useState({ ...user });
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    const bioInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const usernameInputRef = useRef(null);

    // == Защита от не авторизированного пользователя ==
    useEffect(() => {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    // == Просмотр изменения данных пользователя ==
    useEffect(() => {
        if (isBioEditing && bioInputRef.current) {
            bioInputRef.current.focus();
        };
    }, [isBioEditing]);

    if (isLoading) return (<p>Идёт загрузка...</p>);
    if (!user) return (<p>Ошибка авторизации</p>);

    // == Обновление данных пользователя ==
    const handleUpdateProfile = async () => {
        if (JSON.stringify(user) === JSON.stringify(profile)) return;

        setIsBioEditing(false);
        setIsUpdating(true);

        const oldUser = { ...user };
        const newUser = { ...profile };

        try {
            const { data } = await api.put("/update", newUser);
            setProfile(data.user);
        } catch (error) {
            console.log(`Произошла ошибка при изменение данных пользователя: ${error.message}`);
            setProfile(oldUser);
        } finally {
            setIsUpdating(false);
        };
    };

    // == Обновление фото профиля ==
    const handleUpdateAvatar = async (file) => {
        try {
            const formData = new FormData();
            formData.append("avatar", file);
            const { data } = await api.post("/profile/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const newUser = { ...profile, avatarUrl: data.avatarUrl };
            setProfile(newUser);
        } catch (error) {
            console.log(error);
        };
    };

    if (isUpdating) return <p className="text-blue-600 font-medium text-xs">Идёт загрузка...</p>

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <div
                    onClick={() => fileInputRef.current.click()}
                    className="relative flex items-center justify-center group cursor-pointer"
                >
                    <img
                        className="w-24 h-24 rounded-full transition-opacity group-hover:opacity-80"
                        src={profile.avatarUrl}
                        alt={`фото профиля ${profile.username}`}
                    />
                    <ImageUpIcon size={16} className="
                    color-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    transition-opacity opacity-0 group-hover:opacity-100"
                    />
                    {/* не видимый input для выбора фото */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpdateAvatar(e.target.files[0])}
                    />
                </div>

                <div className="flex flex-col items-start gap-1 group">
                    {isUsernameEditing ? (
                        <div className="flex-1 flex gap-2">
                            <Input
                                ref={usernameInputRef}
                                value={profile["username"]}
                                onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                                type="text"
                                placeholder="введите имя пользователя"
                            />

                            <button
                                onClick={() => {
                                    setIsUsernameEditing(false);
                                    handleUpdateProfile();
                                }}
                                className="
                    flex items-center justify-center 
                    px-3 py-1 rounded bg-green-700 text-white 
                    font-medium cursor-pointer text-xs
                    transition-colors hover:bg-green-800 hover:text-gray-300">
                                <CheckIcon size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-start gap-2">
                            <h3 className="text-2xl font-medium">{profile.username}</h3>
                            <button
                                onClick={() => setIsUsernameEditing(true)}
                                className="flex items-center justify-center cursor-pointer transition-opacity opacity-0 group-hover:opacity-100">
                                <PenIcon size={12} />
                            </button>
                        </div>
                    )}

                    <p>{profile.email}</p>
                </div>
            </div>

            {isBioEditing ? (
                <div className="flex-1 flex gap-2">
                    <Input
                        ref={bioInputRef}
                        value={profile["bio"]}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        type="text"
                        placeholder="введите биографию"
                    />

                    <button
                        onClick={() => {
                            setIsBioEditing(false);
                            handleUpdateProfile();
                        }}
                        className="
                    flex items-center justify-center 
                    px-3 py-1 rounded bg-green-700 text-white 
                    font-medium cursor-pointer text-xs
                    transition-colors hover:bg-green-800 hover:text-gray-300">
                        <CheckIcon size={16} />
                    </button>
                </div>
            ) : (
                <div className="flex items-start gap-2 group">
                    <p className="text-sm font-medium">{profile.bio || "у пользователя нету биографии"}</p>
                    <button
                        onClick={() => setIsBioEditing(true)}
                        className="flex items-center justify-center transition-opacity cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                        <PenIcon size={12} />
                    </button>
                </div>
            )}
        </div>
    )
}
