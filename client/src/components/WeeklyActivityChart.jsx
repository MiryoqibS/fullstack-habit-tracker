import React from 'react'
import { Card } from './UI/Card'
import { CardContent } from './UI/CardContent'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

export const WeeklyActivityChart = ({ data }) => {
    return (
        <Card>
            <CardContent>
                <p className="font-semibold mb-4">Активность по дням недели</p>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
