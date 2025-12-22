import api from "./api"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
}

export interface RegisterResponse {
  id: number
  name: string
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  const res = await api.post<AuthResponse>("/auth/login", payload)
  localStorage.setItem("accessToken", res.data.accessToken)
  console.log("Access Token" + res.data.accessToken)
  return res.data
}

export const register = async (payload: RegisterPayload) => {
  const res = await api.post<RegisterResponse>("/users", payload)
  return res.data
}

export const logout = () => {
  localStorage.removeItem("accessToken")
}

export const isAuthenticated = () =>
  !!localStorage.getItem("accessToken")


export const hasRole = (role: string) => {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  return user?.role === role
}

