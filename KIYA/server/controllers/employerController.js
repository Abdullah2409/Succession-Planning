import Employer from "../models/Employer.js";

// @desc Get all employers
// @route GET /employers
// @access Private
export const getEmployers = async (req, res) => {
  try {
    const employees = await Employer.find();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employers", error: error.message });
    console.error("Error fetching employers:", error);
  }
};

// @desc Create new employer
// @route POST /employers
// @access Private
export const createEmployer = async (req, res) => {
  const { name, email, phone, picture, salary, position } = req.body;

  try {
    const existingEmployee = await Employer.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      picture,
      salary,
      position,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create employer", error: error.message });
    console.error("Error creating employer:", error);
  }
};

// @desc Update an employer
// @route PATCH /employers/:id
// @access Private
export const updateEmployer = async (req, res) => {
  const { id } = req.params;
  const { name, address, phonenumber, city, country, profilepicture } =
    req.body;
  try {
    const employer = await Employer.findOne({ employerid: id });
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    employer.name = name || employer.name;
    employer.address = address || employer.address;
    employer.phonenumber = phonenumber || employer.phonenumber;
    employer.city = city || employer.city;
    employer.country = country || employer.country;
    employer.profilepicture = profilepicture || employer.profilepicture;

    await employer.save();
    res.status(200).json(employer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update employer", error: error.message });
    console.error("Error updating employer:", error);
  }
};

// @desc Delete an employer
// @route DELETE /employers/:id
// @access Private
export const deleteEmployer = async (req, res) => {
  const { id } = req.params;

  try {
    const employer = await Employer.findById(id);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    await employer.remove();
    res.status(200).json({ message: "Employer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete employer", error: error.message });
    console.error("Error deleting employer:", error);
  }
};

// @desc Get an employer
// @route GET /employers/:id
// @access Private
export const getEmployer = async (req, res) => {
  const { id } = req.params;

  try {
    const employer = await Employer.findById(id);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.status(200).json(employer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employer", error: error.message });
    console.error("Error fetching employer:", error);
  }
};
