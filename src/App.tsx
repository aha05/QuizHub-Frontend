"use client"

import { useState } from "react"
import Button  from "./components/ui/Button"
import Card from "./components/ui/Card"
import { CheckCircle2, XCircle } from "lucide-react"

// TypeScript interfaces
interface Option {
  id: string
  text: string
  isCorrect: boolean
}

interface Question {
  id: number
  text: string
  options: Option[]
}

interface Answer {
  questionId: number
  selectedOptionId: string
}

// Mock quiz data
const QUIZ_DATA: { title: string; questions: Question[] } = {
  title: "General Knowledge Quiz",
  questions: [
    {
      id: 1,
      text: "What is the capital of France?",
      options: [
        { id: "a", text: "London", isCorrect: false },
        { id: "b", text: "Paris", isCorrect: true },
        { id: "c", text: "Berlin", isCorrect: false },
        { id: "d", text: "Madrid", isCorrect: false },
      ],
    },
    {
      id: 2,
      text: "Which planet is known as the Red Planet?",
      options: [
        { id: "a", text: "Venus", isCorrect: false },
        { id: "b", text: "Jupiter", isCorrect: false },
        { id: "c", text: "Mars", isCorrect: true },
        { id: "d", text: "Saturn", isCorrect: false },
      ],
    }
  ],
}

export default function App() {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, optionId: string) => {
    if (isSubmitted) return

    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((a) => a.questionId === questionId)
      if (existingAnswerIndex >= 0) {
        const updated = [...prev]
        updated[existingAnswerIndex] = { questionId, selectedOptionId: optionId }
        return updated
      }
      return [...prev, { questionId, selectedOptionId: optionId }]
    })
  }

  // Get selected option for a question
  const getSelectedOption = (questionId: number): string | undefined => {
    return answers.find((a) => a.questionId === questionId)?.selectedOptionId
  }

  // Check if all questions are answered
  const allQuestionsAnswered = answers.length === QUIZ_DATA.questions.length

  // Handle quiz submission
  const handleSubmit = () => {
    let correctCount = 0

    QUIZ_DATA.questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id)
      const correctOption = question.options.find((o) => o.isCorrect)

      if (userAnswer && correctOption && userAnswer.selectedOptionId === correctOption.id) {
        correctCount++
      }
    })

    setScore(correctCount)
    setIsSubmitted(true)
  }

  // Get option styling based on submission state
  const getOptionClassName = (question: Question, option: Option): string => {
    const selectedOptionId = getSelectedOption(question.id)
    const isSelected = selectedOptionId === option.id
    const baseClasses = "flex items-start gap-3 p-4 rounded-lg border-1 transition-all cursor-pointer"

    if (!isSubmitted) {
      if (isSelected) {
        return `${baseClasses} border-primary bg-primary/5`
      }
      return `${baseClasses} border-border hover:border-primary/50 hover:bg-accent/50`
    }

    // After submission
    if (option.isCorrect) {
      return `${baseClasses} border-green-500 bg-green-50`
    }

    if (isSelected && !option.isCorrect) {
      return `${baseClasses} border-red-500 bg-red-50`
    }

    return `${baseClasses} border-border opacity-60`
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{QUIZ_DATA.title}</h1>
          <p className="text-muted-foreground">
            {isSubmitted ? "Quiz Complete! See your results below." : "Select the best answer for each question."}
          </p>
        </div>

        {/* Score Card - Shown after submission */}
        {isSubmitted && (
          <Card className="p-6 mb-8 border-2">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Your Results</h2>
              <div className="flex items-center justify-center gap-8 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
                  <p className="text-3xl font-bold">{QUIZ_DATA.questions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Correct Answers</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Final Score</p>
                  <p className="text-3xl font-bold text-primary">
                    {score} / {QUIZ_DATA.questions.length}
                  </p>
                </div>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${(score / QUIZ_DATA.questions.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                You scored {Math.round((score / QUIZ_DATA.questions.length) * 100)}%
              </p>
            </div>
          </Card>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {QUIZ_DATA.questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  <span className="text-primary mr-2">Question {index + 1}</span>
                  {question.text}
                </h3>
              </div>

              <div className="space-y-3">
                {question.options.map((option) => {
                  const selectedOptionId = getSelectedOption(question.id)
                  const isSelected = selectedOptionId === option.id

                  return (
                    <label
                      key={option.id}
                      className={getOptionClassName(question, option)}
                      onClick={() => handleAnswerSelect(question.id, option.id)}
                    >
                      <div className="flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.id}
                          checked={isSelected}
                          onChange={() => handleAnswerSelect(question.id, option.id)}
                          disabled={isSubmitted}
                          className="w-4 h-4 text-primary"
                        />
                      </div>
                      <span
                        className={`flex-1 text-foreground ${isSubmitted && option.isCorrect ? "font-semibold" : ""}`}
                      >
                        {option.text}
                      </span>
                      {isSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-600 flex-shrink-0" />
                      )}
                      {isSubmitted && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-600 flex-shrink-0" />
                      )}
                    </label>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="w-full sm:w-auto px-12"
            >
              Submit Quiz
            </Button>
          </div>
        )}

        {/* Retake Button */}
        {isSubmitted && (
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setAnswers([])
                setIsSubmitted(false)
                setScore(0)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="w-full sm:w-auto px-12"
            >
              Retake Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
