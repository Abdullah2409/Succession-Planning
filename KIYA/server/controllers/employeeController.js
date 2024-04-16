import Employee from "../models/Employee.js";
import User from "../models/User.js";

// @desc Get all employees
// @route GET /employees
// @access Private
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: error.message });
    console.error("Error fetching employees:", error);
  }
};

// @desc Create new employee
// @route POST /employees
// @access Private
export const createEmployee = async (req, res) => {
  const employeeData = req.body;
  if (!employeeData) {
    return res.status(400).json({ message: "No employee data" });
  }
  if (!employeeData.employeeid) {
    return res.status(400).json({ message: "Employee ID is required" });
  }

  try {
    employeeData.employeeid = parseInt(employeeData.employeeid, 10);
    const existingEmployee = await Employee.findOne({
      employeeid: employeeData.employeeid,
    });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee ID is already registered" });
    }

    const newEmployee = await Employee.create({
      employeeid: employeeData.employeeid || null,
      name: employeeData.name || "",
      address: employeeData.address || "",
      department: employeeData.department || "",
      designation: employeeData.designation || "",
      profilepicture: employeeData.profilepicture || {},
      datestarted: employeeData.datestarted || Date.now(),
      phonenumber: employeeData.phonenumber || "",
      city: employeeData.city || "",
      country: employeeData.country || "",
      skills: employeeData.skills || [],
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create employee", error: error.message });
    console.error("Error creating employee:", error);
  }
};

// @desc Update an employee
// @route PATCH /employees/:id
// @access Private
export const updateEmployee = async (req, res) => {
  let { id } = req.params;
  const { name, address, phonenumber, city, country, profilepicture, skills } =
    req.body;

  try {
    id = parseInt(id, 10);
    const employee = await Employee.findOne({ employeeid: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.name = name || employee.name;
    employee.address = address || employee.address;
    employee.phonenumber = phonenumber || employee.phonenumber;
    employee.city = city || employee.city;
    employee.country = country || employee.country;
    employee.profilepicture = profilepicture || employee.profilepicture;
    employee.skills = skills || employee.skills;
    await employee.save();

    const user = await User.findOne({
      id: employee.employeeid,
      role: "Employee",
    });
    user.name = name || user.name;
    await user.save();

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update employee", error: error.message });
    console.error("Error updating employee:", error);
  }
};

// @desc Delete an employee
// @route DELETE /employees/:id
// @access Private
export const deleteEmployee = async (req, res) => {
  let { id } = req.params;
  try {
    id = parseInt(id, 10);
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.remove();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete employee", error: error.message });
    console.error("Error deleting employee:", error);
  }
};

// @desc Get an employee
// @route GET /employees/:id
// @access Private
export const getEmployee = async (req, res) => {
  let { id } = req.params;
  try {
    id = parseInt(id, 10);
    const employee = await Employee.findOne({ employeeid: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employee", error: error.message });
    console.error("Error fetching employee:", error);
  }
};

// @desc Get employees by department
// @route GET /employees/department/:department
// @access Private
export const getDepartmentEmployees = async (req, res) => {
  const { department } = req.params;
  try {
    const employees = await Employee.find({ department });
    if (!employees) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: error.message });
    console.error("Error fetching employees:", error);
  }
};

export const getTasksEmployees = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ id });
    if (!employees) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: error.message });
    console.error("Error fetching employees:", error);
  }
};
