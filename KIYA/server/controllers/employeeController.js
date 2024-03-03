import Employee from "../models/Employee.js";
// Importing employee model to interact with the MongoDB database

// @desc Get all employees
// @route GET /employees
// @access Private
// Controller function to fetch all employees from the database
export const getEmployees = async (req, res) => {
  try {
    // Trying to find all employees using the model's find method
    const employees = await Employee.find();
    // If successful, respond with a 200 status and JSON data containing the employees
    res.status(200).json(employees);
  } catch (error) {
    // If there is an error in retriving the employees, 500 status shown and an error message in JSON format
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: error.message });
    console.error("Error fetching employees:", error);
  }
};

// @desc Create new employee
// @route POST /employees
// @access Private
// Cntroller function to create a new employee
export const createEmployee = async (req, res) => {
  // getting the necessary fields from the request body
  const { name, email, phone, picture, salary, position } = req.body;

  try {
    // Checking if user already in database
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      // If they already exist, then send a message saying they are already registered
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create a new employee document in the database with the request data
    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      picture,
      salary,
      position,
    });
    // Show 201 status and JSON containing the new employee's information
    res.status(201).json(newEmployee);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to create employee", error: error.message });
    console.error("Error creating employee:", error);
  }
};

// @desc Update an employee
// @route PATCH /employees/:id
// @access Private
// Controller function to update an employee's details
export const updateEmployee = async (req, res) => {
  // Extract the employee ID from the request parameters
  const { id } = req.params;

  // getting the necessary fields from the request body
  const { name, address, phonenumber, city, country, profilepicture, skills } =
    req.body;
  try {
    // Checking if user in database
    const employee = await Employee.findOne({ employeeid: id });

    // if user not available, then status 404 returned and error message
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If found, then update the fields according to the request message's data
    employee.name = name || employee.name;
    employee.address = address || employee.address;
    employee.phonenumber = phonenumber || employee.phonenumber;
    employee.city = city || employee.city;
    employee.country = country || employee.country;
    employee.profilepicture = profilepicture || employee.profilepicture;
    employee.skills = skills || employee.skills;

    // Save the data and return 200 status
    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to update employee", error: error.message });
    console.error("Error updating employee:", error);
  }
};

// @desc Delete an employee
// @route DELETE /employees/:id
// @access Private
// Controller function to delete an existing employee
export const deleteEmployee = async (req, res) => {
  // getting the necessary fields from the request body
  const { id } = req.params;
  try {
    // Checking if user in database
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If in database, then remove and return 200 status and success message
    await employee.remove();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to delete employee", error: error.message });
    console.error("Error deleting employee:", error);
  }
};

// @desc Get an employee
// @route GET /employees/:id
// @access Private
// Controller function to update an existing employee
export const getEmployee = async (req, res) => {
  // getting the necessary fields from the request body
  const { id } = req.params;
  try {
    // Checking if user in database
    const employee = await Employee.findOne({ employeeid: id });

    // If not in database, then return 404 status
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to fetch employee", error: error.message });
    console.error("Error fetching employee:", error);
  }
};

// @desc Get employees by department
// @route GET /employees/department/:department
// @access Private
// Controller function to fetch employees based on a specified department
export const getDepartmentEmployees = async (req, res) => {
  // Extract the 'department' parameter from the request
  const { department } = req.params;
  try {
    // Checking if user in database
    const employees = await Employee.find({ department });
    if (!employees) {
      return res.status(404).json({ message: "Department not found" });
    }
    // If successful, respond with a 200 status and JSON data containing the employee
    res.status(200).json(employees);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: error.message });
    console.error("Error fetching employees:", error);
  }
};
