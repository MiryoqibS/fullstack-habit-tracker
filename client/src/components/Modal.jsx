import React from 'react'

export const Modal = ({ children, show, onClose, title = "Модальное окно" }) => {
    if (!show) return null;

    return (
        <>
            <div
                className="fixed inset-0  bg-black/50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <div
                    className="bg-gray-100 rounded-xl shadow-2xl 
                            border border-gray-400/40
                            p-6 w-full max-w-md relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="text-lg font-semibold mb-4">{title}</h3>
                    {children}

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 cursor-pointer transition-colors text-gray-700 hover:text-gray-900"
                    >
                        ✖
                    </button>
                </div>
            </div>
        </>

    );
};
