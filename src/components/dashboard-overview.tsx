"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, CheckCircle2, Trophy, TrendingUp, TrendingDown } from "lucide-react"
import { QuizAttemptsChart } from "@/components/quiz-attempts-chart"
import { PerformanceChart } from "@/components/performance-chart"
import { UserActivityChart } from "@/components/user-activity-chart"

const stats = [
  {
    title: "Total Quizzes",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: BookOpen,
  },
  {
    title: "Active Users",
    value: "2,543",
    change: "+23%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Completed Quizzes",
    value: "8,392",
    change: "+18%",
    trend: "up",
    icon: CheckCircle2,
  },
  {
    title: "Avg Score",
    value: "78.5%",
    change: "-2%",
    trend: "down",
    icon: Trophy,
  },
]

const topScorers = [
  { name: "Sarah Johnson", score: 98, quizzes: 45 },
  { name: "Michael Chen", score: 96, quizzes: 52 },
  { name: "Emily Davis", score: 95, quizzes: 38 },
  { name: "James Wilson", score: 94, quizzes: 41 },
  { name: "Lisa Anderson", score: 93, quizzes: 36 },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor platform performance and user activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-chart-2" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={stat.trend === "up" ? "text-chart-2" : "text-destructive"}>{stat.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <QuizAttemptsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <UserActivityChart />
          </CardContent>
        </Card>
      </div>

      {/* Performance Distribution & Top Scorers */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Scorers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topScorers.map((scorer, index) => (
                <div key={scorer.name} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{scorer.name}</p>
                    <p className="text-xs text-muted-foreground">{scorer.quizzes} quizzes</p>
                  </div>
                  <div className="text-sm font-bold">{scorer.score}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
