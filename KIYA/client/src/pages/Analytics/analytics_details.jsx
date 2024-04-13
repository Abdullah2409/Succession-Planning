import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = "http://localhost:8000";

export default function AnalyticsDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  console.log("id", id);

 useEffect(() => {
   const getEmployee = async () => {
     // Define an async function
     try {
       const url = `${BACKEND_URL}/employees/${id}`;
       const response = await axios.get(url);
       setEmployee(response.data);
       console.log("response: ", response.data);
     } catch (error) {
       console.error("Error fetching employees:", error);
     }
   };

   getEmployee(); // Call the async function immediately
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
