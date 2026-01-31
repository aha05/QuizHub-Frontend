import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const token = localStorage.getItem("accessToken")
  const user = JSON.parse(localStorage.getItem("user") || "null")

  if (!token) return <Navigate to="/admin/login" replace />

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}
