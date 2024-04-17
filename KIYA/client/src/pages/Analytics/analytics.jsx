import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authcontext";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

export default function Analytics() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set loading to true while fetching data
    const getApplicants = async () => {
      try {
        const url = `${BACKEND_URL}/employees/department/${user?.department}`;
        const response = await axios.get(url);
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    getApplicants();
  }, [user?.department]); // Adding dependency on user's department to re-fetch if it changes

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value) {
      const filtered = employees.filter((employee) =>
        employee.employeeid.toString().includes(value)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
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
    color: "#000000",
    backgroundColor: "transparent",
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
            placeholder="Search Employee ID"
            style={inputStyle}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {isLoading ? (
          <p>Loading list...</p>
        ) : filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
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
          ))
        ) : (
          <p>No employee with this ID available.</p>
        )}
      </main>
    </div>
  );
}
