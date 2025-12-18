import {Button}  from "@/components/ui/Button"
import { Shuffle, History, Trophy } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
        <Shuffle className="h-4 w-4" />
        Start Random Quiz
      </Button>
      <Button size="lg" variant="outline" className="gap-2 border-border/50 bg-transparent">
        <History className="h-4 w-4" />
        View History
      </Button>
      <Button size="lg" variant="outline" className="gap-2 border-border/50 bg-transparent">
        <Trophy className="h-4 w-4" />
        Leaderboard
      </Button>
    </div>
  )
}
