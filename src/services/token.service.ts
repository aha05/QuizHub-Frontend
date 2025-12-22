import api from "./api"

interface RefreshResponse {
  accessToken: string
}

export const refreshAccessToken = async () => {
  const res = await api.post<RefreshResponse>("/auth/refresh", null, { withCredentials: true })
  localStorage.setItem("accessToken", res.data.accessToken)
  return res.data.accessToken
}
