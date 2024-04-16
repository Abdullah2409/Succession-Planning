import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";

const BACKEND_URL = "http://localhost:8000";

export default function EmployeeFeedbackDetails() {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [employee, setEmployee] = useState("");
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const feedbackRequestId = searchParams.get("feedbackRequestId");

  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  const updateEmployerFeedbackQueue = async () => {
    user.feedbackRequests = user.feedbackRequests.filter(
      (request) => request._id.toString() !== feedbackRequestId
    );

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch(`${BACKEND_URL}/employers/${user._id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    {
      feedbackRequestId && updateEmployerFeedbackQueue(); // updates employer feedback queue if the feedback is requested
    }

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

      {
        feedbackRequestId
          ? navigate("/dashboard")
          : navigate("/feedback-requests");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          backgroundColor: "#73beb7",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          textAlign: "left",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ margin: "0", color: "black", fontWeight: "bold" }}>
          Feedback Form
        </h1>
      </div>
      <div
        style={{ textAlign: "left", maxWidth: "800px", margin: "20px auto" }}
      >
        <h2 style={{ color: "black" }}>{employee.name}</h2>
        <img
          src={employee.profilepicture}
          alt={employee.name}
          style={{
            maxWidth: "100px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        />
        <p style={{ color: "black" }}>Department: {employee.department}</p>
        <p style={{ color: "black" }}>Designation: {employee.designation}</p>
        <p style={{ color: "black" }}>Email: {employee.email}</p>
        <p style={{ color: "black" }}>
          Skills:{" "}
          {employee.skills && Array.isArray(employee.skills)
            ? employee.skills.join(", ")
            : "Skills not available"}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback"
          style={{
            width: "100%",
            minHeight: "150px",
            marginTop: "20px",
            borderRadius: "5px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        ></textarea>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <label
            style={{ marginRight: "10px", color: "black", fontWeight: "bold" }}
          >
            Rating:
          </label>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              style={{
                width: "60px",
                height: "40px",
                borderRadius: "10px",
                border: "black 1px solid",
                margin: "0 5px",
                backgroundColor: rating === value ? "#f4978f" : "#ffffff",
                color: "black",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="submit"
            disabled={!feedback || !rating}
            style={{
              backgroundColor: "#f4978f",
              color: "black",
              border: "2px solid black",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
