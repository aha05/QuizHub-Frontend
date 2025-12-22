import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Quiz {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  status: string
  totalQuestions: number
  timeLimit: number
}

interface QuizDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quiz: Quiz | null
}

export function AddQuizDialog({ open, onOpenChange, quiz }: QuizDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Programming",
    difficulty: "Easy",
    status: "Active",
    timeLimit: 30,
  })

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title,
        description: quiz.description,
        category: quiz.category,
        difficulty: quiz.difficulty,
        status: quiz.status,
        timeLimit: quiz.timeLimit,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Programming",
        difficulty: "Easy",
        status: "Active",
        timeLimit: 30,
      })
    }
  }, [quiz])

   const handleSubmit = () => {
    console.log("Saving quiz..")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{quiz ? "Edit Quiz" : "Create New Quiz"}</DialogTitle>
          <DialogDescription>Fill in the quiz details below</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter quiz title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter quiz description"
              rows={3}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={formData.timeLimit}
                onChange={(e) => setFormData({ ...formData, timeLimit: Number.parseInt(e.target.value) })}
                min={5}
                max={180}
              />
            </div>
          </div>
           <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="InActive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
