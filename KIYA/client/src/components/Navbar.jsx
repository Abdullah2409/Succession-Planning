import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartBar,
  FaRegListAlt,
  FaRegComments,
  FaWpforms,
  FaCog,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="min-w-56 max-w-56 min-h-screen p-lg text-[#fff] text-opacity-80 tracking-normal font-light text-[13px] flex bg-primary flex-col items-center">
      {/* Navigation Links */}
      <div className="flex flex-col w-full">
        <Link
          to="/dashboard"
          className="flex px-sm py-[4px] items-center text-white mb-6 rounded"
          style={{
            backgroundColor:
              location.pathname === "/dashboard"
                ? "rgba(255, 255, 255, 0.1)"
                : "",
          }}
        >
          <FaTachometerAlt className="mr-4" /> Dashboard
        </Link>
        <Link
          to="/analytics"
          className="flex px-sm py-[4px] items-center text-white mb-6 rounded"
          style={{
            backgroundColor:
              location.pathname === "/analytics"
                ? "rgba(255, 255, 255, 0.1)"
                : "",
          }}
        >
          <FaChartBar className="mr-4" /> Analytics
        </Link>
        <Link
          to="/employee-succession"
          className="flex px-sm py-[4px] items-center text-white mb-6 rounded"
          style={{
            backgroundColor:
              location.pathname === "/employee-succession"
                ? "rgba(255, 255, 255, 0.1)"
                : "",
          }}
        >
          <FaRegListAlt className="mr-4" /> Employee Succession
        </Link>
        <Link
          to="/employee-feedback"
          className="flex px-sm py-[4px] items-center text-white mb-6 rounded"
          style={{
            backgroundColor:
              location.pathname === "/employee-feedback"
                ? "rgba(255, 255, 255, 0.1)"
                : "",
          }}
        >
          <FaRegComments className="mr-4" /> Employee Feedback
        </Link>
        <Link
          to="/skill-search"
          className="flex px-sm py-[4px] items-center text-white mb-6 rounded"
          style={{
            backgroundColor:
              location.pathname === "/skill-search"
                ? "rgba(255, 255, 255, 0.1)"
                : "",
          }}
        >
          <FaWpforms className="mr-4" /> Skill Search
        </Link>
        <Link
          to="/help"
          className="flex px-sm py-[4px] items-center text-white mb-6 rounded"
          style={{
            backgroundColor:
              location.pathname === "/help" ? "rgba(255, 255, 255, 0.1)" : "",
          }}
        >
          <FaQuestionCircle className="mr-4" /> Help
        </Link>
        <Link
          to="/profile"
          className="flex px-sm py-[4px] items-center text-white mb-6 rounded"
          style={{
            backgroundColor:
              location.pathname === "/profile"
                ? "rgba(255, 255, 255, 0.1)"
                : "",
          }}
        >
          <FaUser className="mr-4" /> Profile
        </Link>
      </div>
    </nav>
  );
}
