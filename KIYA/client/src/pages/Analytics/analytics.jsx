import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authcontext";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { backendUrl } from "../../utils/backendurl";
const BACKEND_URL = backendUrl;

export default function Analytics() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployees = async () => {
      try {
        const url = `${BACKEND_URL}/employees/department/${user?.department}`;
        const response = await axios.get(url);
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [user?.department]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    const filtered = employees.filter((employee) =>
      employee.employeeid.toString().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ marginTop: "20px", fontWeight: 600 }}
          >
            Employee Analytics
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "#f4978f", padding: "10px" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Employee ID"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                style: {
                  backgroundColor: "#f4978f",
                  color: "#000000",
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <CircularProgress />
          ) : filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <Paper
                key={employee.employeeid}
                style={{
                  backgroundColor: "#EDF2F7",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Name: {employee.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ID: {employee.employeeid}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Department: {employee.department}
                </Typography>
                <Link
                  to={`/analytics/${employee.employeeid}`}
                  style={{ color: "#3182CE" }}
                >
                  Go to Analytics
                </Link>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" gutterBottom>
              No employee with this ID available.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
