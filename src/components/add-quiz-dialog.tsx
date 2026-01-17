import { useEffect, useState } from "react"
import toast from "react-hot-toast"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createQuiz, getCategory } from "@/services/quiz.service"

/* -------------------- Types -------------------- */

type QuizDifficulty = "EASY" | "MEDIUM" | "HARD"
type QuizStatus = "ACTIVE" | "INACTIVE"

interface Category {
  id: number
  name: string
}

interface QuizDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/* -------------------- Component -------------------- */

export function AddQuizDialog({
  open,
  onOpenChange,
}: QuizDialogProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: 0,
    difficulty: "EASY" as QuizDifficulty,
    status: "ACTIVE" as QuizStatus,
    timeLimit: 15,
    passPercentage: 70,
  })

  const [saving, setSaving] = useState(false)

  /* -------------------- Load Categories -------------------- */

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true)
        const data = await getCategory()
        setCategories(data)

        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            categoryId: data[0].id,
          }))
        }
      } catch (error) {
        toast.error("Failed to load categories")
        console.error("Category fetch error:", error)
      } finally {
        setLoadingCategories(false)
      }
    }

    if (open) {
      loadCategories()
    }
  }, [open])

  /* -------------------- Submit -------------------- */

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Quiz title is required")
      return
    }

    if (!formData.categoryId) {
      toast.error("Please select a category")
      return
    }

    try {
      setSaving(true)

      await createQuiz({
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        status: formData.status,
        categoryId: formData.categoryId,
        timeLimit: formData.timeLimit,
        passPercentage: formData.passPercentage
      })

      toast.success("Quiz created successfully")
      onOpenChange(false)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create quiz"
      )
      console.error("Create quiz error:", error)
    } finally {
      setSaving(false)
    }
  }

  /* -------------------- UI -------------------- */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
          <DialogDescription>
            Fill in the quiz details below
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label>Quiz Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter quiz title"
              disabled={saving}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Enter quiz description"
              rows={3}
              disabled={saving}
            />
          </div>

          {/* Category + Difficulty + Time */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={String(formData.categoryId)}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    categoryId: Number(value),
                  })
                }
                disabled={loadingCategories}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingCategories
                        ? "Loading categories..."
                        : "Select category"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <SelectItem disabled value="0">
                      No categories available
                    </SelectItem>
                  ) : (
                    categories.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={String(cat.id)}
                      >
                        {cat.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    difficulty: value as QuizDifficulty,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Time Limit (minutes)</Label>
              <Input
                type="number"
                min={1}
                max={180}
                value={formData.timeLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeLimit: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Status */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as QuizStatus,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
                <Label>Pass Percentage</Label>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={formData.passPercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passPercentage: Number(e.target.value),
                    })
                  }
                />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
