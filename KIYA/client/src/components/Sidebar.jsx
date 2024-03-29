// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaChartBar, FaRegListAlt, FaRegComments, FaWpforms, FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-primary h-full">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
                  isActive ? "bg-teal-700" : ""
                }`
              }
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          {/* Analytics */}
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
                  isActive ? "bg-teal-700" : ""
                }`
              }
            >
              <FaChartBar className="mr-2" />
              Analytics
            </NavLink>
          </li>
          {/* Employee Succession */}
          <li>
            <NavLink
              to="/employee-succession"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
                  isActive ? "bg-teal-700" : ""
                }`
              }
            >
              <FaRegListAlt className="mr-2" />
              Employee Succession
            </NavLink>
          </li>
          {/* Employee Feedback */}
          <li>
            <NavLink
              to="/employee-feedback"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
                  isActive ? "bg-teal-700" : ""
                }`
              }
            >
              <FaRegComments className="mr-2" />
              Employee Feedback
            </NavLink>
          </li>
          {/* Skill Search */}
          <li>
            <NavLink
              to="/skill-search"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
                  isActive ? "bg-teal-700" : ""
                }`
              }
            >
              <FaWpforms className="mr-2" />
              Skill Search
            </NavLink>
          </li>
          {/* Settings */}
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
                  isActive ? "bg-teal-700" : ""
                }`
              }
            >
              <FaCog className="mr-2" />
              Setting
            </NavLink>
          </li>
          {/* Help */}
          <li>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
                  isActive ? "bg-teal-700" : ""
                }`
              }
            >
              <FaQuestionCircle className="mr-2" />
              Help
            </NavLink>
          </li>
        </ul>
        {/* User Profile Icon */}
        <div className="absolute bottom-0 mb-4 ml-3">
          <FaUser className="inline mr-2 text-xl" />
          <span className="text-white text-lg">Name</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
