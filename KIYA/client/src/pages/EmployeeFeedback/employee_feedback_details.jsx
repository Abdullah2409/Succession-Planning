import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";
const BACKEND_URL = "http://localhost:8000"; // This is temporary for development. Will be replaced with production URL

/* This is the followup component to the employee feedback. 
Here an employer will leave their feedback for the selected employee 
*/
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
      .then((data) => setEmployee(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employerid: user.employerid,
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
    <>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"} // write css to show/hide this
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Employee Feedback</h1>
      <h2>{employee.name}</h2>
      <img
        src={employee.profilepicture}
        style={{
          // This is temp, will be replaced with tailwindcss
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "-10px",
        }}
        alt={employee.name}
      />
      <p>{employee.department}</p>
      <p>{employee.designation}</p>
      <p>{employee.email}</p>
      <p>{employee.skills}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        ></textarea>
        <br />
        <label>Rating</label>
        <input
          type="radio"
          id="1"
          name="rating"
          value="1"
          onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="1">1</label>
        <input
          type="radio"
          id="2"
          name="rating"
          value="2"
          onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="2">2</label>
        <input
          type="radio"
          id="3"
          name="rating"
          value="3"
          onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="3">3</label>
        <input
          type="radio"
          id="4"
          name="rating"
          value="4"
          onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="4">4</label>
        <input
          type="radio"
          id="5"
          name="rating"
          value="5"
          onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="5">5</label>
        <br />
        <button
          type="submit"
          disabled={!feedback || !rating}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            background: "blue",
            color: "white",
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}
