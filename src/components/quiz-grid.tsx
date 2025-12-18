"use client"

import { useState } from "react"
import  {Card}  from "@/components/ui/Card"
import  {Button}  from "@/components/ui/Button"
import  {Badge}  from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Clock, BookOpen, Brain, Code, Globe, Lightbulb, Zap } from "lucide-react"

const quizzes = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts and syntax",
    questions: 15,
    difficulty: "Easy",
    category: "Programming",
    icon: Code,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    id: 2,
    title: "World Geography",
    description: "Explore capitals, countries, and continents around the world",
    questions: 20,
    difficulty: "Medium",
    category: "Geography",
    icon: Globe,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: 3,
    title: "Advanced React Patterns",
    description: "Master hooks, context, and advanced React patterns",
    questions: 12,
    difficulty: "Hard",
    category: "Programming",
    icon: Zap,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    id: 4,
    title: "Science Trivia",
    description: "Challenge yourself with questions from physics, chemistry, and biology",
    questions: 25,
    difficulty: "Medium",
    category: "Science",
    icon: Lightbulb,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: 5,
    title: "History 101",
    description: "Journey through major historical events and figures",
    questions: 18,
    difficulty: "Easy",
    category: "History",
    icon: BookOpen,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    id: 6,
    title: "Brain Teasers",
    description: "Mind-bending puzzles and logical reasoning challenges",
    questions: 10,
    difficulty: "Hard",
    category: "Logic",
    icon: Brain,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const difficultyColors = {
  Easy: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  Medium: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  Hard: "bg-destructive/20 text-destructive border-destructive/30",
}

export function QuizGrid() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")

  const filteredQuizzes = quizzes.filter((quiz) => {
    const categoryMatch = categoryFilter === "all" || quiz.category === categoryFilter
    const difficultyMatch = difficultyFilter === "all" || quiz.difficulty === difficultyFilter
    return categoryMatch && difficultyMatch
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-balance">Available Quizzes</h2>
        <div className="flex gap-3 flex-wrap">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] border-border/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Geography">Geography</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Logic">Logic</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px] border-border/50">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="p-6 border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${quiz.bgColor} ${quiz.color} p-3 rounded-lg`}>
                <quiz.icon className="h-6 w-6" />
              </div>
              <Badge variant="secondary" className={difficultyColors[quiz.difficulty as keyof typeof difficultyColors]}>
                {quiz.difficulty}
              </Badge>
            </div>
            <h3 className="text-xl font-bold mb-2 text-balance group-hover:text-primary transition-colors">
              {quiz.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-pretty leading-relaxed">{quiz.description}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{quiz.questions} questions</span>
              </div>
              <Badge variant="outline" className="border-border/50">
                {quiz.category}
              </Badge>
            </div>
            <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4" />
               Start Quiz
            </Button>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No quizzes found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
