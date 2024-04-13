import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomBarChart from "../../components/Barchart";
const BACKEND_URL = "http://localhost:8000";

export default function AnalyticsDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const url = `${BACKEND_URL}/employees/${id}`;
        const response = await axios.get(url);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    getEmployee();
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchEmployee = async () => {
    navigate(`/analytics/${searchQuery}`); // For simplicity in this example
  };

  const searchContainerStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    margin: "0 10px 10px 0",
    borderRadius: "5px",
    backgroundColor: "#f4978f",
    border: "1px solid #CBD5E0",
    marginBottom: "40px",
  };

  const inputStyle = {
    flexGrow: 1,
    padding: "10px 20px",
    border: "none",
    outline: "none",
    color: "#000000",
    backgroundColor: "transparent",
  };

  const buttonStyle = {
    padding: "10px 50px",
    border: "2px solid #000000",
    cursor: "pointer",
    borderRadius: "15px",
  };

  const sidebarStyle = {
    backgroundColor: "white",
    padding: "20px",
    minHeight: "100vh",
  };

  const h2Style = {
    marginLeft: "30px",
    fontWeight: "bold",
    fontSize: "24px",
  };

  const barChartContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "left",
    flexWrap: "wrap",
    gap: "125px",
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <aside style={sidebarStyle}>{}</aside>
      <main style={{ flex: "1", padding: "20px" }}>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search Employee ID"
            style={inputStyle}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={searchEmployee} style={buttonStyle}>
            Search
          </button>
        </div>
        <div>
          {employee ? (
            <div className="employee-details">
              <div style={{ marginBottom: "20px" }}>
                <h2 style={h2Style}>{employee.name}</h2>
              </div>
              <div style={barChartContainerStyle}>
                <CustomBarChart
                  name={"Lines of Code"}
                  current={employee.linesOfCode}
                  required={1500}
                />
                <CustomBarChart
                  name={"Training Programs"}
                  current={employee.trainingPrograms}
                  required={5}
                />
                <CustomBarChart
                  name={"Feature 1"}
                  current={employee.linesOfCode}
                  required={1500}
                />
                {/* <CustomBarChart
                  name={"Feature 1"}
                  current={employee.linesOfCode}
                  required={1500}
                /> */}
              </div>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </main>
    </div>
  );
}
