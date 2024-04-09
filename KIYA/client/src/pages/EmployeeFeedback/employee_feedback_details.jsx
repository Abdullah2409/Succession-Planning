import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";
// import "./EmployeeFeedbackDetails.css"; // Import CSS file for styling

const BACKEND_URL = "http://localhost:8000";

export default function EmployeeFeedbackDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [employee, setEmployee] = useState("");
  const navigate = useNavigate();

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employerid: user.id,
        employeeid: employee.employeeid,
        feedback,
        rating,
      }),
    };

    try {
      const response = await fetch(`${BACKEND_URL}/feedback`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      navigate("/employee-feedback");
    } catch (error) {
      setErrMsg(error.message);
      errRef.current.focus();
    }
  };

  return (
    <div className="container">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Employee Feedback</h1>
      <div className="employee-details">
        <h2>{employee.name}</h2>
        <img src={employee.profilepicture} alt={employee.name} />
        <p>{employee.department}</p>
        <p>{employee.designation}</p>
        <p>{employee.email}</p>
        <p>{employee.skills}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback"
        ></textarea>
        <div className="rating">
          <label>Rating:</label>
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating"
              value={value}
              onChange={(e) => setRating(e.target.value)}
            />
          ))}
        </div>
        <button type="submit" disabled={!feedback || !rating}>
          Submit
        </button>
      </form>
    </div>
  );
}