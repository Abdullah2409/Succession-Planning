// import React from "react";
// import { Link } from "react-router-dom";



// export default function EmployeeFeedback() {
//   return (
//     <div className="container">
//       <div className="navbar">
//       <Link to="/analytics" className="analytics">
//         Analytics
//       </Link>
//       <br/>
//       <Link to="/employee_succession" className="employee-succession">
//         Employee Succession
//       </Link>
//       <br/>
//       <Link to="/employee_feedback" className="employee-feedback">
//         Employee Feedback
//       </Link>
//       <br/>
//       <Link to="/skill_search" className="skill-search">
//         Skill Search
//       </Link>
//       </div>
//       <div className="sub-container">
//         <div className="input">
//             <img src="" alt="" />
//             <input 
//               type="text" 
//               placeholder="Employee ID" 
//             />
//         </div>
//       </div>
//     </div>
    
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import EmployeeSearch from './EmployeeSearch'; // Import the EmployeeSearch component

export default function EmployeeFeedback() {
  return (
    <div className="container">
      <div className="navbar">
      <Link to="/analytics" className="analytics">
        Analytics
      </Link>
      <br/>
      <Link to="/employee_succession" className="employee-succession">
        Employee Succession
      </Link>
      <br/>
      <Link to="/employee_feedback" className="employee-feedback">
        Employee Feedback
      </Link>
      <br/>
      <Link to="/skill_search" className="skill-search">
        Skill Search
      </Link>
      </div>
      <div className="sub-container">
        <EmployeeSearch /> {/* Replace the input element with EmployeeSearch component */}
      </div>
      <div className="feedback-form">
        <h1>Feedback Form</h1>
        <div className="text-box">
          <textarea id="comment" placeholder="Write your comments here..." rows="4" cols="50"></textarea>
        </div>
        <h2>Ratings</h2>
          <div class="Rating">
            <input type="radio" id="star1" name="Rating" value="1" />
            <label for="star1" title="1 star">1</label>
            <input type="radio" id="star2" name="Rating" value="2" />
            <label for="star2" title="2 stars">2</label>
            <input type="radio" id="star3" name="Rating" value="3" />
            <label for="star3" title="3 stars">3</label>
            <input type="radio" id="star4" name="Rating" value="4" />
            <label for="star4" title="4 stars">4</label>
            <input type="radio" id="star5" name="Rating" value="5" />
            <label for="star5" title="5 stars">5</label>
          </div>
          <button onclick="submitFeedback()">Submit</button>
      </div>

    </div>
  );
}
