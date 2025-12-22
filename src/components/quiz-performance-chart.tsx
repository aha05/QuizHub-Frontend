"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { week: "Week 1", score: 76 },
  { week: "Week 2", score: 78 },
  { week: "Week 3", score: 81 },
  { week: "Week 4", score: 79 },
  { week: "Week 5", score: 83 },
  { week: "Week 6", score: 85 },
  { week: "Week 7", score: 87 },
  { week: "Week 8", score: 84 },
]

export function QuizPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.5} />
        <XAxis dataKey="week" stroke="#999" fontSize={12} tickLine={false} />
        <YAxis stroke="#999" fontSize={12} tickLine={false} domain={[70, 90]} tickFormatter={(value) => `${value}%`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Period</span>
                      <span className="font-bold text-foreground">{payload[0].payload.week}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Avg Score</span>
                      <span className="font-bold text-foreground">{payload[0].value}%</span>
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
          dataKey="score"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ fill: "#8b5cf6", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
