import api from "./api"

export interface CategoryPayload {
  name: string
  description: string
}

export interface Category {
  id: number  
  name: string
  description?: string
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD"
export type Status = "ACTIVE" | "InACTIVE"

export interface Quiz {
    id: string 
    title: string 
    description: string 
    category: Category 
    difficulty: Difficulty 
    status: Status
    questions: number
    timeLimit: number
}

export interface QuizPayload {
    title: string
    description: string
    difficulty: Difficulty
    status: Status
    categoryId: number
    timeLimit: number
}

export interface UpdateQuizPayload {
  title: string
  description?: string
  categoryId: number
  difficulty: Difficulty
  status: Status
  timeLimit: number
}

export const createQuiz = async (payload: QuizPayload) => {
  const res = await api.post<Quiz>("/quiz", payload)
  return res.data
}

export const getQuiz = async (): Promise<Quiz[]> => {
  const res = await api.get<Quiz[]>("/quiz")
  return res.data
}

export const updateQuiz = async (
  quizId: number,
  payload: UpdateQuizPayload
) => {
  const res = await api.put(`/quiz/${quizId}`, payload)
  return res.data
}

export const deleteQuiz = async (quizId: number) => {
  const res = await api.delete(`/quiz/${quizId}`)
  return res.data
}

export const createCategory = async (payload: CategoryPayload) => {
  const res = await api.post<Category>("/quiz/category", payload)
  return res.data
}

export const getCategory = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/quiz/category")
  return res.data
}






