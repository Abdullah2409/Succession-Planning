import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Employer from "../models/Employer.js";
import bcrypt from "bcrypt";

// @desc Sign in
// @route GET /users/signin
// @access Private
// Controller function to handle user signin
export const signin = async (req, res) => {
  // Extracting the required fieds from the request body
  const { email, password } = req.body;

  try {
    // Checking if user in database
    const existingUser = await User.findOne({ email });

    // If the user does not exist, respond with a 404 status and a message
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist. Please create an acount." });

    // Checking if the provided password matches the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If the password is incorrect, respond with a 400 status and a message
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Checking the role of the user and retriving role-spcific data
    const data =
      existingUser.role.toLowerCase() == "employee"
        ? await Employee.findOne({ employeeid: existingUser.id })
        : await Employer.findOne({ employerid: existingUser.id });

    // If no role-specific data, respond with 401 status and a message
    if (!data) {
      return res
        .status(401)
        .json({ message: "User information does not exist in database." });
    }

    // If successful, return 200 status and a JSON message containg the specific data
    res.status(200).json({ userData: existingUser, roleSpecificData: data });
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

// @desc Get all users
// @route GET /users
// @access Private
// Controller function to fetch all users
export const getUsers = async (req, res) => {
  try {
    // Getting all users from the database
    const users = await User.find();
    console.log(users);

    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(users);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
    console.error("Error fetching users:", error);
  }
};

// @desc Create new user
// @route POST /users
// @access Private
// Controller function to create a new user
export const createUser = async (req, res) => {
  const { name, email, password, role, profilePicture } = req.body;
  // Extract user ID from email
  const userid = email.split("@")[0];

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user already exists, respond with a 400 status and a JSON message indicating the email is already registered
      return res.status(400).json({ message: "Email is already registered." });
    }

    const data =
      role.toLowerCase() == "employee"
        ? await Employee.findOne({ employeeid: userid })
        : await Employer.findOne({ employerid: userid });
    if (!data) {
      // If user information does not exist in the database, respond with a 401 status and a JSON message indicating the user information does not exist
      return res
        .status(401)
        .json({ message: "User information does not exist in database." });
    }

    // Create a new user with the provided information
    const newUser = new User({
      id: userid,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      profilePicture,
    });

    // If successful, return 200 status and a JSON message containg the required data
    await newUser.save();
    res.status(201).json({ userData: newUser, roleSpecificData: data });
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });

    console.error("Error creating user:", error);
  }
};

// @desc Update a user
// @route PATCH /users/:id
// @access Private
export const updateUser = async (req, res) => {};

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
export const deleteUser = async (req, res) => {};
