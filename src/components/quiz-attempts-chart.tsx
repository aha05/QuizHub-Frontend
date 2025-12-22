"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { date: "Jan 1", attempts: 245 },
  { date: "Jan 5", attempts: 298 },
  { date: "Jan 10", attempts: 352 },
  { date: "Jan 15", attempts: 412 },
  { date: "Jan 20", attempts: 385 },
  { date: "Jan 25", attempts: 478 },
  { date: "Jan 30", attempts: 521 },
]

export function QuizAttemptsChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.5} />
        <XAxis dataKey="date" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#999" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-foreground">{payload[0].payload.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Attempts</span>
                      <span className="font-bold text-foreground">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="attempts"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ fill: "#8b5cf6", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
