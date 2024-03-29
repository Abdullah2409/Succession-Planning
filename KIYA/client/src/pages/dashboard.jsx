import React from "react";
import Navbar from "../components/Navbar";
// Importing the react library

// Defining the Dashboard component
// export default function Dashboard() {
//   return <div>Dashboard</div>;
// }

export default function Dashboard() {
  return (
    <div className="m-0 p-0 bg-gray-100">
      {/* <Navbar /> */}
      <div className="flex-grow p-5">
        <header className="flex justify-between items-center py-4 px-6 bg-white shadow">
          <h1 className="text-2xl font-semibold text-gray-700">Employer Dashboard</h1>
        </header>
        <main className="mt-4">
          <div className="flex flex-wrap lg:flex-nowrap justify-between">
            <div className="w-full lg:w-1/4 bg-white p-5 rounded shadow mr-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-3">
                  {/* Placeholder for profile image */}
                </div>
                <h3 className="text-lg">NAME</h3>
                <p className="text-sm">ROLE: EMPLOYER</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  VIEW MORE
                </button>
              </div>
              <div className="mt-5">
                <h4 className="font-bold text-lg mb-3">Requests for feedback</h4>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">
                  Name1 - Give Feedback
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Name2 - Give Feedback
                </button>
              </div>
            </div>
            <div className="w-full lg:w-3/4">
              <div className="bg-white p-5 rounded shadow mb-4">
                <h4 className="font-bold text-lg mb-3">Pending Tasks</h4>
                <div className="mb-3 p-3 bg-blue-100 rounded">
                  Task 1: description of issue
                </div>
                <div className="p-3 bg-blue-100 rounded">
                  Task 2: description of issue
                </div>
              </div>
              <div className="bg-white p-5 rounded shadow">
                <h4 className="font-bold text-lg mb-3">Statistics</h4>
                {/* Placeholder for chart */}
                <div className="h-64">
                  {/* Insert chart component */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
