"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"

interface Option {
  id: number
  text: string
  isCorrect: boolean
}

interface Question {
  id: number
  text: string
  type: "single" | "multiple"
  options: Option[]
}

interface QuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: Question | null
  onSave: (question: { text: string; type: "single" | "multiple"; options: Option[] }) => void
}

export function QuestionDialog({ open, onOpenChange, question, onSave }: QuestionDialogProps) {
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState<"single" | "multiple">("single")
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
  ])

  useEffect(() => {
    if (question) {
      setQuestionText(question.text)
      setQuestionType(question.type)
      setOptions(question.options)
    } else {
      setQuestionText("")
      setQuestionType("single")
      setOptions([
        { id: 1, text: "", isCorrect: false },
        { id: 2, text: "", isCorrect: false },
      ])
    }
  }, [question])

  const addOption = () => {
    const newId = Math.max(...options.map((o) => o.id), 0) + 1
    setOptions([...options, { id: newId, text: "", isCorrect: false }])
  }

  const removeOption = (id: number) => {
    if (options.length > 2) {
      setOptions(options.filter((o) => o.id !== id))
    }
  }

  const updateOptionText = (id: number, text: string) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, text } : o)))
  }

  const toggleCorrect = (id: number) => {
    if (questionType === "single") {
      // Only one correct answer
      setOptions(options.map((o) => ({ ...o, isCorrect: o.id === id })))
    } else {
      // Toggle multiple
      setOptions(options.map((o) => (o.id === id ? { ...o, isCorrect: !o.isCorrect } : o)))
    }
  }

  const handleSubmit = () => {
    if (!questionText.trim()) return alert("Please enter a question")
    if (options.some((o) => !o.text.trim())) return alert("Please fill in all options")
    if (!options.some((o) => o.isCorrect)) return alert("Please mark at least one correct answer")

    onSave({ text: questionText, type: questionType, options })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{question ? "Edit Question" : "Add New Question"}</DialogTitle>
          <DialogDescription>Fill in the question details and options below</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Question Text */}
          <div className="grid gap-2">
            <Label htmlFor="question">Question Text</Label>
            <Textarea
              id="question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question here"
              rows={3}
            />
          </div>

          {/* Question Type */}
          <div className="grid gap-2">
            <Label>Question Type</Label>
            <RadioGroup
              value={questionType}
              onValueChange={(value: "single" | "multiple") => setQuestionType(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single" className="cursor-pointer font-normal">Single Choice</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiple" id="multiple" />
                <Label htmlFor="multiple" className="cursor-pointer font-normal">Multiple Choice</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label>Options (minimum 2 required)</Label>
              <Button variant="outline" size="sm" onClick={addOption}>
                <Plus className="mr-2 h-3 w-3" />
                Add Option
              </Button>
            </div>

            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={option.id} className="flex items-start gap-2">
                  {/* Correct selector */}
                  <div className="flex items-center pt-3">
                    {questionType === "single" ? (
                      <RadioGroup
                        value={options.find((o) => o.isCorrect)?.id.toString() || ""}
                        onValueChange={(val) => toggleCorrect(Number(val))}
                      >
                        <RadioGroupItem value={option.id.toString()} />
                      </RadioGroup>
                    ) : (
                      <Checkbox checked={option.isCorrect} onCheckedChange={() => toggleCorrect(option.id)} />
                    )}
                  </div>

                  {/* Option text input */}
                  <div className="flex-1 grid gap-2">
                    <Label className="text-xs text-muted-foreground">Option {String.fromCharCode(65 + index)}</Label>
                    <Input
                      value={option.text}
                      onChange={(e) => updateOptionText(option.id, e.target.value)}
                      placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                    />
                  </div>

                  {/* Remove button */}
                  {options.length > 2 && (
                    <Button variant="ghost" size="icon" className="mt-7" onClick={() => removeOption(option.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              {questionType === "single" ? "Select the radio button next to the correct answer" : "Check all correct answers"}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
