import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/employee_succession">Employee Succession</Link>
      <Link to="/employee_feedback">Employee Feedback</Link>
      <Link to="/skill_search">Skill Search</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/help">Help</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
