import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export type Type = "SINGLE" | "MULTIPLE"

interface Option {
  id: number
  text: string
  correct: boolean
}

interface QuizQuestionProps {
  question: {
    id: number
    content: string
    type: Type
    options: Option[]
  }
  questionNumber: number
  totalQuestions: number
  selectedAnswer: number | null
  onAnswerSelect: (answerIndex: number) => void
  disabled?: boolean
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  disabled,
}: QuizQuestionProps) {  
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-accent font-semibold mb-2">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2 className="text-2xl font-bold text-foreground leading-relaxed">{question?.content}</h2>
      </div>

      <RadioGroup
        value={selectedAnswer !== null ? selectedAnswer?.toString() : ""}
        onValueChange={(value) => onAnswerSelect(Number.parseInt(value))}
        disabled={disabled}
        className="space-y-3"
      >
        {question?.options?.map((option, index) => (
          <div
            key={option.id}
            className={`relative flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-secondary/50 ${
              selectedAnswer === index ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}
          >
            <RadioGroupItem value={index.toString()} id={`option-${question.id}-${index}`} className="shrink-0" />
            <Label htmlFor={`option-${question.id}-${index}`} className="flex-1 cursor-pointer text-base font-medium text-foreground">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
