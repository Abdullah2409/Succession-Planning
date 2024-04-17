import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartBar,
  FaRegListAlt,
  FaRegComments,
  FaWpforms,
  FaCog,
  FaChartLine,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import AuthContext from "../context/authcontext";

export default function Navbar() {
  const location = useLocation();
  const { setIsAuthenticated, user, setUser } = useContext(AuthContext);
  const userRole = user?.role.toLowerCase();

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <nav className="min-w-56 max-w-56 min-h-screen p-lg text-[#fff] text-opacity-80 tracking-normal font-light text-[13px] flex bg-primary flex-col items-center">
      <div className="flex flex-col w-full">
        <Link
          to="/dashboard"
          className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
            location.pathname === "/dashboard" ? "bg-white bg-opacity-10" : ""
          }`}
        >
          <FaTachometerAlt className="mr-4" /> Dashboard
        </Link>
        {userRole === "employer" && (
          <Link
            to="/analytics"
            className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
              location.pathname === "/analytics" ? "bg-white bg-opacity-10" : ""
            }`}
          >
            <FaChartBar className="mr-4" /> Analytics
          </Link>
        )}
        {userRole === "employee" && (
          <Link
            to={`/advance-analytics/${user.employeeid}`}
            className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
              location.pathname === "/advance-analytics"
                ? "bg-white bg-opacity-10"
                : ""
            }`}
          >
            <FaChartLine className="mr-4" /> Advance Analytics
          </Link>
        )}

        {userRole === "employee" && (
          <Link
            to={`/feedback-employee/${user.employeeid}`}
            className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
              location.pathname === "/feedback-employee"
                ? "bg-white bg-opacity-10"
                : ""
            }`}
          >
            <FaRegComments className="mr-4" />
            Feedback
          </Link>
        )}

        {userRole === "employer" && (
          <Link
            to="/employee-succession"
            className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
              location.pathname === "/employee-succession"
                ? "bg-white bg-opacity-10"
                : ""
            }`}
          >
            <FaRegListAlt className="mr-4" /> Employee Succession
          </Link>
        )}
        {userRole === "employer" && (
          <Link
            to="/employee-feedback"
            className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
              location.pathname === "/employee-feedback"
                ? "bg-white bg-opacity-10"
                : ""
            }`}
          >
            <FaRegComments className="mr-4" /> Employee Feedback
          </Link>
        )}
        {userRole === "employer" && (
          <Link
            to="/skill-search"
            className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
              location.pathname === "/skill-search"
                ? "bg-white bg-opacity-10"
                : ""
            }`}
          >
            <FaWpforms className="mr-4" /> Skill Search
          </Link>
        )}

        <div className="flex justify-between">
          <Link
            to="/profile"
            className={`flex px-sm py-[4px] items-center text-white mb-6 rounded transition duration-300 hover:bg-white hover:bg-opacity-10 ${
              location.pathname === "/profile" ? "bg-white bg-opacity-10" : ""
            }`}
          >
            <FaUser className="mr-4" /> Profile
          </Link>

          <Link
            to="/signin"
            onClick={logoutUser}
            className="flex px-sm py-[4px] items-center text-white mb-6 transition duration-300 hover:bg-white hover:bg-opacity-10 rounded"
          >
            <RiLogoutCircleRLine className="mr-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
