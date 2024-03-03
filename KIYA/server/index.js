import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import employeeRoutes from "./routes/employees.js";
import employerRoutes from "./routes/employers.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions)); // gives access to allowed orgins only

// Routes
app.use("/users", userRoutes);
app.use("/employees", employeeRoutes);
app.use("/employers", employerRoutes);

// Connect to MongoDB and start the server
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8000;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log("Server running on port " + PORT))
  )
  .catch((error) => console.log(error.message));
