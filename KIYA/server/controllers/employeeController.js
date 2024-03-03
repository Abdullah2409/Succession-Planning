import Employee from "../models/Employee.js";

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
  const { name, email, phone, picture, salary, position } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
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
      .json({ message: "Failed to create employee", error: error.message });
    console.error("Error creating employee:", error);
  }
};

// @desc Update an employee
// @route PATCH /employees/:id
// @access Private
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, address, phonenumber, city, country, profilepicture, skills } =
    req.body;
  try {
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
  const { id } = req.params;

  try {
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
  const { id } = req.params;

  try {
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
