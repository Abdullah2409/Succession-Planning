// EmployeeSuccession.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from '@tensorflow/tfjs';
import AuthContext from "../../context/authcontext";

export default function EmployeeSuccession() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);  // Assuming you have a UserContext
  const [employees, setEmployees] = useState([]);
  const featureNames = ["Communication", "Problem Solving", "Leadership", "Coding"];
  const [features, setFeatures] = useState(new Array(featureNames.length).fill(false));
  const [reportData, setReportData] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel('http://localhost:8000/my-promotion-model/model.json'); // Use HTTP(s) here
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }
    loadModel();
  }, []);

  useEffect(() => {
    // Ensure user and user.department are available
    if (user?.department) {
      fetch(`http://localhost:8000/employees/department/${user.department}`)
        .then((res) => res.json())
        .then((data) => setEmployees(data))
        .catch((error) => console.error('Failed to fetch employees:', error));
    }
  }, [user]);

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
    try {
      const predictions = await Promise.all(employees.map(async (employee) => {
        const inputs = tf.tensor2d([[
          employee.communication,
          employee.problemSolving,
          employee.leadership,
          employee.coding,
        ]]);
        const prediction = await model.predict(inputs).data();
        return { ...employee, score: prediction[0] };
      }));
  
      predictions.sort((a, b) => b.score - a.score);
      setReportData(predictions);
      console.log(navigate)
      navigate('/employee-succession-details', { state: { reportData: predictions } });
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };
  
  

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
     
  
      {/* Main Content */}
      <div className="w-4/5 p-10">
        <div className="flex justify-between items-center">
          {/* Heading */}
          <h1 className="text-4xl font-bold">EMPLOYEE SUCCESSION</h1>
          {/* Contact */}
        </div>
  
        {/* Features Selection */}
        <div className="my-5">
          <p>Select Features as Promotion Criteria</p>
          <div className=" p-5 mt-3 rounded">
            {features.map((isSelected, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFeature(index)}
                  className="form-checkbox h-5 w-5 text-teal-600" // Custom checkbox styles
                />
                <span className="ml-2 text-lg">{featureNames[index]}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Generate Report Button */}
        <button
          onClick={generateReport}
          className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-700"
        >
          Generate Succession Report
        </button>
      </div>
    </div>
  );
}
