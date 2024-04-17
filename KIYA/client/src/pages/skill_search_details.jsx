import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/authcontext";

import { backendUrl } from "../utils/backendurl";
const BACKEND_URL = backendUrl;

export default function SkillSearchDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const skills = id.split(",");
  skills.map((skill, id) => {
    if (skill === "C") {
      skills[id] = "C#";
    }
  });
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState();

  const handleEmployeeSelection = (employee) => {
    setChosenEmployee(employee);
  };
  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/department/${user?.department}`)
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [user]);
  const [tasks, setTasks] = useState(0);
  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks/employerid/${user?.id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [user]);
  const pendingTasks = tasks;
  useEffect(() => {
    // Filter employees based on their skills
    const filtered = employees.filter((employee) => {
      const employeeSkills = employee.skills;
      const commonSkills = employeeSkills.filter((skill) =>
        skills.includes(skill)
      );
      return commonSkills.length > 0; // Filter employees who have at least one common skill
    });

    // Prioritize employees based on the number of common skills
    const sortedEmployees = filtered.sort((a, b) => {
      const skillsA = a.skills;
      const skillsB = b.skills;
      const commonSkillsA = skillsA.filter((skill) =>
        skills.includes(skill)
      ).length;
      const commonSkillsB = skillsB.filter((skill) =>
        skills.includes(skill)
      ).length;
      return commonSkillsB - commonSkillsA; // Sort in descending order of common skills count
    });

    setFilteredEmployees(sortedEmployees);
  }, [employees, skills]);

  const employeeElements = filteredEmployees.map((employee, index) => (
    <div key={index} className="flex items-center justify-between mb-4">
      <div
        className="p-6 bg-yellow-300 shadow-lg rounded-lg flex flex-col items-center"
        style={{
          maxWidth: "500px",
          minHeight: "60px",
          width: "400px",
          height: "60px",
        }}
      >
        <div className="text-center px-4 flex flex-col justify-center h-full">
          <h3 className="text-lg font-semibold mb-4">
            {employee.employeeid} {employee.name} {employee.skills}
          </h3>
        </div>
      </div>
      <input
        type="radio"
        id={`employee-${index}`}
        name="selectedEmployee"
        className="mr-2"
        onChange={() => handleEmployeeSelection(employee)}
      />
      <p>chosen employee is {chosenEmployee?.name}</p>
    </div>
  ));
  return (
    <div>
      <p>ID Name Skills</p>
      <div>
        <p>pending tasks: </p>
        {tasks}
      </div>
      <div>{employeeElements}</div>
    </div>
  );
}
