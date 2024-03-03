import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authcontext";

const BACKEND_URL = "http://localhost:8000"; // This is temp for development
const REGISTER_URL = BACKEND_URL + "/users/signin";

export default function Signin() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("25100226@devsinc.io");
  const [password, setPassword] = useState("Adil123!");

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
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"} // write css to show/hide this
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Sign In</h1>
      <p>Welcome back! Please signin to your acount.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          ref={userRef}
          value={email}
          required
          aria-describedby="emailnote"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-describedby="pwdnote"
        />

        <button>Sign Up</button>
      </form>

      <p>
        No acount? Click here to
        <span className="line">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}
