"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, FileText, FileSpreadsheet, TrendingUp, Users, BookOpen, Award } from "lucide-react"
import { toast } from "sonner"
import { QuizPerformanceChart } from "@/components/quiz-performance-chart"
import { CategoryDistributionChart } from "@/components/category-distribution-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const leaderboardData = [
  { rank: 1, name: "Sarah Johnson", totalScore: 4890, quizzes: 50, avgScore: 97.8 },
  { rank: 2, name: "Michael Chen", totalScore: 4832, quizzes: 52, avgScore: 92.9 },
  { rank: 3, name: "Emily Davis", totalScore: 4675, quizzes: 51, avgScore: 91.7 },
  { rank: 4, name: "James Wilson", totalScore: 4598, quizzes: 49, avgScore: 93.8 },
  { rank: 5, name: "Lisa Anderson", totalScore: 4521, quizzes: 48, avgScore: 94.2 },
  { rank: 6, name: "David Brown", totalScore: 4445, quizzes: 50, avgScore: 88.9 },
  { rank: 7, name: "Jessica Taylor", totalScore: 4389, quizzes: 47, avgScore: 93.4 },
  { rank: 8, name: "Robert Martinez", totalScore: 4312, quizzes: 51, avgScore: 84.5 },
  { rank: 9, name: "Amanda White", totalScore: 4256, quizzes: 46, avgScore: 92.5 },
  { rank: 10, name: "Christopher Lee", totalScore: 4198, quizzes: 48, avgScore: 87.5 },
]

const quizStats = [
  { quiz: "JavaScript Fundamentals", attempts: 1243, avgScore: 82.5, completionRate: 94 },
  { quiz: "React Advanced Patterns", attempts: 987, avgScore: 76.3, completionRate: 89 },
  { quiz: "World Geography", attempts: 1521, avgScore: 79.8, completionRate: 96 },
  { quiz: "Python for Data Science", attempts: 876, avgScore: 74.2, completionRate: 85 },
  { quiz: "TypeScript Essentials", attempts: 1105, avgScore: 81.9, completionRate: 92 },
]

export function ReportsInsights() {
  const [timeRange, setTimeRange] = useState("30")
  const [exportFormat, setExportFormat] = useState("csv")

  const handleExport = () => {
    toast.success(`Exporting report as ${exportFormat.toUpperCase()}...`)
    // Simulate export delay
    setTimeout(() => {
      toast.success("Report exported successfully!")
    }, 1500)
  }

  const summaryStats = [
    { title: "Total Attempts", value: "15,489", change: "+18%", trend: "up", icon: BookOpen },
    { title: "Active Users", value: "2,543", change: "+23%", trend: "up", icon: Users },
    { title: "Avg Completion", value: "91.2%", change: "+5%", trend: "up", icon: TrendingUp },
    { title: "Top Performers", value: "387", change: "+12%", trend: "up", icon: Award },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Reports & Insights</h1>
          <p className="text-muted-foreground mt-1">Analyze platform performance and generate reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs mt-1">
                <span className="text-chart-2">{stat.change}</span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Performance Trends</CardTitle>
            <CardDescription>Average scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <QuizPerformanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Quiz attempts by category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryDistributionChart />
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Performers Leaderboard</CardTitle>
              <CardDescription>Users with highest cumulative scores</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Top 10
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Total Score</TableHead>
                <TableHead>Quizzes</TableHead>
                <TableHead>Avg Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {entry.rank <= 3 ? (
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                            entry.rank === 1
                              ? "bg-chart-3 text-foreground"
                              : entry.rank === 2
                                ? "bg-muted text-foreground"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {entry.rank}
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center text-muted-foreground">
                          {entry.rank}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.totalScore.toLocaleString()}</TableCell>
                  <TableCell>{entry.quizzes}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        entry.avgScore >= 90
                          ? "bg-chart-2/20 text-chart-2"
                          : entry.avgScore >= 80
                            ? "bg-chart-3/20 text-chart-3"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {entry.avgScore.toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quiz Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Performance Summary</CardTitle>
          <CardDescription>Detailed statistics for each quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quiz Title</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Completion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizStats.map((quiz) => (
                <TableRow key={quiz.quiz}>
                  <TableCell className="font-medium">{quiz.quiz}</TableCell>
                  <TableCell>{quiz.attempts.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${quiz.avgScore}%` }} />
                      </div>
                      <span className="text-sm font-medium">{quiz.avgScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        quiz.completionRate >= 90
                          ? "bg-chart-2/20 text-chart-2"
                          : quiz.completionRate >= 80
                            ? "bg-chart-3/20 text-chart-3"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {quiz.completionRate}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download comprehensive reports in your preferred format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      CSV (Excel Compatible)
                    </div>
                  </SelectItem>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      PDF Document
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-sm">
            <p className="font-medium mb-1">Report includes:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Quiz attempts summary for the selected time range</li>
              <li>• User performance analytics and statistics</li>
              <li>• Leaderboard rankings and scores</li>
              <li>• Category-wise breakdown and trends</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
