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
import EmployeeSuccession from "./pages/employee_succession";
import EmployeeFeedback from "./pages/employee_feedback";
import Settings from "./pages/settings";
import SkillSearch from "./pages/skill_search";
import Error from "./components/Error";

// States
import AuthState from "./context/authstate";

// import "./server"; // Mock server

function App() {
  return (
    <BrowserRouter>
      <AuthState>
        <Routes>
          {/* Application routes: */}
          <Route element={<Layout />}>
            {/* Layout component wraps other components */}
            <Route path="/" element={<Home />} />
            {/* Home page route */}
            <Route element={<AuthRequired />}>
              {/* Components requiring authentication of users */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Dashboard route */}
              <Route path="/analytics" element={<Analytics />} />
              {/* Analytics route */}
              <Route path="/analytics/:id" element={<AnalyticsDetails />} />
              {/* Analytics details route */}
            </Route>

            {/* Routes that do not require authentication */}
            <Route path="/signin" element={<SignIn />} />
            {/* Sign in route */}
            <Route path="/signup" element={<SignUp />} />
            {/* sign up route */}
            <Route path="/employee_feedback" element={<EmployeeFeedback />} />
            <Route
              path="/employee_succession"
              element={<EmployeeSuccession />}
            />
          </Route>
        </Routes>
      </AuthState>
    </BrowserRouter>
  );
}

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
