"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"

type HistoryItem = {
  id: number
  title: string
  category: string
  score: number
  totalQuestions: number
  date: string
  status: "Passed" | "Failed"
}

// Dummy data for history
const historyData: HistoryItem[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Programming",
    score: 12,
    totalQuestions: 15,
    date: "2025-12-10",
    status: "Passed",
  },
  {
    id: 2,
    title: "World Geography",
    category: "Geography",
    score: 14,
    totalQuestions: 20,
    date: "2025-12-09",
    status: "Failed",
  },
  {
    id: 3,
    title: "Science Trivia",
    category: "Science",
    score: 18,
    totalQuestions: 25,
    date: "2025-12-08",
    status: "Passed",
  },
  {
    id: 4,
    title: "Brain Teasers",
    category: "Logic",
    score: 7,
    totalQuestions: 10,
    date: "2025-12-07",
    status: "Passed",
  },
]

export function QuizHistory() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-balance mb-6">Quiz History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historyData.map((item) => (
          <Card
            key={item.id}
            className="p-6 border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group"
          >
            <div className="flex items-center justify-between mb-4">
              <Badge
                variant={item.status === "Passed" ? "success" : "destructive"}
                className="px-2 py-0.5"
              >
                {item.status === "Passed" ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                {item.status}
              </Badge>
              <Badge variant="outline" className="border-border/50">
                {item.category}
              </Badge>
            </div>

            <h3 className="text-xl font-bold mb-2 text-balance group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {item.score}/{item.totalQuestions} questions correct
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>

            <button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md">
              Review Quiz
            </button>
          </Card>
        ))}
      </div>

      {historyData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No quiz history found.</p>
        </div>
      )}
    </div>
  )
}
