import React from "react";
import { Link } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
// Importing React library, Link component and the EmployeeSearch Component

// Defining the EmployeeFeedback component
export default function EmployeeFeedback() {
  return (
    <div className="container">
      <div className="navbar">
        <Link to="/analytics" className="analytics">
          {/* Link to redirect to Analytics */}
          Analytics
        </Link>
        <br />
        <Link to="/employee_succession" className="employee-succession">
          {/* Link to redirect to employee-succession */}
          Employee Succession
        </Link>
        <br />
        <Link to="/employee_feedback" className="employee-feedback">
          {/* Link to redirect to employee-feedback */}
          Employee Feedback
        </Link>
        <br />
        <Link to="/skill_search" className="skill-search">
          {/* Link to redirect toskill-search */}
          Skill Search
        </Link>
      </div>
      <div className="sub-container">
        <EmployeeSearch />{" "}
        {/* Replace the input element with EmployeeSearch component */}
      </div>
      <div className="feedback-form">
        {" "}
        {/* Making a div for feedback form */}
        <h1>Feedback Form</h1>
        <div className="text-box">
          {" "}
          {/* Text area for comments */}
          <textarea
            id="comment"
            placeholder="Write your comments here..."
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <h2>Ratings</h2> {/* Rating out of 5 */}
        <div class="Rating">
          <input type="radio" id="star1" name="Rating" value="1" />
          <label for="star1" title="1 star">
            1
          </label>
          <input type="radio" id="star2" name="Rating" value="2" />
          <label for="star2" title="2 stars">
            2
          </label>
          <input type="radio" id="star3" name="Rating" value="3" />
          <label for="star3" title="3 stars">
            3
          </label>
          <input type="radio" id="star4" name="Rating" value="4" />
          <label for="star4" title="4 stars">
            4
          </label>
          <input type="radio" id="star5" name="Rating" value="5" />
          <label for="star5" title="5 stars">
            5
          </label>
        </div>
        <button onclick="submitFeedback()">Submit</button>{" "}
        {/* Button to submit the form */}
      </div>
    </div>
  );
}
