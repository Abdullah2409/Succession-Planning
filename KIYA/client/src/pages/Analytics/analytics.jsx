import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

export default function Analytics() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getApplicants();
  }, []);

  const getApplicants = async () => {
    try {
      const url = `${BACKEND_URL}/employees/department/${user?.department}`;
      const response = await axios.get(url);
      setEmployees(response.data);
      console.log("response: ", response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchEmployee = async () => {
    navigate(`/analytics/${searchQuery}`); // For simplicity in this example
  };

  const searchContainerStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    margin: "0 10px 10px 0",
    borderRadius: "5px",
    backgroundColor: "#f4978f",
    border: "1px solid #CBD5E0",
    marginBottom: "40px",
  };

  const inputStyle = {
    flexGrow: 1,
    padding: "10px 20px",
    border: "none",
    outline: "none",
    color: "#333333",
    backgroundColor: "transparent",
  };

  const buttonStyle = {
    padding: "10px 50px", // Increase the padding to make the button longer horizontally
    border: "1px solid #000000",
    border: "2px solid #000000",
    cursor: "pointer",
    borderRadius: "15px", // Increase the border radius to make the edges rounder
  };

  const sidebarStyle = {
    backgroundColor: "white",
    padding: "20px",
    minHeight: "100vh",
  };

  const headerStyle = {
    backgroundColor: "white",
    padding: "10px 20px",
    marginBottom: "5px",
    borderRadius: "5px",
    fontSize: "35px",
    fontWeight: "bold",
  };

  const employeeListStyle = {
    backgroundColor: "#EDF2F7",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <aside style={sidebarStyle}>{}</aside>
      <main style={{ flex: "1", padding: "20px" }}>
        <header style={headerStyle}>
          <h1>Employee Analytics</h1>
        </header>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Enter Employee ID"
            style={inputStyle}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={searchEmployee} style={buttonStyle}>
            Search
          </button>
        </div>
        <div>
          {employees.map((employee) => (
            <div key={employee.employeeid} style={employeeListStyle}>
              <p>Name: {employee.name}</p>
              <p>ID: {employee.employeeid}</p>
              <p>Department: {employee.department}</p>
              <Link
                to={`/analytics/${employee.employeeid}`}
                style={{ color: "#3182CE" }}
              >
                Go to Analytics
              </Link>
            </div>
          ))}
        </div>
        {selectedEmployee && (
          <div style={employeeListStyle}>
            <h2>Selected Employee</h2>
            <p>Name: {selectedEmployee.name}</p>
            <p>ID: {selectedEmployee.employeeid}</p>
            <p>Department: {selectedEmployee.department}</p>
            <Link
              to={`/analytics/${selectedEmployee.employeeid}`}
              style={{ color: "#3182CE" }}
            >
              Go to Analytics
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
