import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authcontext";

// This is the home page of the application. It will display the information about the application and the links to the sign in and sign up pages.
export default function Home() {
  const { isAuthenticated } = useContext(AuthContext); // The auth context has the information about the user authentication. If the user is authenticated, it will have the user information.

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
