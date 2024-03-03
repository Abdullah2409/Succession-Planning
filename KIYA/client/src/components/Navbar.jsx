import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/employee-succession">Employee Succession</Link>
      <Link to="/employee-feedback">Employee Feedback</Link>
      <Link to="/skill-search">Skill Search</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/help">Help</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
