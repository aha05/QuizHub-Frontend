import { useState } from "react"
import {useNavigate} from "react-router-dom"
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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, FileQuestion } from "lucide-react"
import { AddQuizDialog } from "@/components/add-quiz-dialog"
import { AddCategoryDialog } from "@/components/add-category-dialog"
import { EditQuizDialog } from "@/components/edit-quiz-dialog"
import { DeleteQuizDialog } from "@/components/delete-quiz-dialog"


interface Quiz {
  id: string
  title: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  questions: number
  status: "Active" | "Inactive"
}

const initialQuizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    category: "Programming",
    difficulty: "Easy",
    questions: 15,
    status: "Active",
  },
  {
    id: "2",
    title: "React Advanced Patterns",
    category: "Programming",
    difficulty: "Hard",
    questions: 20,
    status: "Active",
  },
  { id: "3", title: "World Geography", category: "Geography", difficulty: "Medium", questions: 25, status: "Active" },
  { id: "4", title: "Ancient History", category: "History", difficulty: "Medium", questions: 18, status: "Inactive" },
  {
    id: "5",
    title: "Python for Data Science",
    category: "Programming",
    difficulty: "Hard",
    questions: 30,
    status: "Active",
  },
  { id: "6", title: "Basic Mathematics", category: "Mathematics", difficulty: "Easy", questions: 20, status: "Active" },
  { id: "7", title: "European Capitals", category: "Geography", difficulty: "Easy", questions: 12, status: "Active" },
  {
    id: "8",
    title: "TypeScript Essentials",
    category: "Programming",
    difficulty: "Medium",
    questions: 22,
    status: "Active",
  },
]

export function QuizManagement() {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

  const itemsPerPage = 10

  // Filter quizzes
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || quiz.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || quiz.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Pagination
  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, startIndex + itemsPerPage)

  const handleAddQuiz = (quiz: Omit<Quiz, "id">) => {
    const newQuiz = { ...quiz, id: Date.now().toString() }
    setQuizzes([newQuiz, ...quizzes])
    setAddDialogOpen(false)
  }

  const handleAddCategory = () => {
    setAddCategoryDialogOpen(false)
  }

  const handleEditQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)))
    setEditDialogOpen(false)
    setSelectedQuiz(null)
  }

  const handleDeleteQuiz = () => {
    if (selectedQuiz) {
      setQuizzes(quizzes.filter((q) => q.id !== selectedQuiz.id))
      setDeleteDialogOpen(false)
      setSelectedQuiz(null)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-chart-2/20 text-chart-2"
      case "Medium":
        return "bg-chart-3/20 text-chart-3"
      case "Hard":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-chart-2/20 text-chart-2" : "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Quiz Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage quizzes</p>
        </div>
        <div>
        <Button className="me-1" onClick={() => setAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Quiz
        </Button>

        <Button className="ms-1" onClick={() => setAddCategoryDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
        </div>
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
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="Geography">Geography</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedQuizzes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No quizzes found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedQuizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.category}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{quiz.questions}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(quiz.status)}>
                        {quiz.status}
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedQuiz(quiz)
                              setEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Quiz
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              navigate(`/admin/quizzes/${quiz.id}/questions`)
                            }}
                          >
                            <FileQuestion className="mr-2 h-4 w-4" />
                            Add Question
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedQuiz(quiz)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Quiz
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredQuizzes.length)} of{" "}
            {filteredQuizzes.length} results
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
      <AddQuizDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onAdd={handleAddQuiz} />
      <AddCategoryDialog open={addCategoryDialogOpen} onOpenChange={setAddCategoryDialogOpen} onAdd={handleAddCategory} />
      {selectedQuiz && (
        <>
          <EditQuizDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            quiz={selectedQuiz}
            onEdit={handleEditQuiz}
          />
          <DeleteQuizDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            quizTitle={selectedQuiz.title}
            onDelete={handleDeleteQuiz}
          />
        </>
      )}
    </div>
  )
}
