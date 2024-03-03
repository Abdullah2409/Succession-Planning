import React, { useState } from 'react';

const EmployeeSearch = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const employees = ['Employee 1', 'Employee 2', 'Employee 3']; // This array should contain the names of all available employees

  const handleEmployeeClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    // Perform search based on the selectedEmployee
    console.log('Searching for:', selectedEmployee);
  };

  return (
    <div className="input">
      <div>
        <input
          type="text"
          placeholder="Employee ID"
          value={selectedEmployee}
          onClick={handleEmployeeClick}
          readOnly
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {showDropdown && (
        <div className="dropdown">
          {employees.map((employee) => (
            <div key={employee} onClick={() => handleEmployeeSelect(employee)}>
              {employee}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
