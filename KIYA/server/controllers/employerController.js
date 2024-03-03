import Employer from "../models/Employer.js";

// @desc Get all employers
// @route GET /employers
// @access Private
// Controller function to retrieve all employers
export const getEmployers = async (req, res) => {
  try {
    // Retrieve all employers from the database
    const employees = await Employer.find();
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(employees);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to fetch employers", error: error.message });
    console.error("Error fetching employers:", error);
  }
};

// @desc Create new employer
// @route POST /employers
// @access Private
// Controller function to create a new employer
export const createEmployer = async (req, res) => {
  // Accessing required fields from the request body
  const { name, email, phone, picture, salary, position } = req.body;
  try {
    // Checking if user with the email address already exists
    const existingEmployee = await Employer.findOne({ email });
    if (existingEmployee) {
      // If the employer already exists, return a 400 status and a JSON message stating that the email is already registered
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Creating a new entry in the database for the employer
    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      picture,
      salary,
      position,
    });
    // If successful, return 201 status and a JSON message containg the required data
    res.status(201).json(newEmployee);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to create employer", error: error.message });
    console.error("Error creating employer:", error);
  }
};

// @desc Update an employer
// @route PATCH /employers/:id
// @access Private
// Controller function to update an existing employer
export const updateEmployer = async (req, res) => {
  // Accessing required fields from the request body
  const { id } = req.params;
  const { name, address, phonenumber, city, country, profilepicture } =
    req.body;
  try {
    // If the employer is not found, return a 404 status and a JSON message indicating that the employer was not found
    const employer = await Employer.findOne({ employerid: id });
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Updating the required fields
    employer.name = name || employer.name;
    employer.address = address || employer.address;
    employer.phonenumber = phonenumber || employer.phonenumber;
    employer.city = city || employer.city;
    employer.country = country || employer.country;
    employer.profilepicture = profilepicture || employer.profilepicture;

    await employer.save();
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(employer);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to update employer", error: error.message });
    console.error("Error updating employer:", error);
  }
};

// @desc Delete an employer
// @route DELETE /employers/:id
// @access Private
// Controller function to delete an existing employer
export const deleteEmployer = async (req, res) => {
  // Accessing required fields from the request body
  const { id } = req.params;

  try {
    // If the employer is not found, return a 404 status and a JSON message indicating that the employer was not found
    const employer = await Employer.findById(id);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    await employer.remove();
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json({ message: "Employer deleted successfully" });
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to delete employer", error: error.message });
    console.error("Error deleting employer:", error);
  }
};

// @desc Get an employer
// @route GET /employers/:id
// @access Private
// Controller function to retrieve details of a specific employer
export const getEmployer = async (req, res) => {
  // Accessing required fields from the request body
  const { id } = req.params;

  try {
    const employer = await Employer.findById(id);
    if (!employer) {
      // If the employer is not found, return a 404 status and a JSON message indicating that the employer was not found
      return res.status(404).json({ message: "Employer not found" });
    }
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(employer);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to fetch employer", error: error.message });
    console.error("Error fetching employer:", error);
  }
};
