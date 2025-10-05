import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import AnalyticsPage from "./pages/Support/AnalyticsPage.jsx";
import ChatbotPage from "./pages/Support/ChatbotPage.jsx";
import ClassifyPage from "./pages/Support/ClassifyPage.jsx";
import KnowledgeBasePage from "./pages/Support/KnowledgeBasePage.jsx";
import Loading from "./pages/Support/Loading.jsx";
import MyTicketsPage from "./pages/Support/MyTicketsPage.jsx";
import SettingsPage from "./pages/Support/SettingsPage.jsx";
import SupportDashboard from "./components/Support/SupportDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/supportdashboard" element={<SupportDashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/classify" element={<ClassifyPage />} />
        <Route path="/knowledgebase" element={<KnowledgeBasePage />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/tickets" element={<MyTicketsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
