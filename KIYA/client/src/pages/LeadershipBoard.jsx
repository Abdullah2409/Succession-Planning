import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/authcontext';

import { backendUrl } from "../utils/backendurl";
const BACKEND_URL = backendUrl;

export default function Leaderboard() {
  const [employees, setEmployees] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { user } = useContext(AuthContext);
  const [leaderboardFilter, setLeaderboardFilter] = useState('overall');

  // Normalization function
  const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/gi, '');

  useEffect(() => {
    if (user?.department) {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/employees/department/${user.department}`);
          setEmployees(response.data);
          console.log('Fetched employees:', response.data);
        } catch (error) {
          console.error('Failed to fetch employees:', error);
        }
      };
      fetchEmployees();
    }
  }, [user]);

  useEffect(() => {
    const calculateAndRankEmployees = () => {
      const featureNames = ['Communication', 'Problem Solving', 'Leadership', 'Coding'];
      
      const employeesWithScores = employees.map((employee) => {
        let totalPoints = 0;
        featureNames.forEach((feature) => {
          const skill = employee.skills.find((skill) => normalizeString(skill.name) === normalizeString(feature));
          if (skill) {
            totalPoints += skill.points;
          }
        });
        const averageScore = totalPoints / featureNames.length;
        return { ...employee, score: averageScore };
      });

      // Sort by score in descending order
      employeesWithScores.sort((a, b) => b.score - a.score);

      // Assign ranks based on the sorted scores
      const rankedEmployees = employeesWithScores.map((employee, index) => ({ ...employee, rank: index + 1 }));
      setLeaderboardData(rankedEmployees);
    };

    if (employees.length > 0) {
      calculateAndRankEmployees();
    }
  }, [employees]);

  const filteredLeaderboardData = () => {
    switch (leaderboardFilter) {
      case 'top10':
        return leaderboardData.slice(0, 10);
      case 'top30':
        return leaderboardData.slice(0, 30);
      default:
        return leaderboardData;
    }
  };

  return (
    <div className="employee-succession-details-container">
  <div className="flex items-center mb-4">
    <label htmlFor="leaderboard-filter" className="mr-2 font-semibold">Showing:</label>
    <select
      id="leaderboard-filter"
      className="form-select block w-full md:w-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      value={leaderboardFilter}
      onChange={(e) => setLeaderboardFilter(e.target.value)}
    >
      <option value="overall">Overall</option>
      <option value="top30">Top 30</option>
      <option value="top10">Top 10</option>
    </select>
      </div>
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
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaderboardData().map((employee, index) => (
            <tr key={index}>
              <td className="px-5 py-5 border-b border-gray-200 bg-red-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {employee.employeeid}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-red-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {employee.rank}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-red-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {employee.score.toFixed(2)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* You might want to add any other controls like buttons here */}
    </div>
  );
}