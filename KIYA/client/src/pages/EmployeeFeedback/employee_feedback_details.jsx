import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

const BACKEND_URL = "http://localhost:8000";

export default function EmployeeFeedbackDetails() {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [employee, setEmployee] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const feedbackRequestId = searchParams.get("feedbackRequestId");

  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
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

  const updateEmployeeSkills = async () => {
    const skills = user.feedbackRequests.find(
      (request) => request._id.toString() === feedbackRequestId
    ).skills;

    employee.skills = employee.skills.map((skill) => {
      const updatedSkill = skills.find((s) => s.name === skill.name);
      if (updatedSkill) {
        skill.points += updatedSkill.boost * (rating / 10);
      }
      return skill;
    });

    // skills that are not in the employee's skills array will be added
    skills.forEach((skill) => {
      if (!employee.skills.find((s) => s.name === skill.name)) {
        employee.skills.push({
          name: skill.name,
          level: "beginner",
          points: skill.boost * (rating / 10),
        });
      }
    });

    // changing the skills level based on points
    const _requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(`${BACKEND_URL}/skills`, _requestOptions);
    const skillData = await res.json();

    employee.skills = employee.skills.map((skill) => {
      const skillInfo = skillData.find((s) => s.name === skill.name);
      if (skillInfo) {
        if (skill.points >= skillInfo.levels.intermediate) {
          skill.level = "intermediate";
        } else if (skill.points >= skillInfo.levels.advance) {
          skill.level = "advance";
        }
      }
      return skill;
    });

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    };

    fetch(`${BACKEND_URL}/employees/${employee._id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error("Error updating employee:", error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    {
      feedbackRequestId &&
        updateEmployeeSkills() &&
        updateEmployerFeedbackQueue();
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
          : navigate("/employee-feedback");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
            <div style={{ color: "black" }}>
              Skills:{" "}
              {employee.skills && employee.skills.length > 0 ? (
                <ul>
                  {employee.skills.map((skill) => (
                    <li key={skill.name}>
                      {skill.name} - {skill.points}
                    </li>
                  ))}
                </ul>
              ) : (
                "Skills not available"
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <TextField
              label="Write your feedback"
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginTop: "20px" }}
            />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <label
                style={{
                  marginRight: "10px",
                  color: "black",
                  fontWeight: "bold",
                }}
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
        </>
      )}
    </div>
  );
}
