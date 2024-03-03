import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {/* Creating a link to navigate to the "/dashboard" route */}
      <Link to="/analytics">Analytics</Link>
      {/* Creating a link to navigate to the "/analytics" route */}
      <Link to="/employee-succession">Employee Succession</Link>
      {/* Creating a link to navigate to the "/employee_succession" route */}
      <Link to="/employee-feedback">Employee Feedback</Link>
      {/* Creating a link to navigate to the "/employee_feedback" route */}
      <Link to="/skill-search">Skill Search</Link>
      {/* Creating a link to navigate to the "/skill_search" route */}
      <Link to="/settings">Settings</Link>
      {/* Creating a link to navigate to the "/settings" route */}
      <Link to="/help">Help</Link>
      {/* Creating a link to navigate to the "/help" route */}
      <Link to="/profile">Profile</Link>
      {/* Creating a link to navigate to the "/profile" route */}
    </nav>
  );
}
