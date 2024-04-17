import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/authcontext";

const BACKEND_URL = "http://localhost:8000";

export default function EmployeeFeedbackView() {
  const { id } = useParams(); // Employee ID from URL
  const { user } = useContext(AuthContext); // Auth context to access user details
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/feedback/employee/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setFeedbacks(data);
        } else {
          throw new Error("No feedback found");
        }
      })
      .catch((error) => console.error("Error fetching feedback:", error));
  }, [id, user]);

  return (
    <div
      className="p-md"
      style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
    >
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
          Received Feedbacks
        </h1>
      </div>
      {feedbacks.length > 0 ? (
        <div
          style={{ textAlign: "left", maxWidth: "800px", margin: "20px auto" }}
        >
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "black" }}>
                Feedback from: {feedback.employerid}
              </h3>
              <p style={{ color: "black" }}>Feedback: {feedback.feedback}</p>
              <p style={{ color: "black" }}>Rating: {feedback.rating}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No feedback received yet.</p>
      )}
    </div>
  );
}
