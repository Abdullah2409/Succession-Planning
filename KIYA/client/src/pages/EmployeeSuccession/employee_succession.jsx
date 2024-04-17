// EmployeeSuccession.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from '@tensorflow/tfjs';

export default function EmployeeSuccession() {
  const navigate = useNavigate();
  const featureNames = ["Communication", "Problem Solving", "Leadership", "Coding"];
  const [features, setFeatures] = useState(new Array(featureNames.length).fill(false));
  const [reportData, setReportData] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await tf.loadLayersModel('file://my-promotion-model/model.json');
      setModel(loadedModel);
    }
    loadModel();
  }, []);

  const toggleFeature = (index) => {
    const newFeatures = [...features];
    newFeatures[index] = !newFeatures[index];
    setFeatures(newFeatures);
  };

  const generateReport = async () => {
    if (!model) {
      console.error('Model not loaded');
      return;
    }

    const employeeData = await fetchEmployeeData(); // Assume this fetches data as needed
    const predictions = employeeData.map(employee => {
      const inputs = tf.tensor2d([[
        employee.communication,
        employee.problemSolving,
        employee.leadership,
        employee.coding
      ]]);
      const prediction = model.predict(inputs);
      return {...employee, score: prediction.dataSync()[0]};
    });

    predictions.sort((a, b) => b.score - a.score); // Sort by score descending
    setReportData(predictions);
    navigate('/employee-succession-details', { state: { reportData: predictions } });
  };

  return (
    <div className="employee-succession-container">
      {/* UI elements here */}
      <button onClick={generateReport}>Generate Succession Report</button>
    </div>
  );
}
