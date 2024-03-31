import React, { useState, useEffect, useContext, useRef } from "react";
import { Link ,useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/authcontext";
const BACKEND_URL = "http://localhost:8000"; // This is temporary for development. Will be replaced with production URL
// Importing the react library

// Defining the Dashboard component
// export default function Dashboard() {
//   return <div>Dashboard</div>;
// }

// A simple component for the profile card
const ProfileCard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [profilepicture, setProfilePicture] = useState(
    user?.profilepicture || ""
  );

  return (
    
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        {}
        {user.profilepicture ? (
          <img
            src={user.profilepicture}
            alt="Profile"
            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
          />
        ) : (
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ddd' }} />
        )}
      </div>
      <div>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>{user.name}</div>
        <div style={{ textAlign: 'center', color: 'grey' }}>{user.role}</div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/profile">
        <button style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#00f', color: '#fff' }}>VIEW MORE</button>
        </Link>
        
      </div>
    </div>
  );
};

// Component for displaying pending tasks
const PendingTasks = () => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ marginBottom: '20px' }}>Pending Tasks</div>
      {/* Assuming tasks are hard-coded for this example */}
      <div style={{ backgroundColor: '#dff0d8', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>Task 1: description of issue</div>
      <div style={{ backgroundColor: '#dff0d8', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>Task 2: description of issue</div>
    </div>
  );
};

// Component for feedback requests
const FeedbackRequests = () => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ marginBottom: '20px' }}>Requests for feedback</div>
      {/* Placeholder names */}
      <div style={{ marginBottom: '10px' }}>Name1</div>
      <button style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#5cb85c', color: '#fff', marginBottom: '10px' }}>Give Feedback</button>
      <div style={{ marginBottom: '10px' }}>Name2</div>
      <button style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#5cb85c', color: '#fff', marginBottom: '10px' }}>Give Feedback</button>
    </div>
  );
};

// Component for the statistics chart (placeholder)
const StatisticsChart = () => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>Title goes here</div>
      <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd', borderRadius: '50%' }}></div>
      {/* Placeholder for the actual chart */}
    </div>
  );
};

// The main dashboard component that assembles the sub-components
export default function Dashboard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', padding: '20px' }}>
      <ProfileCard />
      <PendingTasks />
      <FeedbackRequests />
      <StatisticsChart />
    </div>
  );
}


// export default function Dashboard() {
//   return (
//     <div className="m-0 p-0 bg-gray-100">
//       {/* <Navbar /> */}
//       <div className="flex-grow p-5">
//         <header className="flex justify-between items-center py-4 px-6 bg-white shadow">
//           <h1 className="text-2xl font-semibold text-gray-700">Employer Dashboard</h1>
//         </header>
//         <main className="mt-4">
//           <div className="flex flex-wrap lg:flex-nowrap justify-between">
//             <div className="w-full lg:w-1/4 bg-white p-5 rounded shadow mr-4">
//               <div className="flex flex-col items-center">
//                 <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-3">
//                   {/* Placeholder for profile image */}
//                 </div>
//                 <h3 className="text-lg">NAME</h3>
//                 <p className="text-sm">ROLE: EMPLOYER</p>
//                 <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   VIEW MORE
//                 </button>
//               </div>
//               <div className="mt-5">
//                 <h4 className="font-bold text-lg mb-3">Requests for feedback</h4>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">
//                   Name1 - Give Feedback
//                 </button>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   Name2 - Give Feedback
//                 </button>
//               </div>
//             </div>
//             <div className="w-full lg:w-3/4">
//               <div className="bg-white p-5 rounded shadow mb-4">
//                 <h4 className="font-bold text-lg mb-3">Pending Tasks</h4>
//                 <div className="mb-3 p-3 bg-blue-100 rounded">
//                   Task 1: description of issue
//                 </div>
//                 <div className="p-3 bg-blue-100 rounded">
//                   Task 2: description of issue
//                 </div>
//               </div>
//               <div className="bg-white p-5 rounded shadow">
//                 <h4 className="font-bold text-lg mb-3">Statistics</h4>
//                 {/* Placeholder for chart */}
//                 <div className="h-64">
//                   {/* Insert chart component */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
