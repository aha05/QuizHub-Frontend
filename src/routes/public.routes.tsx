import { Route } from "react-router-dom"
import Login from "@/pages/auth/Login"
import NotFound from "@/pages/NotFound"
import Forbidden from "@/pages/Forbidden"

export default function PublicRoutes() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
}
