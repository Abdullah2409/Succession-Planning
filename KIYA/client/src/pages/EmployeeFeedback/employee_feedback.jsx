import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";

export default function EmployeeFeedback() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Track selected employee
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [submittedSearch, setSubmittedSearch] = useState(""); // State for submitted search term
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/employees/department/${user?.department}`)
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [user]);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    navigate(`/employee-feedback/${employee.employeeid}`);
  };

  const handleSubmitSearch = () => {
    setSubmittedSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setSubmittedSearch(""); // Reset submittedSearch when input is empty
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitSearch();
    }
  };

  const filteredEmployees = submittedSearch
    ? employees.filter((employee) =>
        employee.name.toLowerCase().includes(submittedSearch.toLowerCase()) ||
        employee.employeeid.toString().includes(submittedSearch)
      )
    : employees;

  const employeeElements = filteredEmployees.map((employee, index) => (
    <div
      key={index}
      className="p-6 bg-gradient-to-br from-blue-200 to-blue-100 shadow-lg rounded-lg flex flex-col items-center"
      style={{ maxWidth: "300px", minHeight: "180px", width: "200px", height: "200px" }}
    >
      <img
        src={employee.profilepicture}
        className="w-16 h-16 rounded-full mb-4"
        alt={employee.name}
      />
      <div className="text-center px-4"> {/* Add padding to the text container */}
        <h3 className="text-lg font-semibold">{employee.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{employee.department}</p>
        <p className="text-sm text-gray-600 mb-4">{employee.designation}</p>
      </div>
      <button
        onClick={() => handleEmployeeSelect(employee)}
        className="bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        style={{ backgroundColor: "#f4978f", opacity: "100%", height: "40px", width: "130px", marginBottom: "10px" }}
      >
        Give Feedback
      </button>
    </div>
  ));

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 mt-4">Employee Feedback</h1>
      {/* Search bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by Employee Name or ID"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full px-6 py-4 pl-10 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 placeholder-text-color"
          style={{ backgroundColor: "#f4978f", backgroundOpacity: "50%", color: "#333333", height: "60px", paddingLeft: "20px" }}
        />
        <button
            onClick={handleSubmitSearch}
            className="absolute top-0 right-0 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none px-4 py-4"
            style={{ backgroundColor: "#f4978f", opacity: "100%", height: "40px", width: "100px", marginBottom: "10px" ,  border: "1px solid black", marginTop: "10px", marginRight: "10px", borderRadius: "10px"}}
          >
            Search
        </button>
      </div>
      {/* Employee list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
