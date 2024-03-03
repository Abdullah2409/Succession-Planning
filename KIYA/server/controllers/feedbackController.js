import Feedback from "../models/Feedback.js";

// @desc Get all feedback
// @route GET /feedback
// @access Private
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
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
export const getFeedbackByEmployer = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.find({ employerid: id });
    res.status(200).json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch feedback", error: error.message });
    console.error("Error fetching feedback:", error);
  }
};

// @desc Get feedback by employee
// @route GET /feedback/employee/:id
// @access Private
export const getFeedbackByEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.find({ employeeid: id });
    res.status(200).json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch feedback", error: error.message });
    console.error("Error fetching feedback:", error);
  }
};

// @desc Add feedback
// @route POST /feedback
// @access Private
export const addFeedback = async (req, res) => {
  const { employerid, employeeid, feedback, rating } = req.body;

  try {
    const newFeedback = await Feedback.create({
      employerid,
      employeeid,
      feedback,
      rating,
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add feedback", error: error.message });
    console.error("Error adding feedback:", error);
  }
};

// @desc Update feedback
// @route PATCH /feedback/:id
// @access Private
export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { feedback, rating } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { feedback, rating },
      { new: true }
    );
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update feedback", error: error.message });
    console.error("Error updating feedback:", error);
  }
};

// @desc Delete feedback
// @route DELETE /feedback/:id
// @access Private
export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findByIdAndRemove(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete feedback", error: error.message });
    console.error("Error deleting feedback:", error);
  }
};
