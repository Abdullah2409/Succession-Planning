import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../context/authcontext";

// For email and password validation
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@devsinc\.io$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Backend URL and registeration endpoint
const BACKEND_URL = "http://localhost:8000"; // This is temp for development
const REGISTER_URL = BACKEND_URL + "/users";

// Defining component for signup
export default function Signup() {
  // Accessing authentication using Authcontext
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  // Making DOM elements
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  // State variables for user input fields and validation
  const [name, setUsername] = useState("Adil");

  const [email, setEmail] = useState("adil@devsinc.io");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("Adil123!");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("Adil123!");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [role, setRole] = useState("Employee");
  const [profilePicture, setProfilePicture] = useState("");
  const [errMsg, setErrMsg] = useState(""); // For displaying error message

  // Effect for focusing on the name input field when mounted
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //  Effect for validating email address when entered
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // Effect to validate password format and password matching when entered
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  // Effect to clear error message when email or password changed
  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  // For form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack

    // Validation of email and password, if invalid gives error
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    // Prepare request options for sending user data to the server by making a POST request and converting to JSON format
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    };

    try {
      // Sending the Post request
      const response = await fetch(REGISTER_URL, requestOptions);
      const data = await response.json();

      // If no reply, then throw error
      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      // Clearing the input fields and redirecting the user to the homepage
      setUsername("");
      setEmail("");
      setPassword("");
      setMatchPwd("");
      setRole("");
      setProfilePicture("");
      setIsAuthenticated(true);
      setUser({ ...data.userData, ...data.roleSpecificData });
      navigate("/");
    } catch (error) {
      // If any error then an error message will be displayed
      setErrMsg(error.message);
      errRef.current.focus();
    }
  };

  // Rendering the sign up form
  return (
    <section>
      {/* For displaying error message if any */}
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"} // write css to show/hide this
        aria-live="assertive"
      >
        {errMsg}
      </p>

      {/* Sign up form */}
      <h1>Sign Up</h1>
      <p>Welcome! Please signup to make an acount.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)} // Updating the state if input changed
          value={name}
          required
          aria-describedby="uidnote"
        />

        {/* Email validation icons */}
        <label htmlFor="email">
          Email Address:
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? "hide" : "invalid"}
          />
        </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="emailnote"
          className={emailFocus && !validEmail ? "instructions" : "offscreen"} // write css to show/hide this
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must be a valid email address ending in @devsinc.io
        </p>

        {/* Password input field with validation check */}
        <label htmlFor="password">
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !password ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)} // Update state if input field changed
          value={password}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        {/* Password validation */}
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"} // write css to show/hide this
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          {/* Password required length and requirements for strong password */}
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        {/* Confirm password label and validation icons */}
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? "hide" : "invalid"}
          />
        </label>

        {/* Input field for confirming password */}
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.{" "}
          {/* Instruction for confirming password field */}
        </p>

        {/* Role selection (Employer/Employee) */}
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          onChange={(e) => setRole(e.target.value)}
          value={role}
          required
        >
          <option value="">Select Role</option>
          <option value="Employer">Employer</option>
          <option value="Employee">Employee</option>
        </select>

        {/* Profile picture input field */}
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="text"
          id="profilePicture"
          onChange={(e) => setProfilePicture(e.target.value)}
          value={profilePicture}
        />

        {/* Sign up button */}
        <button
          disabled={!validEmail || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>

      {/* Link to sign-in page if already signed up */}
      <p>
        Already registered?
        <br />
        <span className="line">
          <Link to="/signin">Sign In</Link>
        </span>
      </p>
    </section>
  );
}
