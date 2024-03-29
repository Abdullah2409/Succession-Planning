import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Write API call here
const fetchSuccessionData = (selectedFeatures) => {
  console.log("Fetching succession data for features:", selectedFeatures);

  return [
    { id: "290-120", rank: 1, readiness: "1-2 years", score: 99 },
    // ... other employees
  ];
};

export default function EmployeeSuccession() {
  const navigate = useNavigate();
  const [features, setFeatures] = useState(new Array(10).fill(false));
  const [reportData, setReportData] = useState([]);

  const toggleFeature = (index) => {
    const newFeatures = [...features];
    newFeatures[index] = !newFeatures[index];
    setFeatures(newFeatures);
  };

  const generateReport = () => {
    const selectedFeatures = features
      // feature processing code will come here
    const data = fetchSuccessionData(selectedFeatures);
    setReportData(data);

    navigate('/employee-succession-details', { state: { reportData: data } });
  };

  return (
    <div className="employee-succession-container">
      <h1>EMPLOYEE SUCCESSION</h1>
      <div className="features-selection">
        <p>Select Features as Promotion Criteria</p>
        {features.map((isSelected, index) => (
          <div key={index} className="feature">
            <label>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleFeature(index)}
              />
              Feature {index + 1}
            </label>
          </div>
        ))}
      </div>
      <button onClick={generateReport}>Generate Succession Report</button>

      {reportData.length > 0 && (
        <div className="succession-report">
          <h2>Succession Report</h2>
          {reportData.map((data, index) => (
            <div key={index} className="report-entry">
              <span>ID: {data.id}</span>
              <span>Rank: {data.rank}</span>
              <span>Readiness: {data.readiness}</span>
              <span>Score: {data.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
