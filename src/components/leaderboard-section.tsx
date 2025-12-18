"use client"

import * as React from "react"
import { Trophy } from "lucide-react"

type LeaderboardItem = {
  id: number
  username: string
  score: number
  quizzesCompleted: number
  rank: number
}

// Dummy leaderboard data
const leaderboardData: LeaderboardItem[] = [
  { id: 1, username: "JohnDoe", score: 320, quizzesCompleted: 12, rank: 1 },
  { id: 2, username: "JaneSmith", score: 290, quizzesCompleted: 10, rank: 2 },
  { id: 3, username: "AlexBrown", score: 270, quizzesCompleted: 9, rank: 3 },
  { id: 4, username: "SamGreen", score: 250, quizzesCompleted: 8, rank: 4 },
  { id: 5, username: "LilyWhite", score: 220, quizzesCompleted: 7, rank: 5 },
]

export function LeaderboardTable() {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-balance mb-4">Leaderboard</h2>
      <table className="w-full text-left border-collapse border border-border/50">
        <thead>
          <tr className="bg-card/50">
            <th className="px-4 py-2 border border-border/50">Rank</th>
            <th className="px-4 py-2 border border-border/50">Username</th>
            <th className="px-4 py-2 border border-border/50">Score</th>
            <th className="px-4 py-2 border border-border/50">Quizzes Completed</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr
              key={user.id}
              className={`${
                user.rank === 1 ? "" : "bg-card/50"
              } hover:bg-primary/10 transition-colors`}
            >
              <td className="px-4 py-2 border border-border/50 flex items-center gap-2">
                <Trophy className={`h-4 w-4 ${user.rank === 1 ? "text-yellow-500" : "text-muted-foreground"}`} />
                {user.rank}
              </td>
              <td className="px-4 py-2 border border-border/50">{user.username}</td>
              <td className="px-4 py-2 border border-border/50">{user.score}</td>
              <td className="px-4 py-2 border border-border/50">{user.quizzesCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
