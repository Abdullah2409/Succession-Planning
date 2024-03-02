import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authcontext";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h1>Succession Planning With KIYA</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dignissimos,
        nobis reprehenderit doloribus distinctio ipsam non. Voluptatum porro
        libero quibusdam reiciendis quae magnam ex tempora quia repudiandae
        facere, iure dicta.
      </p>

      {isAuthenticated ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}
