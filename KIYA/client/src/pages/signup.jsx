import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../context/authcontext";
import Button from "../components/Button";
import logo from "../assets/signup_logo.svg";

// Regular expressions for email and password validation
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@devsinc\.io$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

import { backendUrl } from "../utils/backendurl";
const BACKEND_URL = backendUrl;

const REGISTER_URL = BACKEND_URL + "/users";

export default function Signup() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [name, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [validLength, setValidLength] = useState(false);
  const [validUpper, setValidUpper] = useState(false);
  const [validLower, setValidLower] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validSpecial, setValidSpecial] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [showMatchPassword, setShowMatchPassword] = useState(false);

  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  // Effect for focusing on the name input field when mounted for the first time.
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
    setValidLength(password.length >= 8 && password.length <= 24);
    setValidUpper(/[A-Z]/.test(password));
    setValidLower(/[a-z]/.test(password));
    setValidNumber(/[0-9]/.test(password));
    setValidSpecial(/[!@#$%]/.test(password));
  }, [password, matchPwd]);

  // Effect to clear error message when email or password changed
  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  // For form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack, we can prevent form submission by validating the email and password
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    };

    try {
      const response = await fetch(REGISTER_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setMatchPwd("");
      setRole("");
      setIsAuthenticated(true);
      setUser({ ...data.userData, ...data.roleSpecificData });
      navigate("/");
    } catch (error) {
      setErrMsg(error.message);
      errRef.current.focus();
    }
  };

  return (
    <div className="m-auto md:m-0 px-md md:px-sd flex gap-5 justify-between items-center lg:gap-[10rem]">
      <section className="w-full max-w-lg mt-4">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1 className="font-bold text-heading-mobile md:text-heading-desktop uppercase">
          Sign Up
        </h1>
        <p className="mb-5">Welcome! Please signup to make an acount.</p>

        <form onSubmit={handleSubmit} className="grid gap-3 mt-4">
          <div className="relative">
            <label
              htmlFor="name"
              className="absolute left-4 top-2 text-gray-500 pointer-events-none"
            >
              Full Name
            </label>
            <input
              className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
              type="text"
              id="name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={name}
              required
              aria-describedby="uidnote"
            />
          </div>

          <div className="relative mt-2">
            <label
              htmlFor="email"
              className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
            >
              Email Address
              <FontAwesomeIcon icon={validEmail ? faCheck : faTimes} />
            </label>
            <input
              type="email"
              className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
            />
            <div className="tooltip-container">
              <div
                className="max-w-fit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="ml-2 text-gray-500 cursor-pointer"
                />
              </div>
              {isHovered && (
                <div className="tooltip font-light text-sm z-10">
                  Must be a valid email address ending in @devsinc.io
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="w-[95%] flex justify-between absolute left-4 top-2 text-gray-500"
            >
              Password
              <div className="flex flex-col gap-5">
                <FontAwesomeIcon icon={validPwd ? faCheck : faTimes} />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
            />

            <div className="tooltip-container">
              <div
                className="max-w-fit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="ml-2 text-gray-500 cursor-pointer"
                />
              </div>
              {isHovered && (
                <div className="tooltip font-light text-sm z-10">
                  <ul>
                    <li>
                      {validLength ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}{" "}
                      8-24 characters
                    </li>
                    <li>
                      {validUpper ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}{" "}
                      One uppercase letter
                    </li>
                    <li>
                      {validLower ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}{" "}
                      One lowercase letter
                    </li>
                    <li>
                      {validNumber ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}{" "}
                      One number
                    </li>
                    <li>
                      {validSpecial ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}{" "}
                      One special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="confirm_pwd"
              className="w-[95%] flex justify-between absolute left-4 top-2 text-gray-500"
            >
              Confirm Password
              <div className="flex flex-col gap-5">
                <FontAwesomeIcon icon={validMatch ? faCheck : faTimes} />
                <FontAwesomeIcon
                  icon={showMatchPassword ? faEyeSlash : faEye}
                  className="cursor-pointer"
                  onClick={() => setShowMatchPassword(!showMatchPassword)}
                />
              </div>
            </label>

            <input
              type={showMatchPassword ? "text" : "password"}
              id="confirm_pwd"
              className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
            />
          </div>

          <fieldset id="role" className="relative">
            <legend className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none">
              Role
            </legend>
            <div className="flex gap-4 w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none">
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="employer"
                  name="role"
                  value="Employer"
                  checked={role === "Employer"}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <label htmlFor="employer" className="ml-2">
                  Employer
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="employee"
                  name="role"
                  value="Employee"
                  checked={role === "Employee"}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <label htmlFor="employee" className="ml-2">
                  Employee
                </label>
              </div>
            </div>
          </fieldset>

          <div className="max-w-fit justify-self-center mt-4">
            <Button
              text="Sign Up"
              text_clr="text-black"
              bg_clr="bg-secondary"
              disabled={!validEmail || !validPwd || !validMatch ? true : false}
            />
          </div>
        </form>

        <p className="flex gap-2 mt-3 justify-center">
          Already registered?
          <br />
          <span className="line underline">
            <Link to="/signin">Sign In</Link>
          </span>
        </p>
      </section>

      <img
        src={logo}
        alt="logo"
        className="hidden md:block w-1/2 max-w-md mx-auto mt-4 lg:max-w-[40rem] "
      />
    </div>
  );
}
