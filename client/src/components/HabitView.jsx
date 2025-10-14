import React, { useState, useRef } from 'react';
import { Modal } from "./Modal";
import { CheckIcon, PenIcon, StarIcon, TrashIcon, ViewIcon } from "lucide-react";
import { Tooltip } from "./UI/Tooltip";

export const HabitView = ({ habit, deleteHabit, starHabit, editHabit }) => {
    const [showViewTooltip, setShowViewTooltip] = useState(false);
    const [showCheckTooltip, setShowCheckTooltip] = useState(false);
    const [showStarTooltip, setShowStarTooltip] = useState(false);
    const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
    const [showEditTooltip, setShowEditTooltip] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const viewButtonRef = useRef(null);
    const checkButtonRef = useRef(null);
    const starButtonRef = useRef(null);
    const deleteButtonRef = useRef(null);
    const editButtonRef = useRef(null);

    const habitActionButtonClass = `
        flex items-center justify-center w-8 h-8
        bg-white rounded-xl p-1 cursor-pointer shadow-lg
        transition-colors hover:text-indigo-600
        dark:bg-gray-800 dark:text-gray-300
        dark:hover:text-gray-400 dark:hover:bg-indigo-900/30`;

    const formatDate = (date) => {
        return Intl.DateTimeFormat("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        }).format(new Date(date));
    };

    const handleDelete = async () => {
        await deleteHabit(habit.id);
        setShowDeleteModal(false);
    };

    const handleToggleStar = async () => await starHabit(habit.id);

    return (
        <div
            className="flex flex-1 gap-2 bg-gray-300 p-2 rounded border-2 border-gray-400
            dark:bg-gray-900 dark:border-gray-800"
        >
            <div className="flex flex-1 items-center justify-between">
                <div className="flex h-full flex-col justify-between items-start gap-1">
                    <p className="mb-auto text-xs font-medium text-indigo-600 underline dark:text-indigo-500">привычка</p>
                    <p className="mb-4">{habit.title}</p>
                    <p className="text-xs text-gray-900 font-medium">Создано: {formatDate(habit.createdAt)}</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <div className="relative">
                        <button
                            ref={checkButtonRef}
                            className={habitActionButtonClass}
                            onMouseOver={() => setShowCheckTooltip(true)}
                            onMouseLeave={() => setShowCheckTooltip(false)}
                        >
                            <CheckIcon size={16} />
                        </button>
                        <Tooltip targetRef={checkButtonRef} show={showCheckTooltip}>
                            Отметить привычку как выполненная
                        </Tooltip>
                    </div>

                    <div className="relative">
                        <button
                            ref={viewButtonRef}
                            className={habitActionButtonClass}
                            onMouseOver={() => setShowViewTooltip(true)}
                            onMouseLeave={() => setShowViewTooltip(false)}
                        >
                            <ViewIcon size={16} />
                        </button>
                        <Tooltip targetRef={viewButtonRef} show={showViewTooltip}>
                            Посмотреть подробную информацию про привычку
                        </Tooltip>
                    </div>

                    <div className="relative">
                        <button
                            ref={starButtonRef}
                            className={`${habitActionButtonClass} ${habit.isStarred ? "text-indigo-700" : ""}`}
                            onMouseOver={() => setShowStarTooltip(true)}
                            onMouseLeave={() => setShowStarTooltip(false)}
                            onClick={handleToggleStar}
                        >
                            <StarIcon size={16} />
                        </button>
                        <Tooltip targetRef={starButtonRef} show={showStarTooltip}>
                            Отметить привычку как избранную
                        </Tooltip>
                    </div>

                    <div className="relative">
                        <button
                            ref={deleteButtonRef}
                            className={habitActionButtonClass}
                            onMouseOver={() => setShowDeleteTooltip(true)}
                            onMouseLeave={() => setShowDeleteTooltip(false)}
                            onClick={() => setShowDeleteModal(true)}
                        >
                            <TrashIcon size={16} />
                        </button>
                        <Tooltip targetRef={deleteButtonRef} show={showDeleteTooltip}>
                            Удалить задачу (будьте внимательны)
                        </Tooltip>
                    </div>

                    <div className="relative">
                        <button
                            ref={editButtonRef}
                            className={habitActionButtonClass}
                            onMouseOver={() => setShowEditTooltip(true)}
                            onMouseLeave={() => setShowEditTooltip(false)}
                            onClick={editHabit}
                        >
                            <PenIcon size={16} />
                        </button>
                        <Tooltip targetRef={editButtonRef} show={showEditTooltip}>
                            Редактировать привычку
                        </Tooltip>
                    </div>

                    <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                        <div className="flex flex-col items-end gap-4">
                            <p className="text-gray-900 font-medium">Вы действительно хотите удалить привычку? после удаления вы не сможете восстановить данные связанные с этой привычкой...</p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="bg-gray-600 text-white font-medium
                                    px-4 py-1 rounded text-xs transition-colors cursor-pointer
                                    hover:bg-gray-800"
                                >Отменить</button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white font-medium 
                                    px-4 py-1 rounded text-xs transition-colors cursor-pointer
                                    hover:bg-red-700"
                                >Удалить</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
