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
  token: string
}

export interface RegisterResponse {
  id: number
  name: string
  email: string
  password: string
}

export interface UserResponse {
  id: number
  name: string
  email: string
  role: string
}

export const login = async (payload: LoginPayload) => {
  const res = await api.post<AuthResponse>("/auth/login", payload)
  localStorage.setItem("accessToken", res.data.token)

  const userRes = await api.get<UserResponse>("/auth/me")
  localStorage.setItem("user", JSON.stringify(userRes.data))

  return res.data
}

export const register = async (payload: RegisterPayload) => {
  const res = await api.post<RegisterResponse>("/users", payload)
  return res.data
}

export const logout = async () => {
  try {
    await api.post("/auth/logout")
  } catch (err) {
    console.error(err)
  } finally {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }
}


export const isAuthenticated = () =>
  !!localStorage.getItem("accessToken")


export const hasRole = (role: string) => {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  return user?.role === role
}

