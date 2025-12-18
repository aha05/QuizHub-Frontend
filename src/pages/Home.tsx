import { UserProfileHeader } from "@/components/user-profile-header"
import { StatsOverview } from "@/components/stats-overview"
import { QuizGrid } from "@/components/quiz-grid"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <UserProfileHeader />
        <StatsOverview />
        <QuickActions />
        <QuizGrid />
      </div>
    </div>
  )
}