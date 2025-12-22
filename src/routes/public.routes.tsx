import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login"
import QuizPage from "@/pages/quiz/quiz";
import QuestionPage from "@/pages/quiz/question/question";
import History from "@/pages/History";
import Leaderboard from "@/pages/Leaderboard";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";


export default function PublicRoutes() {
  return (
    <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
    </>
  )
}
