"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface DeleteQuizDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quizTitle: string
  onDelete: () => void
}

export function DeleteQuizDialog({ open, onOpenChange, quizTitle, onDelete }: DeleteQuizDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Delete Quiz</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete <span className="font-semibold text-foreground">{quizTitle}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
