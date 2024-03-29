import Employer from "../models/Employer.js";
import User from "../models/User.js";

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
  const employerData = req.body;
  if (!employerData) {
    return res.status(400).json({ message: "No employer data" });
  }
  if (!employerData.employerid) {
    return res.status(400).json({ message: "Employer ID is required" });
  }

  try {
    employerData.employerid = parseInt(employerData.employerid, 10);
    const existingEmployee = await Employer.findOne({
      employerid: employerData.employerid,
    });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newEmployee = await Employer.create({
      employerid: employerData.employerid || null,
      name: employerData.name || "",
      address: employerData.address || "",
      department: employerData.department || "",
      designation: employerData.designation || "",
      profilepicture: employerData.profilepicture || {},
      datestarted: employerData.datestarted || Date.now(),
      phonenumber: employerData.phonenumber || "",
      city: employerData.city || "",
      country: employerData.country || "",
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
  let { id } = req.params;
  const { name, address, phonenumber, city, country, profilepicture } =
    req.body;
  try {
    id = parseInt(id, 10);
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

    const user = await User.findOne({
      id: employer.employerid,
      role: "Employer",
    });
    user.name = name || user.name;
    await user.save();

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
  let { id } = req.params;

  try {
    id = parseInt(id, 10);
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
  let { id } = req.params;

  try {
    id = parseInt(id, 10);
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
