import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@devsinc\.io$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const BACKEND_URL = "http://localhost:8000"; // This is temp for development
const REGISTER_URL = BACKEND_URL + "/users";

export default function Signup({ onSignUp }) {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("Maryam");

  const [email, setEmail] = useState("maryam@devsinc.io");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("Maryam123!");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("Maryam123!");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
          profilePicture,
        }),
      });

      if (response?.status == 400) {
        setErrMsg("Email is already registered");
        errRef.current.focus();
        return;
      }

      if (response?.status == 201) {
        alert("User created successfully"); // This is temp for testing
        //clear state and controlled inputs
        setUsername("");
        setEmail("");
        setPassword("");
        setMatchPwd("");
        setRole("");
        setProfilePicture("");

        onSignUp(); // changes state on home page
        // <Navigate to="/" /> // Navigate user to home page: currently getting error, will fix later
        return;
      } else {
        throw new Error("Registration Failed");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"} // write css to show/hide this
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Sign Up</h1>
      <p>Welcome! Please signup to make an acount.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Full Name:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          aria-describedby="uidnote"
        />

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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"} // write css to show/hide this
        >
          <FontAwesomeIcon icon={faInfoCircle} />
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
          Must match the first password input field.
        </p>

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

        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          type="text"
          id="profilePicture"
          onChange={(e) => setProfilePicture(e.target.value)}
          value={profilePicture}
        />

        <button
          disabled={!validEmail || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>

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
