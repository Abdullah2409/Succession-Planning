import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

import { backendUrl } from "../utils/backendurl";
const BACKEND_URL = backendUrl;

const all_skills = [
  { _id: 1, name: "Node.js" },
  { _id: 2, name: "Angular" },
  { _id: 3, name: "Azure" },
  { _id: 4, name: "Git" },
  { _id: 5, name: "Docker" },
  { _id: 6, name: "Python" },
  { _id: 7, name: "React" },
  { _id: 8, name: "Javascript" },
  { _id: 9, name: "Ruby" },
  { _id: 10, name: "TensorFlow" },
  { _id: 11, name: "C#" },
  { _id: 12, name: "Java" },
  { _id: 13, name: "Machine Learning" },
  { _id: 14, name: "MongoDB" },
];

export default function SkillSearch() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(all_skills);
  const [checkbox, setCheckBox] = useState(
    new Array(all_skills.length).fill(false)
  ); //stores the selection status of each box
  const [selectedSkills, setSelectedSkills] = useState([]); //skills that have been selected

  const handleSkillSelect = () => {
    navigate(`/skill-search/${selectedSkills}`);
  };
  const toggleCheckBox = (id) => {
    if (document.getElementById("error-message").innerText !== "") {
      document.getElementById("error-message").innerText = "";
    }
    console.log("start");
    var updatedSelectedSkills = [...selectedSkills];
    const newCheckBox = [...checkbox];
    newCheckBox[id] = !newCheckBox[id];
    setCheckBox(newCheckBox);
    if (newCheckBox[id] === false) {
      updatedSelectedSkills = selectedSkills.filter(
        (skill) => skill !== skills[id].name
      );
      setSelectedSkills(updatedSelectedSkills);
    } else {
      if (updatedSelectedSkills.length === 3) {
        document.getElementById("error-message").innerText =
          "Maximum 3 skills can be selected.";
        return;
      } else if (!updatedSelectedSkills.includes(skills[id].name)) {
        updatedSelectedSkills.push(skills[id].name);
      }
      setSelectedSkills(updatedSelectedSkills);
    }
  };

  return (
    <div>
      <p>Select skills to search for (maximum 3): </p>
      {checkbox.map((isSelected, index) => (
        <div key={index} className="feature">
          <label>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleCheckBox(index)}
            />
            {skills[index].name}
          </label>
        </div>
      ))}
      <p>Currently selected: </p>
      <div>
        {selectedSkills.map((val, index) => (
          <p key={index} style={{ display: "inline" }}>
            {val}{" "}
          </p>
        ))}
      </div>
      <p id="error-message" style={{ color: "red" }}></p>
      <button
        onClick={() => handleSkillSelect()}
        className="bg-blue-500 text-black rounded hover:bg-blue-600 focus:outline-none"
        style={{
          backgroundColor: "#f4978f",
          opacity: "100%",
          height: "40px",
          width: "300px",
          marginBottom: "10px",
        }}
      >
        Search for employee
      </button>
    </div>
  );
}
