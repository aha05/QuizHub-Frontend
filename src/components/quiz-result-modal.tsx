"use client"

import { Trophy, Clock, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuizResultModalProps {
  score: number
  totalQuestions: number
  timeTaken: number
  onRetry: () => void
}

export function QuizResultModal({ score, totalQuestions, timeTaken, onRetry }: QuizResultModalProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const isPassed = percentage >= 70
  const incorrectAnswers = totalQuestions - score

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-15 h-15 rounded-full flex items-center justify-center ${
              isPassed
                ? "bg-gradient-to-br from-primary to-accent"
                : "bg-gradient-to-br from-destructive/20 to-destructive/10"
            }`}
          >
            <Trophy className={`w-8 h-8 ${isPassed ? "text-primary-foreground" : "text-destructive"}`} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {isPassed ? "Congratulations!" : "Keep Practicing!"}
          </h2>
          <p className="text-muted-foreground">
            {isPassed ? "You've successfully completed the quiz" : "You need more practice to pass this quiz"}
          </p>
        </div>

        {/* Score */}
        <div className="bg-secondary rounded-xl p-4 mb-4 text-center">
          <div className="text-4xl font-bold text-foreground mb-1">
            {score}
            <span className="text-3xl text-muted-foreground">/{totalQuestions}</span>
          </div>
          <div className="text-1xl font-semibold text-accent mb-1">{percentage}%</div>
          <p className="text-sm text-muted-foreground">
            {isPassed ? "Passed" : "Failed"} • {score} Correct • {incorrectAnswers} Incorrect
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Time Taken</p>
            <p className="text-lg font-semibold text-foreground">{formatTime(timeTaken)}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <Target className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
            <p className="text-lg font-semibold text-foreground">{percentage}%</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 font-semibold py-3 text-base"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Retry Quiz
          </Button>
          <Button
            variant="outline"
            className="w-full py-3 text-base font-medium bg-transparent"
            onClick={() => (window.location.href = "/")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
