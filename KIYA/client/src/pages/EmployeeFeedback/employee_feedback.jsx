import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/authcontext";
import { Link } from "react-router-dom";
const BACKEND_URL = "http://localhost:8000"; // This is temp for development

export default function EmployeeFeedback() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch employees in the same department
  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/department/${user?.department}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setFilteredEmployees(data);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = employees.filter((employee) =>
      employee.employeeID.toString().includes(query)
    );
    setFilteredEmployees(filtered);
  };
  

  const employeeElements = filteredEmployees.map((employee, index) => {
    return (
      <div key={index}>
        <img
          src={employee.profilepicture}
          style={{
            // This is temp, will be replaced with tailwindcss
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "-10px",
          }}
          alt={employee.name}
        />
        <h3>{employee.name}</h3>
        <p>{employee.department}</p>
        <p>{employee.designation}</p>
        <Link to={`/employee-feedback/${employee.employeeid}`}>
          Give Feedback
        </Link>
      </div>
    );
  });

  return (
    <>
      <h1>Employee Feedback</h1>
      <input
        type="text"
        placeholder="Search by Employee ID"
        value={searchQuery}
        onChange={handleSearch}
      />
      {employees ? employeeElements : <div>Loading...</div>}
    </>
  );
}
