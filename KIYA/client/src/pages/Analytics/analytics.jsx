import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Analytics() {
  const [employeesData, setEmployeesData] = useState([]);

  // This is a mock fetch request to the miraj server
  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployeesData(data.employees));
  }, []);

  const employees = employeesData.map((employee) => (
    <div key={employee.id} className="employee-tile">
      <Link to={`/analytics/${employee.id}`}>
        <img src={employee.imageUrl} />
        <div className="employee-info">
          <h3>{employee.name}</h3>
          <p>
            {employee.position}
            <span></span>
          </p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div>
      <h1>Employees Analytics</h1>
      <div>{employees}</div>
    </div>
  );
}
