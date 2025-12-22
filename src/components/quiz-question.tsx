import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuizQuestionProps {
  question: {
    id: number
    question: string
    options: string[]
  }
  questionNumber: number
  totalQuestions: number
  selectedAnswer: number | null
  onAnswerSelect: (answerIndex: number) => void
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-accent font-semibold mb-2">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2 className="text-2xl font-bold text-foreground leading-relaxed">{question.question}</h2>
      </div>

      <RadioGroup
        value={selectedAnswer?.toString()}
        onValueChange={(value) => onAnswerSelect(Number.parseInt(value))}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`relative flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-secondary/50 ${
              selectedAnswer === index ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}
          >
            <RadioGroupItem value={index.toString()} id={`option-${index}`} className="shrink-0" />
            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base font-medium text-foreground">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
