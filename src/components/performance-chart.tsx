"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { range: "0-20%", count: 45 },
  { range: "21-40%", count: 128 },
  { range: "41-60%", count: 342 },
  { range: "61-80%", count: 521 },
  { range: "81-100%", count: 378 },
]

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.5} />
        <XAxis dataKey="range" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#999" fontSize={12} tickLine={false} axisLine={false}  />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.1)" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Score Range</span>
                      <span className="font-bold text-foreground">{payload[0].payload.range}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Users</span>
                      <span className="font-bold text-foreground">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
