import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Updated for v6
import AuthContext from "../../context/authcontext";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000"; // Temporary for development

export default function Analytics() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate(); // Updated for v6

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

  const handleEmployeeSelect = (employee_id) => {
    console.log("in handle select employee")
    // setSelectedEmployee(employee);
    navigate("/analytics/${employee.id}");
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const searchEmployee = async () => {
    console.log("Search query:", searchQuery);
    navigate("/analytics/${employee.id}");
    // try {
    //   const response = await axios.get(
    //     `${BACKEND_URL}/employees/${searchQuery}`
    //   );
    //   console.log("Employee found:", response.data);
    //   setSelectedEmployee(response.data);
    //   navigate(`/analytics/${response.data.employeeid}`); // Updated for v6
    // } catch (error) {
    //   console.error("Error fetching employee:", error);
    //   setSelectedEmployee(null);
    // }
  };

  return (
    <div>
      <h1>Employee Analytics</h1>
      <input
        type="text"
        placeholder="Enter Employee ID"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={searchEmployee}>Search</button>
      <div>
        {employees.map((employee) => (
          <div key={employee.employeeid}>
            <p>Name: {employee.name}</p>
            <p>ID: {employee.employeeid}</p>
            <p>Department: {employee.department}</p>
            <Link to={`/analytics/${employee.employeeid}`}>
              Go to Analytics
            </Link>
          </div>
        ))}
      </div>
      {selectedEmployee && (
        <div>
          <h2>Selected Employee</h2>
          <p>Name: {selectedEmployee.name}</p>
          <p>ID: {selectedEmployee.employeeid}</p>
          <p>Department: {selectedEmployee.department}</p>
          <Link to={`/analytics/${selectedEmployee.employeeid}`}>
            Go to Analytics
          </Link>
        </div>
      )}
    </div>
  );
}
