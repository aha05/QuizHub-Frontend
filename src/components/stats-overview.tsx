import {Card} from "@/components/ui/Card"
import { Trophy, Target, CheckCircle2, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    title: "Total Quizzes",
    value: "24",
    icon: Trophy,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Average Score",
    value: "85%",
    icon: Target,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    progress: 85,
  },
  {
    title: "Completed",
    value: "18/24",
    icon: CheckCircle2,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Leaderboard",
    value: "#12",
    icon: TrendingUp,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="p-6 border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-balance">{stat.value}</p>
              {stat.progress !== undefined && <Progress value={stat.progress} className="mt-3 h-2" />}
            </div>
            <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
