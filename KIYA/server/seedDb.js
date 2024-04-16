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
