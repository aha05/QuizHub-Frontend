// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Pages
import Question from "./pages/Question";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route> */}

        {/* Protected Routes */}
        {/* <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}

        {/* Catch-all */}
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
