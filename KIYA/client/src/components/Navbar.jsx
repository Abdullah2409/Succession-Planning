import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaChartBar, FaRegListAlt, FaRegComments, FaWpforms, FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';

// export default function Navbar() {
//   return (
//     <nav>
//       <Link to="/dashboard">Dashboard</Link>
//       <Link to="/analytics">Analytics</Link>
//       <Link to="/employee-succession">Employee Succession</Link>
//       <Link to="/employee-feedback">Employee Feedback</Link>
//       <Link to="/skill-search">Skill Search</Link>
//       <Link to="/settings">Settings</Link>
//       <Link to="/help">Help</Link>
//       <Link to="/profile">Profile</Link>
//     </nav>
//   );
// }
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaTachometerAlt, FaChartBar, FaRegListAlt, FaRegComments, FaWpforms, FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-primary" style={{ paddingLeft: '15px' }} >
      <div className="flex bg-primary flex-col items-center" style={{ paddingRight: '15px' }}>
        {/* Logo or brand name */}
        <div className="text-white mb-10">
          {/* Assuming you have a logo component or simply an image */}
          {/* <Logo /> */}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col w-full">
          <Link to="/dashboard" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaTachometerAlt className="mr-4"/> Dashboard
          </Link>
          <Link to="/analytics" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaChartBar className="mr-4"/> Analytics
          </Link>
          <Link to="/employee-succession" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaRegListAlt className="mr-4"/> Employee Succession
          </Link>
          <Link to="/employee-feedback" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaRegComments className="mr-4"/> Employee Feedback
          </Link>
          <Link to="/skill-search" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaWpforms className="mr-4"/> Skill Search
          </Link>
          <Link to="/settings" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaCog className="mr-4"/> Settings
          </Link>
          <Link to="/help" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaQuestionCircle className="mr-4"/> Help
          </Link>
          <Link to="/profile" className="flex items-center text-white mb-6 hover:bg-blue-700 p-2 rounded">
            <FaUser className="mr-4"/> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

// const Navbar = () => {
//   return (
//     <aside className="w-64 h-screen" aria-label="Navbar">
//       <div className="overflow-y-auto py-4 px-3 bg-primary h-full">
//         <ul className="space-y-2">
//           {/* Dashboard */}
//           <li>
//             <Link
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
//                   isActive ? "bg-teal-700" : ""
//                 }`
//               }
//             >
//               <FaTachometerAlt className="mr-2" />
//               Dashboard
//             </Link>
//           </li>
//           {/* Analytics */}
//           <li>
//             <Link
//               to="/analytics"
//               className={({ isActive }) =>
//                 `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
//                   isActive ? "bg-teal-700" : ""
//                 }`
//               }
//             >
//               <FaChartBar className="mr-2" />
//               Analytics
//             </Link>
//           </li>
//           {/* Employee Succession */}
//           <li>
//             <Link
//               to="/employee-succession"
//               className={({ isActive }) =>
//                 `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
//                   isActive ? "bg-teal-700" : ""
//                 }`
//               }
//             >
//               <FaRegListAlt className="mr-2" />
//               Employee Succession
//             </Link>
//           </li>
//           {/* Employee Feedback */}
//           <li>
//             <Link
//               to="/employee-feedback"
//               className={({ isActive }) =>
//                 `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
//                   isActive ? "bg-teal-700" : ""
//                 }`
//               }
//             >
//               <FaRegComments className="mr-2" />
//               Employee Feedback
//             </Link>
//           </li>
//           {/* Skill Search */}
//           <li>
//             <Link
//               to="/skill-search"
//               className={({ isActive }) =>
//                 `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
//                   isActive ? "bg-teal-700" : ""
//                 }`
//               }
//             >
//               <FaWpforms className="mr-2" />
//               Skill Search
//             </Link>
//           </li>
//           {/* Settings */}
//           <li>
//             <Link
//               to="/settings"
//               className={({ isActive }) =>
//                 `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
//                   isActive ? "bg-teal-700" : ""
//                 }`
//               }
//             >
//               <FaCog className="mr-2" />
//               Setting
//             </Link>
//           </li>
//           {/* Help */}
//           <li>
//             <Link
//               to="/help"
//               className={({ isActive }) =>
//                 `flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-teal-500 ${
//                   isActive ? "bg-teal-700" : ""
//                 }`
//               }
//             >
//               <FaQuestionCircle className="mr-2" />
//               Help
//             </Link>
//           </li>
//         </ul>
//         {/* User Profile Icon */}
//         <div className="absolute bottom-0 mb-4 ml-3">
//           <FaUser className="inline mr-2 text-xl" />
//           <span className="text-white text-lg">Name</span>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Navbar;

