"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { date: "Mon", active: 180, inactive: 45 },
  { date: "Tue", active: 215, inactive: 38 },
  { date: "Wed", active: 242, inactive: 42 },
  { date: "Thu", active: 268, inactive: 35 },
  { date: "Fri", active: 295, inactive: 28 },
  { date: "Sat", active: 178, inactive: 62 },
  { date: "Sun", active: 152, inactive: 55 },
]

export function UserActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.5} />
        <XAxis dataKey="date" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Active</span>
                      <span className="font-bold" style={{ color: "#10b981" }}>
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Inactive</span>
                      <span className="font-bold" style={{ color: "#f59e0b" }}>
                        {payload[1].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area type="monotone" dataKey="active" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
        <Area type="monotone" dataKey="inactive" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
