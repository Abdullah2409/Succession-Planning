import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EmployeeSuccessionDetails() {
  const location = useLocation();
  const reportData = location.state.reportData;
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (location.state?.reportData) {
      const sortedReportData = location.state.reportData.sort((a, b) => b.score - a.score);
      setSortedData(sortedReportData);
    } else {
      navigate('/employee-succession');
    }
  }, [location, navigate]);

  return (
    <div className="employee-succession-details-container">
      <h1>Comparison Summary for Specific Feature</h1>
      <div className="succession-details-list">
        {sortedData.map((employee, index) => (
          <div key={employee.id} className="employee-detail">
            <span>ID: {employee.id}</span>
            <span>Rank: {index + 1}</span> {/* Rank based on sorted order */}
            <span>Readiness: {employee.readiness}</span>
            <span>Score: {employee.score}</span>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/employee-succession')}>
        Search Again
      </button>
    </div>
  );
}
