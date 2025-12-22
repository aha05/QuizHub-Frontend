import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminRoutes from "./admin.routes"
import PublicRoutes from "./public.routes"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes()}
        {AdminRoutes()}
      </Routes>
    </BrowserRouter>
  )
}
