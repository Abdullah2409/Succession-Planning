// EmployeeSuccessionDetails.jsx
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
      {/* UI elements and mapping sortedData */}
    </div>
  );
}
