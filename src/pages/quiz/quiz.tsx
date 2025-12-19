import {Link} from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Brain, Clock, Target } from "lucide-react"

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            QuizHub
          </h1>
          <p className="text-xl text-muted-foreground">Challenge yourself with engaging quizzes</p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Ready to test your knowledge?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary rounded-lg p-4">
              <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">10 Questions</p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">10 Minutes</p>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">70% to Pass</p>
            </div>
          </div>

          <Link to="/question">
            <Button className="w-full md:w-auto px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg">
              Start Quiz
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          Navigate through questions, track your progress, and see your results instantly
        </p>
      </div>
    </div>
  )
}
