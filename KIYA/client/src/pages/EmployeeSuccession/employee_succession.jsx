import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from '@tensorflow/tfjs';
import AuthContext from "../../context/authcontext";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

export default function EmployeeSuccession() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const featureNames = ["Communication", "Problem Solving", "Leadership", "Coding"];
  const [features, setFeatures] = useState(new Array(featureNames.length).fill(false));
  const [reportData, setReportData] = useState([]);
  const [model, setModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);

  // Load TensorFlow.js model
  useEffect(() => {
    async function loadModel() {
      try {
        const modelUrl = process.env.PUBLIC_URL + '/my-promotion-model/model.json';
        const loadedModel = await tf.loadLayersModel(modelUrl);

        setModel(loadedModel); 
        setLoadingModel(false); // Model loaded successfully
      } catch (error) {
        console.error('Error loading the model:', error);
        setLoadingModel(false); // Model loading failed
      }
    }
    loadModel();
  }, []);

  // Fetch employees based on the user's department
  useEffect(() => {
    if (user?.department) {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/employees/department/${user.department}`);
          setEmployees(response.data);
          console.log("Fetched employees:", response.data);
        } catch (error) {
          console.error('Failed to fetch employees:', error);
        }
      };
      fetchEmployees();
    }
  }, [user]);
  // Toggle selected features
  const toggleFeature = (index) => {
    const newFeatures = [...features];
    newFeatures[index] = !newFeatures[index];
    setFeatures(newFeatures);
  };

  const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/gi, '');

  const modelPrediction = (employee) => {
    let totalPoints = 0;
    let selectedSkillsCount = 0;
  
    features.forEach((isSelected, index) => {
      if (isSelected) {
        const featureNameNormalized = normalizeString(featureNames[index]);
        const skill = employee.skills.find(skill => normalizeString(skill.name) === featureNameNormalized);
        if (skill) {
          totalPoints += skill.points;
          selectedSkillsCount++;
        }
      }
    });
  
    return selectedSkillsCount === 1 ? totalPoints : selectedSkillsCount > 0 ? totalPoints / selectedSkillsCount : 0;
  };
  
  




  // Generate a report
  const generateReport = () => {
    // First, compute scores and include additional data
    const isAnyFeatureSelected = features.some(isSelected => isSelected);
    
    if (!isAnyFeatureSelected) {
      alert('Please select at least one feature to generate the report.');
      return;
    }
    const employeeDataWithAverages = employees.map((employee, index) => ({
      ...employee,
      employeeid: employee.employeeid, // Add the employee id
      score: modelPrediction(employee), // Calculating the score
      rank: index + 1, // Rank based on the index in the original list, assuming no sorting yet
      readiness: "Assessed" // Placeholder for readiness status
    }));
    
  
    // Then sort by score in descending order
    employeeDataWithAverages.sort((a, b) => b.score - a.score);
  
    // Assign rank based on the new sorted order
    const sortedByRank = employeeDataWithAverages.map((employee, index) => ({
      ...employee,
      rank: index + 1 // Update rank after sorting by score
    }));
  
    setReportData(sortedByRank);
    navigate('/employee-succession-details', { state: { reportData: sortedByRank } });
  };
  

  return (
    <div className="flex min-h-screen">
      <div className="w-4/5 p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">EMPLOYEE SUCCESSION</h1>
        </div>

        <div className="my-5">
          <p>Select Features as Promotion Criteria</p>
          <div className="p-5 mt-3 rounded">
            {features.map((isSelected, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFeature(index)}
                  className="form-checkbox h-5 w-5 text-teal-600"
                />
                <span className="ml-2 text-lg">{featureNames[index]}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={generateReport}
          disabled={!features.some(isSelected => isSelected)}
          className={`bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 ${!features.some(isSelected => isSelected) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            Generate Succession Report
        </button>
      </div>
    </div>
  );
}