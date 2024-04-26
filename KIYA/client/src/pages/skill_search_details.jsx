import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/authcontext";
import { backendUrl } from "../utils/backendurl";

const BACKEND_URL = backendUrl;

export default function SkillSearchDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const skills = id.split(",");

  // Replace skill "C" with "C#"
  skills.forEach((skill, index) => {
    if (skill === "C") {
      skills[index] = "C#";
    }
  });

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState();
  const [successMessage, setSuccessMessage] = useState("");


  const handleEmployeeSelection = (employee) => {
    setChosenEmployee(employee);
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/department/${user?.department}`)
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [user]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(
          data.filter(
            (task) =>
              !task.isCompleted 
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    // Filter employees based on their skills
    const filtered = employees.filter((employee) => {
      const employeeSkills = employee.skills;
      const commonSkills = employeeSkills.filter((skill) => skills.includes(skill.name)).map((skill) => skill.name);
      return commonSkills.length > 0; // Filter employees who have at least one common skill
    });

    // Prioritize employees based on the number of common skills
    const sortedEmployees = filtered.sort((a, b) => {
      const skillsA = a.skills.map((skill) => skill.name);
      const skillsB = b.skills.map((skill) => skill.name);
      const commonSkillsA = skillsA.filter((skill) => skills.includes(skill)).length;
      const commonSkillsB = skillsB.filter((skill) => skills.includes(skill)).length;
      return commonSkillsB - commonSkillsA; // Sort in descending order of common skills count
    });

    setFilteredEmployees(sortedEmployees);
  }, [employees, skills]);

  const handleTaskSelection = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const employeeElements = filteredEmployees.map((employee, index) => (
    <div key={index} className="flex items-center justify-between mb-8">
      <div className="bg-yellow-300 shadow-lg rounded-lg flex items-center" style={{ width: "100%", minHeight: "40px", padding: "0 20px" , marginLeft : "20px"}}>
        <div style={{ display: "flex", alignItems: "center", width: "calc(100% - 200px)" }}>
          <h1 className="text-lg font-semibold mb-1" style={{ marginRight: "50px" }}>{employee.employeeid}</h1>
          <h1 className="text-lg font-semibold mb-1" style={{ marginRight: "50px" }}>{employee.name}</h1>
          <h1 className="text-lg font-semibold mb-1">{employee.skills.map((skill) => skill.name).join(", ")}</h1>
        </div>
        <div style={{ width: "200px", display: "flex", alignItems: "center" }}>
          {/* Dropdown menu for tasks */}
          <select onChange={(e) => handleTaskSelection(e.target.value)} style={{ backgroundColor: "#3fbdf1", color: "white", padding: "5px", borderRadius: "5px", border: "none", marginRight: "10px" }}>
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>{task.title}</option>
            ))}
          </select>
          {/* Assign Task button */}
          <button onClick={() => handleAssignTask(employee)} style={{ backgroundColor: "#fec601", color: "white", padding: "5px", borderRadius: "5px", border: "none"}} disabled={!selectedTaskId}>Assign</button>
        </div>
      </div>
    </div>
  ));

  const handleAssignTask = (employee) => {
    // Send a request to update the task with the selected employee ID
    fetch(`http://localhost:8000/tasks/update/${selectedTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeid: employee.employeeid, skills: employee.skills }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Task assigned successfully:", data);
        setSuccessMessage("Task assigned successfully");
        setTimeout(() => {
          setSuccessMessage("");
          setSelectedTaskId(null)
        }, 5000); // Clear success message after 5 seconds
      })
      .catch((err) => {
        console.error("Error assigning task:", err);
      });
  };

  const headerStyle = {
    backgroundColor: "white",
    padding: "10px 20px",
    marginBottom: "5px",
    borderRadius: "5px",
    fontSize: "25px",
    fontWeight: "bold",
  };

  return (
    <div>
      <header style={headerStyle}>
        {successMessage && <div style={{ backgroundColor: "#fec601", color: "black", padding: "5px", borderRadius: "5px", marginTop: "10px", marginBottom: "10px" }}>{successMessage}</div>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <header style={{ flex: "0.1" }}>ID</header>
          <header style={{ flex: "0.2" }}>Name</header>
          <header style={{ flex: "1" }}>Skills</header>
        </div>
      </header>

      <div>
        {employeeElements}
      </div>

    </div>
  );
}
