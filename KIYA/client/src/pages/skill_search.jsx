import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import search from "../assets/search.svg";
import { backendUrl } from "../utils/backendurl";
const BACKEND_URL = backendUrl;

const headerStyle = {
  backgroundColor: "white",
  padding: "10px 20px",
  marginBottom: "5px",
  borderRadius: "5px",
  fontSize: "35px",
  fontWeight: "bold",
};

export default function SkillSearch() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [checkbox, setCheckBox] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]); //skills that have been selected

  const handleSkillSelect = () => {
    navigate(`/skill-search/${selectedSkills}`);
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/skills`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        if (checkbox.length === 0) {
          setCheckBox(new Array(skills.length).fill(false)); //stores the selection status of each box
        }
      });
  });

  const toggleCheckBox = (id) => {
    
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
      if (updatedSelectedSkills.length >= 3) {
        newCheckBox[id] = !newCheckBox[id];
        setCheckBox(newCheckBox);
        document.getElementById("error-message").innerText =
          "Maximum 3 skills can be selected.";
        return;
      } else if (!updatedSelectedSkills.includes(skills[id].name)) {
        updatedSelectedSkills.push(skills[id].name);
      }
      setSelectedSkills(updatedSelectedSkills);
    }
    if (updatedSelectedSkills.length <= 3) {
      document.getElementById("error-message").innerText = "";
    }
  };

  return (
    <div style={{ marginLeft: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginTop: "10px",
          marginRight: "250px",
        }}
      >
        <div>
          <button
            onClick={() => handleSkillSelect()}
            className="bg-blue-500 text-black rounded hover:bg-blue-600 focus:outline-none"
            style={{
              backgroundColor: "#f4978f",
              opacity: "100%",
              height: "40px",
              width: "300px",
            }}
          >
            Search for employee
          </button>
          <img
        src={search}
        alt="search logo"
        style={{
          marginTop: "10px",
          marginRight: "200px",
          width: "400px",
          height: "400px",
          position: "absolute",
          right: "0",
        }}
      />
        </div>
      </div>

      <header style={headerStyle}>
        <h1>Skill Search</h1>
      </header>
      <p>Select skills to search for (maximum 3): </p>
      <br />
      <p>Currently selected: </p>
      <div style={{ marginLeft: "50px" }}>
        {selectedSkills.map((val, index) => (
          <p key={index} style={{ display: "inline", marginLeft: "40px" }}>
            {val}
          </p>
        ))}
        <p id="error-message" style={{ color: "red" }}></p>
      </div>
      <br />
      {checkbox.map((isSelected, index) => (
        <div key={index} className="feature blue-box">
          <label>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleCheckBox(index)}
            />
            {skills[index].name}
            <span className="checkmark"></span>
          </label>
        </div>
      ))}
      <br />
      
    </div>
  );
}
