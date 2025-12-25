import api from "./api"

export interface Option {
    id: number
    text: string
    isCorrect: boolean
}

export interface Question {
    id: number
    content: string
    options: Option
}

export interface QuestionPayload {
   content: string
    options: Option
}

export interface UpdateQuestionPayload {
  content: string
  options: Option
}

export const createQuestion = async (
  quizId: number,
  payload: QuestionPayload) => {
  const res = await api.post<Question>(`/quiz/${quizId}/question`, payload)
  return res.data
}

export const getQuestion = async (quizId: number): Promise<Question[]> => {
  const res = await api.get<Question[]>(`/quiz/${quizId}/question`)
  return res.data
}

export const updateQuestion = async (
  questionId: number,
  payload: UpdateQuestionPayload
) => {
  const res = await api.put(`/question/${questionId}`, payload)
  return res.data
}

export const deleteQuestion = async (questionId: number) => {
  const res = await api.delete(`/question/${questionId}`)
  return res.data
}








