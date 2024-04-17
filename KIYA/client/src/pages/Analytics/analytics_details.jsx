/* import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomBarChart from "../../components/Barchart";
const BACKEND_URL = "http://localhost:8000";

export default function AnalyticsDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [skillsData, setSkillsData] = useState([]);

  const createBarCharts = () => {
    if (!employee || employee?.skills.length === 0) return "No data available";
    return employee.skills.map((skill, index) => {
      const requiredSkill = skillsData.find((data) => data.name === skill.name);
      return (
        <CustomBarChart
          key={index}
          name={skill.name}
          current={skill.points}
          intermediate={requiredSkill.levels.intermediate}
          advance={requiredSkill.levels.advance}
          width={300}
        />
      );
    });
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-md col-span-4 grid grid-rows-1 self-stretch rounded-lg border border-gray-300">
      <div className="employee-details">
        <h2 className="font-semibold mb-8">Employee Development Statistics</h2>
        <div className="flex gap-10 flex-wrap ">{createBarCharts()}</div>
      </div>
    </div>
  );
}
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import CustomBarChart from "../../components/Barchart";
const BACKEND_URL = "http://localhost:8000";

export default function AnalyticsDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const createBarCharts = () => {
    if (!employee || employee?.skills.length === 0) return "No data available";
    return employee.skills.map((skill, index) => {
      const requiredSkill = skillsData.find((data) => data.name === skill.name);
      return (
        <CustomBarChart
          key={index}
          name={skill.name}
          current={skill.points}
          intermediate={requiredSkill.levels.intermediate}
          advance={requiredSkill.levels.advance}
          width={300}
        />
      );
    });
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="p-md col-span-4 grid grid-rows-1 self-stretch rounded-lg border border-gray-300">
      <div className="employee-details">
        <h2 className="font-semibold mb-8">Employee Development Statistics</h2>
        {loading ? (
          <CircularProgress />
        ) : employee && employee.skills.length > 0 ? (
          <div className="flex gap-10 flex-wrap">{createBarCharts()}</div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
