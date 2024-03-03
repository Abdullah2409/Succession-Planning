import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authcontext";
// Importing react, useState, useEffect, useRef, useContext, Link, useNavigate, AuthContext

const BACKEND_URL = "http://localhost:8000"; // This is temp for development (Backend URL)
const REGISTER_URL = BACKEND_URL + "/users/signin"; // URL for registeration

// Defining function for sign in
export default function Signin() {
  // Accessing user authentication information from AuthContext
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  // Creating DOM elements
  const userRef = useRef(); // Reference to the email input field
  const errRef = useRef(); // Reference to eror message
  const navigate = useNavigate(); // Hook for navigating

  // State variables for email, password, and error message
  const [email, setEmail] = useState("25100226@devsinc.io");
  const [password, setPassword] = useState("Adil123!");

  const [errMsg, setErrMsg] = useState(""); // Displays the error message

  // Effect to focus on the email field
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Effect to clear error message when email or password changed by the user
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Making a post request to send user credentials to the server
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // For converting to JSON format
    };

    try {
      // Sending the post request to the server for authentication
      const response = await fetch(REGISTER_URL, requestOptions);
      const data = await response.json(); // Parsing the reply from the server

      // Throwing an error if response is unsuccessful
      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      // If no error then update state and user information
      setIsAuthenticated(true); // Setting user to be authenticated
      setUser({ ...data.userData, ...data.roleSpecificData }); // Setting user data
      navigate("/"); // Taking user to the homepage
    } catch (error) {
      // If theres an error, then the error message will show
      setErrMsg(error.message);
      errRef.current.focus();
    }
  };

  // Rendering the sign-in form
  return (
    <section>
      {/* Displaying an error message if there are any errors */}
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"} // write css to show/hide this
        aria-live="assertive"
      >
        {errMsg}
      </p>

      {/* Sign in form */}
      <h1>Sign In</h1>
      <p>Welcome back! Please signin to your acount.</p>

      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)} // Updating email state if changed
          ref={userRef}
          value={email}
          required
          aria-describedby="emailnote"
        />
        {/* Password input field */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)} // Updating password state if changed
          value={password}
          required
          aria-describedby="pwdnote"
        />
        {/* Submission button */}
        <button>Sign Up</button>
      </form>

      {/* Link to sign up page */}
      <p>
        No acount? Click here to
        <span className="line">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}
