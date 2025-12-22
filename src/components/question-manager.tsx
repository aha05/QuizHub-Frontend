"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, ArrowLeft, CheckCircle2, Circle } from "lucide-react"
import { QuestionDialog } from "@/components/question-dialog"
import {Link, useParams } from "react-router-dom"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Question {
  id: number
  text: string
  type: "single" | "multiple"
  options: Array<{
    id: number
    text: string
    isCorrect: boolean
  }>
}

// Mock data
const mockQuestions: Question[] = [
  {
    id: 1,
    text: "What is the correct syntax for referring to an external script called 'app.js'?",
    type: "single",
    options: [
      { id: 1, text: "<script href='app.js'>", isCorrect: false },
      { id: 2, text: "<script name='app.js'>", isCorrect: false },
      { id: 3, text: "<script src='app.js'>", isCorrect: true },
      { id: 4, text: "<script file='app.js'>", isCorrect: false },
    ],
  },
  {
    id: 2,
    text: "Which of the following are JavaScript data types? (Select all that apply)",
    type: "multiple",
    options: [
      { id: 1, text: "String", isCorrect: true },
      { id: 2, text: "Number", isCorrect: true },
      { id: 3, text: "Character", isCorrect: false },
      { id: 4, text: "Boolean", isCorrect: true },
      { id: 5, text: "Float", isCorrect: false },
    ],
  },
  {
    id: 3,
    text: "How do you create a function in JavaScript?",
    type: "single",
    options: [
      { id: 1, text: "function myFunction()", isCorrect: true },
      { id: 2, text: "function:myFunction()", isCorrect: false },
      { id: 3, text: "def myFunction()", isCorrect: false },
      { id: 4, text: "create myFunction()", isCorrect: false },
    ],
  },
]

export function QuestionManager() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const handleEdit = (question: Question) => {
    setEditingQuestion(question)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingQuestion(null)
    setDialogOpen(true)
  }

  const handleDelete = (questionId: number) => {
    setQuestions(questions.filter((q) => q.id !== questionId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/quizzes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Question Management</h1>
          <p className="text-muted-foreground">JavaScript Fundamentals Quiz</p>
        </div>
        <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Questions ({questions.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {questions.map((question, index) => (
              <AccordionItem key={question.id} value={`question-${question.id}`} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-start gap-4 text-left">
                    <Badge variant="secondary" className="mt-1">
                      Q{index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium">{question.text}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {question.type === "single" ? "Single Choice" : "Multiple Choice"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.options.length} Options
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">Options:</div>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={option.id}
                          className={`flex items-start gap-3 rounded-lg border p-3 ${
                            option.isCorrect ? "border-accent bg-accent/10" : ""
                          }`}
                        >
                          {option.isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <span className="text-sm font-medium text-muted-foreground mr-2">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span>{option.text}</span>
                          </div>
                          {option.isCorrect && (
                            <Badge variant="outline" className="text-accent border-accent">
                              Correct
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(question)}>
                        <Pencil className="mr-2 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(question.id)}>
                        <Trash2 className="mr-2 h-3 w-3 text-destructive" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <QuestionDialog open={dialogOpen} onOpenChange={setDialogOpen} question={editingQuestion} />
    </div>
  )
}
