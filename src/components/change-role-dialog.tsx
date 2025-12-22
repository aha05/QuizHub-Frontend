"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Regular"
}

interface ChangeRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
  onChangeRole: (newRole: "Admin" | "Manager" | "Regular") => void
}

export function ChangeRoleDialog({ open, onOpenChange, user, onChangeRole }: ChangeRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState(user.role)

  const handleSubmit = () => {
    onChangeRole(selectedRole)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Change User Role</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Update the role for <span className="font-semibold text-foreground">{user.name}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as "Admin" | "Manager" | "Regular")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Regular">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">
            <p className="font-medium mb-2">Role Permissions:</p>
            <ul className="space-y-1 text-muted-foreground">
              {selectedRole === "Admin" && (
                <>
                  <li>• Full access to all features</li>
                  <li>• Manage users and roles</li>
                  <li>• Create and delete quizzes</li>
                </>
              )}
              {selectedRole === "Manager" && (
                <>
                  <li>• Create and edit quizzes</li>
                  <li>• View user statistics</li>
                  <li>• Generate reports</li>
                </>
              )}
              {selectedRole === "Regular" && (
                <>
                  <li>• Take quizzes</li>
                  <li>• View own statistics</li>
                  <li>• View leaderboards</li>
                </>
              )}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
