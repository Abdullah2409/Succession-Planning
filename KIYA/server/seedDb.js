/* import mongoose from "mongoose";
import Task from "./models/Task.js";

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://adil:3RweZM4hKoV3iGPE@cluster0.vuftkur.mongodb.net/SuccessionPlanning?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Function to generate a random task title
const generateTitle = () => {
  const titles = [
    "Write Report",
    "Prepare Presentation",
    "Review Documents",
    "Attend Meeting",
    "Complete Assignment",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

// Function to generate a random task description
const generateDescription = () => {
  const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Function to generate a random task deadline
const generateDeadline = () => {
  const now = new Date();
  const deadline = new Date(
    now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000
  ); // Random deadline within next 7 days
  return deadline;
};

// Function to generate a random task status
const generateStatus = () => {
  const statuses = [true, false];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Function to generate a random task
const generateTask = () => {
  return {
    title: generateTitle(),
    description: generateDescription(),
    deadline: generateDeadline(),
    isCompleted: generateStatus(),
    employerid: Math.floor(Math.random() * 10) + 1, // Random employerid: 1-10
    employeeid: Math.floor(Math.random() * 10) + 1, // Random employerid: 1-10
  };
};

// Function to seed the database with fake tasks
const seedDatabase = async (numTasks) => {
  try {
    // Clear existing tasks
    await Task.deleteMany();

    // Generate and save new tasks
    const tasks = Array.from({ length: numTasks }, generateTask);
    await Task.create(tasks);

    console.log(`${numTasks} tasks seeded successfully.`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Seed the database with 10 fake tasks
seedDatabase(10);
 */

/* import mongoose from "mongoose";
import Program from "./models/Program.js";

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://adil:3RweZM4hKoV3iGPE@cluster0.vuftkur.mongodb.net/SuccessionPlanning?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Function to generate a random program name
const generateName = () => {
  const names = [
    "Leadership Development Program",
    "Technical Training Program",
    "Managerial Skills Workshop",
    "Team Building Retreat",
    "Communication Skills Seminar",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Function to generate a random program description
const generateDescription = () => {
  const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Function to generate a random set of skills
const generateSkills = () => {
  const skills = [
    "Leadership",
    "Communication",
    "Problem-solving",
    "Teamwork",
    "Time management",
  ];
  const numSkills = Math.floor(Math.random() * (skills.length + 1)); // Random number of skills
  return skills.slice(0, numSkills); // Random selection of skills
};

// Function to generate a random program
const generateProgram = () => {
  return {
    name: generateName(),
    description: generateDescription(),
    skills: generateSkills(),
  };
};

// Function to seed the database with fake programs
const seedDatabase = async (numPrograms) => {
  try {
    // Clear existing programs
    await Program.deleteMany();

    // Generate and save new programs
    const programs = Array.from({ length: numPrograms }, generateProgram);
    await Program.create(programs);

    console.log(`${numPrograms} programs seeded successfully.`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Seed the database with 5 fake programs
seedDatabase(5);
 */

/* import mongoose from "mongoose";
import Task from "./models/Task.js";

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://adil:3RweZM4hKoV3iGPE@cluster0.vuftkur.mongodb.net/SuccessionPlanning?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Function to generate a random skill
const generateSkill = () => {
  const skills = ["coding", "communication", "problem-solving", "leadership"];
  const skill = skills[Math.floor(Math.random() * skills.length)];
  const boost = Math.floor(Math.random() * 100); // Random boost level less than 100
  return { name: skill, boost: boost };
};

// Function to generate a random task
const generateTask = () => {
  return {
    title: "Untitled Task",
    description: "No description",
    deadline: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Random deadline within next 7 days
    isCompleted: false,
    employerid: 25100226,
    employeeid: 10,
    skills: Array.from({ length: 3 }, generateSkill), // Generate 3 random skills for each task
  };
};

// Function to seed the database with fake tasks
const seedDatabase = async (numTasks) => {
  try {
    // Clear existing tasks
    await Task.deleteMany();

    // Generate and save new tasks
    const tasks = Array.from({ length: numTasks }, generateTask);
    await Task.create(tasks);

    console.log(`${numTasks} tasks seeded successfully.`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Seed the database with 10 fake tasks
seedDatabase(5);
 */

import mongoose from "mongoose";
import Task from "./models/Task.js";

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://adil:3RweZM4hKoV3iGPE@cluster0.vuftkur.mongodb.net/SuccessionPlanning?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Function to generate a random skill
const generateSkill = () => {
  const skills = ["coding", "communication", "problem-solving", "leadership"];
  const skill = skills[Math.floor(Math.random() * skills.length)];
  const boost = Math.floor(Math.random() * 100); // Random boost level less than 100
  return { name: skill, boost: boost };
};

// Function to generate a random task
const generateTask = () => {
  const title = `Task ${Math.floor(Math.random() * 1000)}`; // Unique title with random number
  const description = "No description";
  const deadline = new Date(
    Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
  ); // Random deadline within next 7 days
  const isCompleted = false;
  const employerid = 25100226;
  const employeeid = 10;

  // Generate unique skills for the task
  const uniqueSkills = new Set();
  while (uniqueSkills.size < 3) {
    uniqueSkills.add(generateSkill());
  }
  const skills = Array.from(uniqueSkills);

  return {
    title,
    description,
    deadline,
    isCompleted,
    employerid,
    employeeid,
    skills,
  };
};

// Function to seed the database with fake tasks
const seedDatabase = async (numTasks) => {
  try {
    // Clear existing tasks
    await Task.deleteMany();

    // Generate and save new tasks
    const tasks = Array.from({ length: numTasks }, generateTask);
    await Task.create(tasks);

    console.log(`${numTasks} tasks seeded successfully.`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Seed the database with 5 fake tasks
seedDatabase(5);
