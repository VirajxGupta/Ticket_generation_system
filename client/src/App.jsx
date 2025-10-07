import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Toast import
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
import EmployeeDashboard from "./pages/Employee/EmployeeDashBoard.jsx"
import EmployeeTicketPage from "./pages/Employee/Employeetickets.jsx"
import EmployeeSettingsPage from "./pages/Employee/EmployeeSetting.jsx"
import ChatPage from "./pages/Employee/AIAssistant.jsx";
import EmpKnowledgeBasePage from "./pages/Employee/EmployeeKnowledge.jsx"

function App() {
  return (
    
    
    <Router>
        {/* ✅ Global Toast Container */}
        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
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
        <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/employeeDashboardTicket" element={<EmployeeTicketPage />} />
        <Route path="/employeeDashboardSettings" element={<EmployeeSettingsPage />} />
        <Route path="/employeeDashboardAIAssistant" element={<ChatPage />} />
        <Route path="/employeeDashboardKnowledge" element={<EmpKnowledgeBasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
