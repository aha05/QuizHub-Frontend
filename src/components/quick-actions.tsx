import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Shuffle, History, Trophy } from "lucide-react"

type Action = {
  label: string
  path: string
  icon: React.ReactNode
  stayOnPage?: boolean // optional flag for “Random Quiz” staying on the current page
}

const actions: Action[] = [
  { label: "Start Random Quiz", path: "/", icon: <Shuffle className="h-4 w-4" />, stayOnPage: true },
  { label: "View History", path: "/history", icon: <History className="h-4 w-4" /> },
  { label: "Leaderboard", path: "/leaderboard", icon: <Trophy className="h-4 w-4" /> },
]

export function QuickActions() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {actions.map((action) => {
        const isActive = location.pathname === action.path

        return (
          <Button
            key={action.path}
            size="lg"
            className={`flex items-center justify-center gap-2 hover:bg-primary/50 ${
              isActive
                ? "bg-primary hover:bg-primary/90 text-white"
                : "border-border/50 bg-transparent"
            }`}
            onClick={() => navigate(action.path)}
          >
            {action.icon}
            {action.label}
          </Button>
        )
      })}
    </div>
  )
}
