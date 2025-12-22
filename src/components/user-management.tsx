"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Shield, Ban, Eye, UsersIcon, UserCheck, UserX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChangeRoleDialog } from "@/components/change-role-dialog"
import { UserDetailsDialog } from "@/components/user-details-dialog"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Regular"
  quizzesAttempted: number
  highestScore: number
  status: "Active" | "Disabled"
  avatar?: string
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Admin",
    quizzesAttempted: 45,
    highestScore: 98,
    status: "Active",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Manager",
    quizzesAttempted: 52,
    highestScore: 96,
    status: "Active",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Regular",
    quizzesAttempted: 38,
    highestScore: 95,
    status: "Active",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Regular",
    quizzesAttempted: 41,
    highestScore: 94,
    status: "Active",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    role: "Manager",
    quizzesAttempted: 36,
    highestScore: 93,
    status: "Active",
  },
  {
    id: "6",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Regular",
    quizzesAttempted: 28,
    highestScore: 89,
    status: "Disabled",
  },
  {
    id: "7",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    role: "Regular",
    quizzesAttempted: 33,
    highestScore: 91,
    status: "Active",
  },
  {
    id: "8",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    role: "Regular",
    quizzesAttempted: 47,
    highestScore: 87,
    status: "Active",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const itemsPerPage = 10

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  // Stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    disabled: users.filter((u) => u.status === "Disabled").length,
  }

  const handleChangeRole = (newRole: "Admin" | "Manager" | "Regular") => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u)))
      toast.success(`${selectedUser.name}'s role updated to ${newRole}`)
      setRoleDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u)))
    const user = users.find((u) => u.id === userId)
    if (user) {
      toast.success(`${user.name} account ${user.status === "Active" ? "disabled" : "enabled"}`)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-destructive/20 text-destructive"
      case "Manager":
        return "bg-chart-1/20 text-chart-1"
      case "Regular":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-chart-2/20 text-chart-2" : "bg-muted text-muted-foreground"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Disabled Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.disabled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Regular">Regular</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Quizzes Attempted</TableHead>
                <TableHead>Highest Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.quizzesAttempted}</TableCell>
                    <TableCell>
                      <span className="font-medium">{user.highestScore}%</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user)
                              setDetailsDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Quiz History
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user)
                              setRoleDialogOpen(true)
                            }}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                            <Ban className="mr-2 h-4 w-4" />
                            {user.status === "Active" ? "Disable" : "Enable"} Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Dialogs */}
      {selectedUser && (
        <>
          <ChangeRoleDialog
            open={roleDialogOpen}
            onOpenChange={setRoleDialogOpen}
            user={selectedUser}
            onChangeRole={handleChangeRole}
          />
          <UserDetailsDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} user={selectedUser} />
        </>
      )}
    </div>
  )
}
