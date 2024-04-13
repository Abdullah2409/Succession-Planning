import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthRequired from "./components/AuthRequired";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/Analytics/analytics";
import AnalyticsDetails from "./pages/Analytics/analytics_details";
import EmployeeSuccession from "./pages/EmployeeSuccession/employee_succession";
import EmployeeSuccessionDetails from "./pages/EmployeeSuccession/employee-succession-details"
import EmployeeFeeback from "./pages/EmployeeFeedback/employee_feedback";
import EmployeeFeebackDetails from "./pages/EmployeeFeedback/employee_feedback_details";
import Settings from "./pages/settings";
import SkillSearch from "./pages/skill_search";
import Profile from "./pages/profile";
import NotFound from "./pages/not_found"; 

// Context States
import AuthState from "./context/authstate";

import "./index.css";
// import "./server"; // Mock server

function App() {
  return (
    <BrowserRouter>
      <AuthState>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route element={<AuthRequired />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/analytics/:id" element={<AnalyticsDetails />} />
              <Route path="/employee-feedback" element={<EmployeeFeeback />} />
              <Route path="/employee-succession" element={<EmployeeSuccession />} />
              <Route path="/employee-succession-details" element={<EmployeeSuccessionDetails />} />
              <Route
                path="/employee-feedback/:id"
                element={<EmployeeFeebackDetails />}
              />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Route for handling 404 - Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthState>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
