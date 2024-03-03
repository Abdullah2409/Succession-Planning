import Feedback from "../models/Feedback.js";

// @desc Get all feedback
// @route GET /feedback
// @access Private
// Controller function to retrieve all feedback entries
export const getFeedback = async (req, res) => {
  try {
    // Accessing all feebacks from the feedback table
    const feedback = await Feedback.find();
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch feedback", error: error.message });
    console.error("Error fetching feedback:", error);
  }
};

// @desc Get feedback by employer
// @route GET /feedback/employer/:id
// @access Private
// Controller function to retrieve feedback entries by employer ID
export const getFeedbackByEmployer = async (req, res) => {
  // Accessing required fields from the request body
  const { id } = req.params;

  try {
    // Attempting go get feedback from a specific employer using their ID
    const feedback = await Feedback.find({ employerid: id });
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(feedback);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to fetch feedback", error: error.message });
    console.error("Error fetching feedback:", error);
  }
};

// @desc Get feedback by employee
// @route GET /feedback/employee/:id
// @access Private
// Controller function to retrieve feedback entries by employee ID
export const getFeedbackByEmployee = async (req, res) => {
  // Accessing required fields from the request body
  const { id } = req.params;

  try {
    // Attempting to get all feedback for an employee using their ID
    const feedback = await Feedback.find({ employeeid: id });
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(feedback);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to fetch feedback", error: error.message });
    console.error("Error fetching feedback:", error);
  }
};

// @desc Add feedback
// @route POST /feedback
// @access Private
// Controller function to add feedback entry
export const addFeedback = async (req, res) => {
  // Accessing required fields from the request body
  const { employerid, employeeid, feedback, rating } = req.body;

  try {
    // Generating a new feedback
    const newFeedback = await Feedback.create({
      employerid,
      employeeid,
      feedback,
      rating,
    });
    // If successful, return 201 status and a JSON message containg the required data
    res.status(201).json(newFeedback);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to add feedback", error: error.message });
    console.error("Error adding feedback:", error);
  }
};

// @desc Update feedback
// @route PATCH /feedback/:id
// @access Private
// Controller function to update feedback entry by ID
export const updateFeedback = async (req, res) => {
  // Accessing required fields from the request body
  const { id } = req.params;
  const { feedback, rating } = req.body;

  try {
    // Finding feedback and updating it
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { feedback, rating },
      { new: true }
    );
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json(updatedFeedback);
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to update feedback", error: error.message });
    console.error("Error updating feedback:", error);
  }
};

// @desc Delete feedback
// @route DELETE /feedback/:id
// @access Private
// Controller function to delete feedback entry by ID
export const deleteFeedback = async (req, res) => {
  // Accessing required fields from the request body
  const { id } = req.params;

  try {
    // Finding and Deleting feedback
    const feedback = await Feedback.findByIdAndRemove(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    // If successful, return 200 status and a JSON message containg the required data
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    // If an error occurs, show error 500 and error message
    res
      .status(500)
      .json({ message: "Failed to delete feedback", error: error.message });
    console.error("Error deleting feedback:", error);
  }
};
