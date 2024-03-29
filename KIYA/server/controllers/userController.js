import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Employer from "../models/Employer.js";
import bcrypt from "bcrypt";

// @desc Sign in
// @route GET /users/signin
// @access Private
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist. Please create an acount." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const data =
      existingUser.role.toLowerCase() == "employee"
        ? await Employee.findOne({ employeeid: existingUser.id })
        : await Employer.findOne({ employerid: existingUser.id });

    if (!data) {
      return res
        .status(401)
        .json({ message: "User information does not exist in database." });
    }

    res.status(200).json({ userData: existingUser, roleSpecificData: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

// @desc Get all users
// @route GET /users
// @access Private
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
    console.error("Error fetching users:", error);
  }
};

// @desc Create new user
// @route POST /users
// @access Private
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userid = email.split("@")[0];

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const data =
      role.toLowerCase() == "employee"
        ? await Employee.findOne({ employeeid: userid })
        : await Employer.findOne({ employerid: userid });
    if (!data) {
      return res
        .status(401)
        .json({ message: "User information does not exist in database." });
    }

    const newUser = new User({
      id: userid,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });

    await newUser.save();
    res.status(201).json({ userData: newUser, roleSpecificData: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });

    console.error("Error creating user:", error);
  }
};

// @desc Update a user
// @route PATCH /users/:id
// @access Private
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  role = role.toLowerCase();

  try {
    const user = await User.findOne({
      id: id,
      role: role.charAt(0).toUpperCase() + role.slice(1),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
    console.error("Error updating user:", error);
  }
};

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
export const deleteUser = async (req, res) => {};
