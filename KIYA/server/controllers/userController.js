import User from "../models/User.js";
import bcrypt from "bcrypt";

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
  const { username, email, password, role, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      profilePicture,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });

    console.error("Error creating user:", error);
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
export const updateUser = async (req, res) => {};

// @desc Delete a user
// @route DELETE /users
// @access Private
export const deleteUser = async (req, res) => {};
/* export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, role, profilePicture } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      profilePicture,
    });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role, profilePicture } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { username, email, password, role, profilePicture, _id: id };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
    } catch (error) {
    console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No user with id: ${id}`);
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
    } catch (error) {
    console.log(error);
    }
};
 */
