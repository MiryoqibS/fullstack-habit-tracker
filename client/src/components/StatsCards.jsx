import React from "react";
import { Card } from "../components/UI/Card";
import { CardContent } from "../components/UI/CardContent";

export const StatsCards = ({ total, active, starred, logs }) => {
    const cards = [
        { label: "Всего привычек", value: total, color: "text-gray-900" },
        { label: "Активные", value: active, color: "text-green-500" },
        { label: "Избранные", value: starred, color: "text-yellow-500" },
        { label: "Всего выполнений", value: logs, color: "text-indigo-500" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {cards.map((item, i) => (
                <Card key={i}>
                    <CardContent>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className={`text-2xl font-semibold ${item.color}`}>{item.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
