import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";

export default function EmployeeFeedback() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Track selected employee
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

  const employeeElements = employees.map((employee, index) => (
    <div
      key={index}
      className="p-4 bg-white shadow rounded-md flex flex-col justify-center items-center"
      style={{ maxWidth: "200px" }}
    >
      <img
        src={employee.profilepicture}
        className="w-16 h-16 rounded-full mb-4"
        alt={employee.name}
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold">{employee.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{employee.department}</p>
        <p className="text-sm text-gray-500 mb-2">{employee.designation}</p>
        <button
          onClick={() => handleEmployeeSelect(employee)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Give Feedback
        </button>
      </div>
    </div>
  ));

  return (
    <div className="max-w-screen-lg mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <h1 className="text-2xl font-bold mb-4">Employee Feedback</h1>
      {employeeElements}
      {selectedEmployee && (
        <Link
          to={`/employee-feedback/${selectedEmployee.employeeid}`}
          className="col-span-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Go to Feedback Page for {selectedEmployee.name}
        </Link>
      )}
    </div>
  );
}
