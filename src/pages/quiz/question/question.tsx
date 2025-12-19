"use client"

import { useState, useEffect } from "react"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizResultModal } from "@/components/quiz-result-modal"
import { Clock, CheckCircle2 } from "lucide-react"

// Dummy quiz data
const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Which programming language is known as the language of the web?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Leopard", "Tiger"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Brazil"],
    correctAnswer: 2,
  },
]

export default function QuestionPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizData.length).fill(null))
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [startTime] = useState(Date.now())
  const [timeTaken, setTimeTaken] = useState(0)

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const endTime = Date.now()
    const totalTime = Math.floor((endTime - startTime) / 1000)
    setTimeTaken(totalTime)
    setIsQuizComplete(true)
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setAnswers(Array(quizData.length).fill(null))
    setTimeRemaining(600)
    setIsQuizComplete(false)
  }

  const answeredCount = answers.filter((a) => a !== null).length
  const isLowTime = timeRemaining <= 60

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">QuizHub</h1>
          <p className="text-muted-foreground">Test your knowledge</p>
        </div>

        {/* Quiz Card */}
        <div className="bg-card rounded-xl border border-border shadow-lg p-6 md:p-8">
          {/* Timer and Progress */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${isLowTime ? "text-destructive animate-pulse" : "text-primary"}`} />
              <span className={`text-xl font-mono font-semibold ${isLowTime ? "text-destructive" : "text-foreground"}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">
                Answered <span className="text-foreground font-semibold">{answeredCount}</span> / {quizData.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-foreground font-medium">
                {Math.round((answeredCount / quizData.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
                style={{ width: `${(answeredCount / quizData.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <QuizQuestion
            question={quizData[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizData.length}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
          />

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Previous
            </button>

            {currentQuestion === quizData.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity font-semibold shadow-lg"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-card rounded-xl border border-border shadow-lg p-4">
          <p className="text-sm text-muted-foreground mb-3">Quick Navigation</p>
          <div className="flex flex-wrap gap-2">
            {quizData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentQuestion === index
                    ? "bg-primary text-primary-foreground shadow-lg scale-110"
                    : answers[index] !== null
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {isQuizComplete && (
        <QuizResultModal
          score={calculateScore()}
          totalQuestions={quizData.length}
          timeTaken={timeTaken}
          onRetry={handleRetry}
        />
      )}
    </div>
  )
}
