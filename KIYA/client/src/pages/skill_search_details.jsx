
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/authcontext";


const BACKEND_URL = "http://localhost:8000";



export default function SkillSearchDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const skills = id.split(",");
  skills.map((skill,id)=>{
    if (skill === "C"){
      skills[id] = "C#"
    }
  })
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [chosenEmployee,setChosenEmployee] = useState()
  
  const handleEmployeeSelection = (employee) => {
    setChosenEmployee(employee)
  }
  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/department/${user?.department}`)
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [user]);
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState()
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
          data.filter((task)=>{return task.employerid === user.id})
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

  const employeeElements = filteredEmployees.map((employee, index) => (
    <div key={index} className="flex items-center justify-between mb-8"> {/* Increased mb-4 to mb-8 */}
      <div
        className="bg-yellow-300 shadow-lg rounded-lg flex items-left"
        style={{ minWidth: "1200px", height: "40px", marginLeft: "20px" }} 
      >
        <div className="text-left px-4 flex flex-col left h-full">
          <h3 className="text-lg font-semibold mb-1" style={{ marginRight: "10px", display: "inline" }}>{employee.employeeid} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {employee.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {employee.skills.map((skill) => skill.name).join(", ")}</h3>
        </div>
      </div>
      {/* <input
        type="radio"
        id={`employee-${index}`}
        name="selectedEmployee"
        className="mr-2"
        onChange={() => handleEmployeeSelection(employee)}
      /> */}
    </div>
  ));
  
  
  
  const headerStyle = {
    backgroundColor: "white",
    padding: "10px 20px",
    marginBottom: "5px",
    borderRadius: "5px",
    fontSize: "25px",
    fontWeight: "bold",
  };

  return <div>
    <header style={headerStyle}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
      <header style={{ flex: "0.1" }}>ID</header>
      <header style={{ flex: "0.2" }}>Name</header>
      <header style={{ flex: "1" }}>Skills</header>
    </div>
  </header>

          <div>
            {/* <p>pending tasks: </p>
            <select onChange={(task)=>{setSelectedTask(task.name)}}>
              <option value="" disabled selected>Select</option>
              {tasks.map((task) => (
                <option key={task._id} value={task.title}>
                  {task.title}
                </option>
              ))}
            </select>
            <button
            // onClick={() => handleTaskAssignment()}
            className="bg-blue-500 text-black rounded hover:bg-blue-600 focus:outline-none"
            style={{ backgroundColor: "#f4978f", opacity: "100%", height: "40px", width: "300px", marginBottom: "10px" }}
          >
            Search for employee
          </button> */}
          </div>
          <div>
            {employeeElements}
          </div>
        </div>
}
