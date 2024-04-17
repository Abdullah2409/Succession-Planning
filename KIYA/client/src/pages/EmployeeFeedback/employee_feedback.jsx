import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";

export default function EmployeeFeedback() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Track selected employee
  const [filterTerm, setFilterTerm] = useState(""); // State for filter term
  const [filteredEmployees, setFilteredEmployees] = useState(null); // State for filtered employees
  const navigate = useNavigate();

  useEffect(() => {
    // Set filteredEmployees to null to indicate loading state
    setFilteredEmployees(null);

    fetch(`http://localhost:8000/employees/department/${user?.department}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        // After fetching data, set filteredEmployees to initial state (empty array)
        setFilteredEmployees([]);
      });
  }, [user]);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    navigate(`/employee-feedback/${employee.employeeid}`);
  };

  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  };

  useEffect(() => {
    // Update filteredEmployees whenever filterTerm or employees change
    if (employees.length > 0) {
      const filtered = employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
          employee.employeeid.toString().includes(filterTerm)
      );
      setFilteredEmployees(filtered);
    }
  }, [filterTerm, employees]);

  let employeeElements;
  if (filteredEmployees === null) {
    employeeElements = <p className="text-center text-xl">Loading...</p>;
  } else if (filteredEmployees.length === 0) {
    employeeElements = (
      <p className="text-center text-xl">No employees found.</p>
    );
  } else {
    employeeElements = filteredEmployees.map((employee, index) => (
      <div
        key={index}
        className="p-6 bg-gradient-to-br from-blue-200 to-blue-100 shadow-lg rounded-lg flex flex-col items-center"
        style={{
          maxWidth: "300px",
          minHeight: "180px",
          width: "200px",
          height: "200px",
        }}
      >
        <img
          src={employee.profilepicture}
          className="w-16 h-16 rounded-full mb-4"
          alt={employee.name}
        />
        <div className="text-center px-4">
          {" "}
          {/* Add padding to the text container */}
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{employee.department}</p>
          <p className="text-sm text-gray-600 mb-4">{employee.designation}</p>
        </div>
        <button
          onClick={() => handleEmployeeSelect(employee)}
          className="bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          style={{
            backgroundColor: "#f4978f",
            opacity: "100%",
            height: "40px",
            width: "130px",
            marginBottom: "10px",
          }}
        >
          Give Feedback
        </button>
      </div>
    ));
  }

  return (
    <div className="p-md max-w-screen-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 mt-4">Employee Feedback</h1>
      {/* Filter bar */}
      <input
        type="text"
        placeholder="Filter by Employee Name or ID"
        value={filterTerm}
        onChange={handleFilterChange}
        className="w-full px-6 py-4 pl-10 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 placeholder-text-color"
        style={{
          backgroundColor: "#f4978f",
          backgroundOpacity: "50%",
          color: "#333333",
          height: "60px",
          paddingLeft: "20px",
          marginBottom: "20px",
        }}
      />
      {/* Employee list */}
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {employeeElements}
      </div>
      {selectedEmployee && (
        <Link
          to={`/employee-feedback/${selectedEmployee.employeeid}`}
          className="block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Go to Feedback Page for {selectedEmployee.name}
        </Link>
      )}
    </div>
  );
}
