import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authcontext";
import logo from "../assets/signup_logo.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";

const BACKEND_URL = "http://localhost:8000"; // This is temp for development, will be changed to production URL
const REGISTER_URL = BACKEND_URL + "/users/signin";

export default function Signin() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch(REGISTER_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      setIsAuthenticated(true);
      setUser({ ...data.userData, ...data.roleSpecificData });
      navigate("/");
    } catch (error) {
      setErrMsg(error.message);
      errRef.current.focus();
    }
  };

  return (
    <div className="flex gap-5 justify-center items-center">
      <section className="w-full max-w-lg mt-4">
        {/* This error tag will be displayed if something goes wrong while the user is signing in */}
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1 className="font-bold text-heading-mobile md:text-heading-desktop uppercase">
          Sign In
        </h1>
        <p className="mb-5">Welcome back! Please signin to your account.</p>

        <form onSubmit={handleSubmit} className="grid gap-3 mt-4">
          <div className="relative">
            <label
              htmlFor="email"
              className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
            >
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              ref={userRef}
              value={email}
              required
              aria-describedby="emailnote"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500"
            >
              Password
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-describedby="pwdnote"
            />
          </div>

          <div className="max-w-fit justify-self-center mt-4">
            <Button
              text="Sign In"
              text_clr="text-black"
              bg_clr="bg-secondary"
            />
          </div>
        </form>

        <p className="flex gap-2 mt-3 justify-center">
          No account? Click here to
          <span className="line underline">
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </section>

      <img
        src={logo}
        alt="logo"
        className="hidden md:block w-1/2 max-w-md mx-auto mt-4"
      />
    </div>
  );
}
