import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authcontext";
// Importing React, useContext, useEffect, Link component and AuthContext

// Defining the Home component
export default function Home() {
  const { isAuthenticated } = useContext(AuthContext); // Using the isAuthenticated function from AuthContext

  return (
    <div>
      {/* Making the main div container */}
      <h1>Succession Planning With KIYA</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dignissimos,
        nobis reprehenderit doloribus distinctio ipsam non. Voluptatum porro
        libero quibusdam reiciendis quae magnam ex tempora quia repudiandae
        facere, iure dicta.
      </p>
      {/* Dummy text for testing, this will have information about our application */}
      {/* Checking to see if the user has been  */}
      {isAuthenticated ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          {/* Render sign in if not authenticated */}
          <Link to="/signup">Sign Up</Link>
          {/* Render sign up if not authenticated */}
        </>
      )}
    </div>
  );
}
