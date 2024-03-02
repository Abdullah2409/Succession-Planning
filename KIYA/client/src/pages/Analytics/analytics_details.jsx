import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AnalyticsDetails() {
  const { id } = useParams();
  const [employee, setemployee] = useState(null);

  useEffect(() => {
    fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setemployee(data.employees));
  }, [id]);

  return (
    <div>
      {employee ? (
        <div className="employee-details">
          <img src={employee.imageUrl} />
          <div className="employee-info">
            <h2>{employee.name}</h2>
            <p>{employee.position}</p>
            <p>{employee.email}</p>
            <p>{employee.phone}</p>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
