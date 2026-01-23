import api from "./api"

export interface History {
   id: number
   quizId: number
   quizTitle: string
   totalQuestions: number
   correctAnswers: number
   scorePercentage: number
   quizCategory: string
   passed: boolean
   submittedAt: string 
}

interface QuizHistory {
  timeTaken: number
  answers: {
    questionId: number
    selectedOptionIds: number[]
  }[]
}

export const getHistory = async (): Promise<History[]> => {
  const res = await api.get<History[]>(`/user-activity/history`)
  console.log(res.data)
  return res.data
}

export const getHistoryById = async (quizId: number): Promise<History[]> => {
  const res = await api.get<History[]>(`/quiz/quizResult/${quizId}`)
  console.log(res.data)
  return res.data
}

export const getBestScore = async (quizId: number): Promise<History[]> => {
  const res = await api.get<History[]>(`/quiz/${quizId}/bestResult`)
  console.log(res.data)
  return res.data
}



