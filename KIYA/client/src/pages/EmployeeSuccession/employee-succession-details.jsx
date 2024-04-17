import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EmployeeSuccessionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (!location.state?.reportData) {
      navigate('/employee-succession');
      return;
    }
    setSortedData(location.state.reportData);
  }, [location, navigate]);

  return (
    <div className="employee-succession-details-container">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-red-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-red-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-red-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Readiness
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-red-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((employee, index) => (
            <tr key={index}>
              <td className="px-5 py-5 border-b border-gray-200 bg-red-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {employee.id}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-red-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {employee.rank}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-red-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {employee.readiness}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-red-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {employee.score}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate('/employee-succession')}
          className="text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700"
        >
          Search Again
        </button>
      </div>
    </div>
  );
}
